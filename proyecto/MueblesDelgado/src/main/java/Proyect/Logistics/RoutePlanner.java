package Proyect.Logistics;

import Proyect.StoreKeeper.Order;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class RoutePlanner {
    private String warehouseLocation;
    private LocalTime startTime;
    private GeoDataProvider geoDataProvider;
    private final int MAX_WORK_DAYS = 3;
    
    // Límite de horas (ajústalo a tu realidad, ej: 8 horas)
    private final long MAX_HOURS_PER_DAY = 8; 

    @Autowired
    public RoutePlanner(@Value("${logistics.warehouseLocation}") String warehouseLocation,
                        @Value("${logistics.startTime}") String startTime) {
        this.warehouseLocation = warehouseLocation;
        this.startTime = LocalTime.parse(startTime);
        this.geoDataProvider = new GeoDataProvider();
    }

    public List<Route> planOptimalRoutes(List<Order> orders, int numberOfTrucks) throws Exception {
        List<Route> allRoutes = new ArrayList<>();
        PriorityQueue<Order> orderQueue = initializeOrderQueue(orders);

        LocalDate currentDate = LocalDate.now();
        int safetyCounter = 0;

        while (!orderQueue.isEmpty()) {
            // Planificamos el día completo con TODOS los camiones disponibles
            List<Route> dailyRoutes = planDailyRoutes(orderQueue, currentDate, numberOfTrucks);
            
            if (!dailyRoutes.isEmpty()) {
                allRoutes.addAll(dailyRoutes);
                // Si usamos camiones hoy, avanzamos al siguiente día para la siguiente tanda (si quedan órdenes)
                currentDate = moveToNextWorkday(currentDate);
                safetyCounter = 0;
            } else {
                // Si no pudimos meter nada hoy (ej: orden gigante rechazada), avanzamos
                // para evitar bucle infinito, aunque idealmente la excepción lo atrapa antes.
                currentDate = moveToNextWorkday(currentDate);
                safetyCounter++;
                if (safetyCounter > 5) break; // Freno de emergencia
            }
        }
        return allRoutes;
    }

    private PriorityQueue<Order> initializeOrderQueue(List<Order> orders) {
        PriorityQueue<Order> orderQueue = new PriorityQueue<>(Comparator.comparing(Order::getDeliveryDate));
        orderQueue.addAll(orders);
        return orderQueue;
    }

    private List<Route> planDailyRoutes(PriorityQueue<Order> orderQueue, LocalDate currentDate, int numberOfTrucks) throws Exception {
        List<Route> dailyRoutes = new ArrayList<>();
        
        // Iteramos por cada camión disponible para el día de hoy
        for (int truckIndex = 0; truckIndex < numberOfTrucks; truckIndex++) {
            
            if (orderQueue.isEmpty()) break; // Ya no hay órdenes, dejamos de usar camiones

            // Preparamos un nuevo camión
            List<Order> ordersForTruck = new ArrayList<>();
            LocalTime estimatedTime = startTime;
            float totalDistance = 0.0f;

            // Llenamos este camión tanto como se pueda
            while (!orderQueue.isEmpty()) {
                Order currentOrder = orderQueue.peek(); // Miramos sin sacar

                if (isOutsideYucatan(currentOrder.getDestination())) {
                    orderQueue.poll(); // La sacamos
                    dailyRoutes.add(createSpecialRoute(currentOrder));
                    continue; // Esta ruta es aparte, no ocupa el camión actual
                }

                if (!isOrderDeliverableInTime(currentOrder, currentDate)) {
                    // Si la fecha no cuadra, aquí decides: ¿La saltas o la fuerzas?
                    // Por ahora la dejamos pasar para intentar ruteo.
                }

                // Cálculos
                float distance = calculateDistance(currentOrder);
                Duration totalOrderDuration = calculateOrderDuration(currentOrder);
                LocalTime timeIncludingReturn = calculateTotalTimeWithReturn(currentOrder, estimatedTime, totalOrderDuration);

                // VALIDACIÓN DE TIEMPO
                if (exceedsWorkHours(timeIncludingReturn)) {
                    // Si el camión está vacío y no cabe => Orden Gigante
                    if (ordersForTruck.isEmpty()) {
                         // Convertir a ruta especial o lanzar error.
                         // Estrategia: Sacarla de la cola y crear ruta especial de 1 solo viaje
                         orderQueue.poll();
                         dailyRoutes.add(createSpecialRoute(currentOrder));
                         // Consumimos este camión por hoy (break del while interno)
                         break; 
                    }
                    
                    // Si el camión ya tiene cosas => Se llenó por hoy.
                    // NO sacamos la orden de la cola (se queda para el siguiente camión o día)
                    break; // Cerramos este camión
                }

                // Si cabe, la sacamos y la agregamos al camión
                orderQueue.poll();
                ordersForTruck.add(currentOrder);
                totalDistance += distance;
                
                // Actualizar tiempo actual del camión
                double travelTime = geoDataProvider.calculateDurationBetweenTwoPoints(
                        geoDataProvider.getCoordinatesFromAddress(currentOrder.getDestination()),
                        geoDataProvider.getCoordinatesFromAddress(warehouseLocation));
                
                estimatedTime = timeIncludingReturn.minus(Duration.ofMinutes((long) travelTime));
            }

            // Si logramos meter cosas al camión, creamos la ruta
            if (!ordersForTruck.isEmpty()) {
                dailyRoutes.add(createRoute(ordersForTruck, totalDistance, estimatedTime));
            }
        }

        return dailyRoutes;
    }

    // ... (Resto de métodos privados se mantienen IGUAL) ...
    private boolean isOrderDeliverableInTime(Order order, LocalDate currentDate) {
        LocalDate deliveryDeadline = currentDate.plusDays(MAX_WORK_DAYS);
        return !order.getDeliveryDate().isAfter(deliveryDeadline);
    }

    private boolean isOutsideYucatan(String destination) {
        return destination != null && 
               !destination.toLowerCase().contains("yucatán") && 
               !destination.toLowerCase().contains("yucatan") &&
               !destination.toLowerCase().contains("merida") &&
               !destination.toLowerCase().contains("mérida");
    }

    private Route createSpecialRoute(Order order) throws Exception {
        float distance = calculateDistance(order);
        Duration totalOrderDuration = calculateOrderDuration(order);
        LocalTime estimatedTime = startTime.plus(totalOrderDuration);
        List<String> dests = new ArrayList<>(); dests.add(order.getDestination());
        List<Duration> times = new ArrayList<>(); times.add(order.getTotalAssemblyTime());
        
        Route route = new Route(warehouseLocation, dests, times, distance, estimatedTime);
        route.addOrder(order);
        return route;
    }

    private Route createRoute(List<Order> orders, float totalDistance, LocalTime estimatedTime) {
        List<String> destinations = new ArrayList<>();
        List<Duration> travelTimes = new ArrayList<>();
        for (Order order : orders) {
            destinations.add(order.getDestination());
            travelTimes.add(order.getTotalAssemblyTime());
        }
        Route route = new Route(warehouseLocation, destinations, travelTimes, totalDistance, estimatedTime);
        for(Order o : orders) route.addOrder(o);
        return route;
    }

    private float calculateDistance(Order order) throws Exception {
        double[] origin = geoDataProvider.getCoordinatesFromAddress(warehouseLocation);
        double[] dest = geoDataProvider.getCoordinatesFromAddress(order.getDestination());
        return (float) geoDataProvider.calculateDistanceBetweenTwoPoints(origin, dest);
    }

    private Duration calculateOrderDuration(Order order) throws Exception {
        double[] origin = geoDataProvider.getCoordinatesFromAddress(warehouseLocation);
        double[] dest = geoDataProvider.getCoordinatesFromAddress(order.getDestination());
        double travelTime = geoDataProvider.calculateDurationBetweenTwoPoints(origin, dest);
        return Duration.ofMinutes((long) travelTime).plus(order.getTotalAssemblyTime());
    }

    private LocalTime calculateTotalTimeWithReturn(Order order, LocalTime estimatedTime, Duration orderDuration) throws Exception {
        double[] dest = geoDataProvider.getCoordinatesFromAddress(order.getDestination());
        double[] origin = geoDataProvider.getCoordinatesFromAddress(warehouseLocation);
        double returnDuration = geoDataProvider.calculateDurationBetweenTwoPoints(dest, origin);
        return estimatedTime.plus(orderDuration).plusMinutes((long) returnDuration);
    }

    private boolean exceedsWorkHours(LocalTime timeIncludingReturn) {
        return Duration.between(startTime, timeIncludingReturn).compareTo(Duration.ofHours(MAX_HOURS_PER_DAY)) > 0;
    }

    private LocalDate moveToNextWorkday(LocalDate currentDate) {
        currentDate = currentDate.plusDays(1);
        if (currentDate.getDayOfWeek().getValue() > 5) {
            currentDate = currentDate.plusDays(8 - currentDate.getDayOfWeek().getValue());
        }
        return currentDate;
    }
}