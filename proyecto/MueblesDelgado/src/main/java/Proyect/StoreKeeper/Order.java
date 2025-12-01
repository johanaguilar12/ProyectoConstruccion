package Proyect.StoreKeeper;

import Proyect.Inventory.Furniture;
import Proyect.Logistics.Route;
import Proyect.Validations.ValidationUtils;
import jakarta.persistence.*;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderID;

    private String destination;

    // Usar LocalDate es mejor para bases de datos modernas
    @Temporal(TemporalType.DATE)
    private LocalDate deliveryDate;

    // --- RELACIÓN BIDIRECCIONAL ---
    // CascadeType.ALL: Si guardas la orden, se guardan los muebles
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Furniture> orderContent = new ArrayList<>();

    private Duration totalAssemblyTime = Duration.ZERO;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = true)
    private Route route;

    public Order() {}

    public Order(String p_destination, LocalDate p_deliveryDate) {
        setDestination(p_destination);
        setDeliveryDate(p_deliveryDate);
    }

    // --- LÓGICA DE VINCULACIÓN ---
    public void setOrderContent(List<Furniture> p_orderContent) {
        this.orderContent = p_orderContent;
        // Al asignar muebles, les decimos "Yo soy tu orden"
        if (this.orderContent != null) {
            for (Furniture f : this.orderContent) {
                f.setOrder(this);
            }
            calculateAssemblyTime();
        }
    }

    public void calculateAssemblyTime() {
        long totalMinutes = 0;
        if (orderContent != null) {
            for (Furniture furniture : orderContent) {
                totalMinutes += (long) furniture.getBuildTime() * furniture.getQuantity();
            }
        }
        this.totalAssemblyTime = Duration.ofMinutes(totalMinutes);
    }

    // Getters y Setters
    public int getOrderID() { return orderID; }
    public void setOrderID(int orderID) { this.orderID = orderID; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) {
        ValidationUtils.validateNonNull(destination, "Destination");
        this.destination = destination;
    }

    public LocalDate getDeliveryDate() { return deliveryDate; }
    public void setDeliveryDate(LocalDate deliveryDate) {
        ValidationUtils.validateNonNull(deliveryDate, "Delivery Date");
        this.deliveryDate = deliveryDate;
    }

    public List<Furniture> getOrderContent() { return orderContent; }

    public Duration getTotalAssemblyTime() { return totalAssemblyTime; }
    public void setTotalAssemblyTime(Duration totalAssemblyTime) { this.totalAssemblyTime = totalAssemblyTime; }

    public Route getRoute() { return route; }
    public void setRoute(Route route) { this.route = route; }
}