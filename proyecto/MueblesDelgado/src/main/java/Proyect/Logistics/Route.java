package Proyect.Logistics;

import Proyect.StoreKeeper.Order;
import jakarta.persistence.*;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int routeId;

    private String originLocation;

    @ElementCollection
    private List<String> destinations;  // ElementCollection es para colecciones de tipos básicos, no son entidades

    @ElementCollection
    private List<Duration> travelTimes;  // ElementCollection es para colecciones de tipos básicos, no son entidades

    private float distance;  // Distancia total recorrida
    private LocalTime estimatedTime;  // Tiempo estimado para completar la ruta

    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Order> orders = new ArrayList<>();

    public Route() {}

    public Route(String p_originLocation, List<String> p_destinations,
                 List<Duration> p_travelTimes, float p_distance, LocalTime p_estimatedTime) {
        setOriginLocation(p_originLocation);
        setDestinations(p_destinations);
        setTravelTimes(p_travelTimes);
        setDistance(p_distance);
        setEstimatedTime(p_estimatedTime);
        this.orders = new ArrayList<>();
    }

    // Getters y setters
    public int getRouteId() {
        return routeId;
    }

    public String getOriginLocation() {
        return originLocation;
    }

    public void setOriginLocation(String originLocation) {
        this.originLocation = originLocation;
    }

    public List<String> getDestinations() {
        return destinations;
    }

    public void setDestinations(List<String> destinations) {
        this.destinations = destinations;
    }

    public List<Duration> getTravelTimes() {
        return travelTimes;
    }

    public void setTravelTimes(List<Duration> travelTimes) {
        this.travelTimes = travelTimes;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public LocalTime getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(LocalTime estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    // Método para agregar pedidos
    public void addOrder(Order order) {
        if (this.orders == null) {
            this.orders = new ArrayList<>(); // Protección extra
        }
        this.orders.add(order);
        order.setRoute(this);
    }

    @Override
    public String toString() {
        return "Route{" +
                "routeId=" + routeId +
                ", originLocation='" + originLocation + '\'' +
                ", destinations=" + destinations +
                ", distance=" + distance +
                ", estimatedTime=" + estimatedTime +
                ", orders=" + orders +
                '}';
    }
}
