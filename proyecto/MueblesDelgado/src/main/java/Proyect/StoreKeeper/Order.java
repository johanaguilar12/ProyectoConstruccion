package Proyect.StoreKeeper;

import Proyect.Inventory.Furniture;
import Proyect.Logistics.Route;
import Proyect.Validations.ValidationUtils;
import jakarta.persistence.*;
import java.time.Duration;
import java.time.LocalDate; // Recomendado usar LocalDate en lugar de Date
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderID;

    private String destination;

    // Cambiado a LocalDate para evitar problemas de zonas horarias y formato
    private LocalDate deliveryDate;

    // --- RELACIÓN CORREGIDA ---
    // mappedBy = "order" refiere al atributo 'private Order order' en Furniture
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Furniture> orderContent = new ArrayList<>();

    private Duration totalAssemblyTime = Duration.ZERO;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = true)
    private Route route;

    public Order() {
    }

    public Order(String p_destination, LocalDate p_deliveryDate) {
        setDestination(p_destination);
        setDeliveryDate(p_deliveryDate);
    }

    // Calcula el tiempo total basándose en los muebles actuales
    public void calculateAssemblyTime() {
        long totalMinutes = 0;
        if (orderContent != null) {
            for (Furniture furniture : orderContent) {
                totalMinutes += (long) furniture.getBuildTime() * furniture.getQuantity();
            }
        }
        this.totalAssemblyTime = Duration.ofMinutes(totalMinutes);
    }

    // --- GETTERS Y SETTERS ---

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String p_destination) {
        ValidationUtils.validateNonNull(p_destination, "Destination");
        this.destination = p_destination;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate p_deliveryDate) {
        ValidationUtils.validateNonNull(p_deliveryDate, "Delivery Date");
        this.deliveryDate = p_deliveryDate;
    }

    public List<Furniture> getOrderContent() {
        return orderContent;
    }

    public void setOrderContent(List<Furniture> p_orderContent) {
        this.orderContent = p_orderContent;
        // VINCULACIÓN IMPORTANTE: Asignar esta orden a cada mueble
        if (this.orderContent != null) {
            for (Furniture f : this.orderContent) {
                f.setOrder(this);
            }
            calculateAssemblyTime(); // Recalcular tiempo al setear contenido
        }
    }

    // Método helper para agregar un solo mueble
    public void addFurniture(Furniture furniture) {
        if (orderContent == null) orderContent = new ArrayList<>();
        orderContent.add(furniture);
        furniture.setOrder(this);
        calculateAssemblyTime();
    }

    public Duration getTotalAssemblyTime() {
        return totalAssemblyTime;
    }

    public void setTotalAssemblyTime(Duration totalAssemblyTime) {
        this.totalAssemblyTime = totalAssemblyTime;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }
}