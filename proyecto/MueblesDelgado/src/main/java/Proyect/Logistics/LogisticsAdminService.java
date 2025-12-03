package Proyect.Logistics;

import Proyect.Repositories.DeliveryTruckRepository;
import Proyect.Repositories.OrderTruckAssignmentRepository;
import Proyect.Repositories.OrderRepository;
import Proyect.Repositories.RouteRepository;
import Proyect.StoreKeeper.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LogisticsAdminService {

    @Autowired
    private DeliveryTruckRepository deliveryTruckRepository;

    @Autowired
    private OrderTruckAssignmentRepository orderTruckAssignmentRepository;

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private RouteRepository routeRepository;
    
    private final RoutePlanner routePlanner;

    @Autowired
    public LogisticsAdminService(RoutePlanner routePlanner) {
        this.routePlanner = routePlanner;
    }

    public List<DeliveryTruck> getAvailableTrucks() {
        return deliveryTruckRepository.findAll();
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public List<OrderTruckAssignment> getOrderTruckAssignments() {
        return orderTruckAssignmentRepository.findAll();
    }

    // --- 1. NUEVO MÉTODO PRINCIPAL (Generación por Selección) ---
    @Transactional
    public void generateCustomRoutes(List<Integer> orderIds) throws Exception {
        // A. Obtener órdenes seleccionadas
        List<Order> selectedOrders = orderRepository.findAllById(orderIds);
        
        if (selectedOrders.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron órdenes con los IDs proporcionados.");
        }

        // B. Validar que no tengan ruta ya asignada
        for (Order o : selectedOrders) {
            if (o.getRoute() != null) {
                throw new IllegalStateException("La orden " + o.getOrderID() + " ya tiene una ruta asignada.");
            }
        }

        // C. Obtener camiones
        List<DeliveryTruck> trucks = getAvailableTrucks();
        if (trucks.isEmpty()) throw new RuntimeException("No hay camiones disponibles.");

        // D. Calcular Rutas (El Planner las crea en memoria)
        List<Route> generatedRoutes = routePlanner.planOptimalRoutes(selectedOrders, trucks.size());

        if (generatedRoutes.isEmpty()) {
             throw new RuntimeException("No se pudieron generar rutas válidas (verifique direcciones o capacidades).");
        }

        // E. Guardar todo en la BD
        saveAndAssignRoutes(generatedRoutes, trucks);
    }

    // --- 2. MÉTODOS DE COMPATIBILIDAD (Para que no falle el Controlador) ---

    public List<Route> planRoutes(List<Order> orders) throws Exception {
        List<DeliveryTruck> trucks = getAvailableTrucks();
        if (trucks.isEmpty()) throw new IllegalArgumentException("No hay camiones disponibles");
        return routePlanner.planOptimalRoutes(orders, trucks.size());
    }

    @Transactional
    public void assignRoutesToTrucks(List<Route> plannedRoutes, List<Order> orders) {
        List<DeliveryTruck> trucks = getAvailableTrucks();
        if (trucks.isEmpty()) throw new RuntimeException("No hay camiones disponibles");
        saveAndAssignRoutes(plannedRoutes, trucks);
    }

    // --- 3. MÉTODO PRIVADO DE GUARDADO ---
    private void saveAndAssignRoutes(List<Route> routesToSave, List<DeliveryTruck> trucks) {
        int truckIndex = 0;
        for (Route route : routesToSave) {
            // Guardar la Ruta para tener ID
            routeRepository.save(route);

            // Asignar camión (Round Robin)
            DeliveryTruck truck = trucks.get(truckIndex % trucks.size());
            truckIndex++;

            // Crear relación Camión-Ruta
            OrderTruckAssignment assignment = new OrderTruckAssignment(truck, route);
            orderTruckAssignmentRepository.save(assignment);

            // Actualizar las órdenes con la nueva ruta
            if (route.getOrders() != null) {
                for (Order order : route.getOrders()) {
                    order.setRoute(route);
                    orderRepository.save(order);
                }
            }
        }
    }
}