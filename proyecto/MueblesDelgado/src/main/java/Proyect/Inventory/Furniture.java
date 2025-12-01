package Proyect.Inventory;

import Proyect.StoreKeeper.Order;
import Proyect.Validations.ValidationUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Furniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Recomendado para auto-incremento
    private int furnitureId;

    private String type;
    private String brand;
    private String color;

    @Embedded
    private Dimension dimension = new Dimension(1f, 1f, 1f);

    private int quantity;
    private int buildTime;

    // --- RELACIÓN CORREGIDA ---
    @ManyToOne
    @JoinColumn(name = "order_id") // Nombre de la columna en la base de datos
    @JsonIgnore // Evita ciclos infinitos al convertir a JSON
    private Order order;

    public Furniture(int p_furnitureId, String p_type, String p_brand, String p_color, Dimension p_dimension, int p_quantity, int p_buildTime) {
        // Si usas GeneratedValue, no es necesario setFurnitureId en el constructor para nuevos objetos
        setFurnitureId(p_furnitureId);
        setType(p_type);
        setBrand(p_brand);
        setColor(p_color);
        setDimension(p_dimension);
        setQuantity(p_quantity);
        setBuildTime(p_buildTime);
    }

    public Furniture(){}

    // --- GETTERS Y SETTERS DE RELACIÓN ---
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    // Método auxiliar para mantener compatibilidad si tu front envía/recibe orderID plano
    public int getOrderID() {
        return (order != null) ? order.getOrderID() : 0;
    }

    // --- GETTERS Y SETTERS ESTÁNDAR ---
    public int getFurnitureId() {
        return furnitureId;
    }

    public void setFurnitureId(int p_furnitureId) {
        // ValidationUtils.validateGreaterThanZero(p_furnitureId, "Furniture ID"); // Comentado si el ID es autogenerado (0 al inicio)
        this.furnitureId = p_furnitureId;
    }

    public String getType() {
        return type;
    }

    public void setType(String p_type) {
        ValidationUtils.validateNonNull(p_type, "Type");
        this.type = p_type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String p_brand) {
        ValidationUtils.validateNonNull(p_brand, "Brand");
        this.brand = p_brand;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String p_color) {
        ValidationUtils.validateNonNull(p_color, "Color");
        this.color = p_color;
    }

    public Dimension getDimension() {
        return dimension;
    }

    public void setDimension(Dimension p_dimension) {
        ValidationUtils.validateNonNull(p_dimension, "Dimension");
        this.dimension = p_dimension;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int p_quantity) {
        ValidationUtils.validateNonNegativeNumber(p_quantity, "Quantity");
        this.quantity = p_quantity;
    }

    public int getBuildTime() {
        return buildTime;
    }

    public void setBuildTime(int p_buildTime) {
        ValidationUtils.validateGreaterThanZero(p_buildTime, "Build Time");
        this.buildTime = p_buildTime;
    }

    @Override
    public boolean equals(Object p_object) {
        if (!(p_object instanceof Furniture furniture))
            return false;
        return furnitureId == furniture.furnitureId;
    }
}