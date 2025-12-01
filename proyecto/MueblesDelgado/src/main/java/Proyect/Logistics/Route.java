package Proyect.Logistics;

import Proyect.StoreKeeper.Order;
import Proyect.Validations.ValidationUtils;
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

    @ElementCollection // Permite guardar una lista de Strings en la BD
    private List<String> destinations;

    @ElementCollection // Permite guardar una lista de Duraciones
    private List<Duration> travelTimes;

    private float distance;
    private LocalTime estimatedTime;

    // Relación con las órdenes asignadas a esta ruta
    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    public Route() {}

    // Constructor compatible con RoutePlanner.java
    public Route(String p_originLocation, List<String> p_destinations,
                 List<Duration> p_travelTimes, float p_distance, LocalTime p_estimatedTime) {
        setOriginLocation(p_originLocation);
        setDestinations(p_destinations);
        setTravelTimes(p_travelTimes);
        setDistance(p_distance);
        setEstimatedTime(p_estimatedTime);
    }

    // --- GETTERS Y SETTERS CON VALIDACIONES ---

    public int getRouteId() {
        return routeId;
    }

    public void setRouteId(int p_routeId) {
        // En JPA el ID se genera solo, pero mantenemos la validación por si se usa manualmente
        // ValidationUtils.validateGreaterThanZero(p_routeId, "Route Id");
        this.routeId = p_routeId;
    }

    public String getOriginLocation() {
        return originLocation;
    }

    public void setOriginLocation(String p_originLocation) {
        ValidationUtils.validateNonNull(p_originLocation, "Origin Location");
        this.originLocation = p_originLocation;
    }

    public List<String> getDestinations() {
        return destinations;
    }

    public void setDestinations(List<String> p_destinations) {
        ValidationUtils.validateNonNull(p_destinations, "Destinations");
        this.destinations = p_destinations;
    }

    public List<Duration> getTravelTimes() {
        return travelTimes;
    }

    public void setTravelTimes(List<Duration> p_travelTimes) {
        ValidationUtils.validateNonNull(p_travelTimes, "Travel Times");
        this.travelTimes = p_travelTimes;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float p_distance) {
        ValidationUtils.validateGreaterThanZero(p_distance, "Distance");
        this.distance = p_distance;
    }

    public LocalTime getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(LocalTime p_estimatedTime) {
        // ValidationUtils.validateEstimatedTime(p_estimatedTime, "Estimated Time");
        // Asegúrate de que validateEstimatedTime maneje nulos o validaciones correctas
        this.estimatedTime = p_estimatedTime;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    // Método helper para agregar órdenes y mantener la relación
    public void addOrder(Order order) {
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
                '}';
    }
}