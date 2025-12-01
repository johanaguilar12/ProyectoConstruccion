package Proyect.Inventory;

import Proyect.StoreKeeper.Order;
import Proyect.Validations.ValidationUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Furniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int furnitureId;

    private String type;
    private String brand;
    private String color;

    @Embedded
    private Dimension dimension = new Dimension(1f, 1f, 1f);

    private int quantity;
    private int buildTime;

    // --- RELACIÓN CON LA ORDEN ---
    @ManyToOne
    @JoinColumn(name = "order_id") // Esto crea la columna real en la BD
    @JsonIgnore // Evita bucles infinitos al convertir a JSON
    private Order order;

    // --- CAMPO TEMPORAL ---
    // Esto sirve para recibir el "orderID" simple que manda el Frontend
    @Transient
    private Integer tempOrderID;

    public Furniture() {}

    public Furniture(int p_furnitureId, String p_type, String p_brand, String p_color, Dimension p_dimension, int p_quantity, int p_buildTime) {
        setFurnitureId(p_furnitureId);
        setType(p_type);
        setBrand(p_brand);
        setColor(p_color);
        setDimension(p_dimension);
        setQuantity(p_quantity);
        setBuildTime(p_buildTime);
    }

    // --- MÉTODOS PARA MANEJAR EL ID DEL JSON ---

    // Jackson usa esto cuando recibe el JSON {"orderID": 5}
    public void setOrderID(int id) {
        this.tempOrderID = id;
    }

    // Jackson usa esto para enviar el JSON al frontend
    public int getOrderID() {
        if (order != null) {
            return order.getOrderID();
        }
        return (tempOrderID != null) ? tempOrderID : 0;
    }

    // Método para uso interno en el servicio
    public Integer getTempOrderID() {
        return tempOrderID;
    }

    // Getters y Setters de la relación real
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    // --- RESTO DE GETTERS Y SETTERS ---
    public int getFurnitureId() { return furnitureId; }
    public void setFurnitureId(int furnitureId) { this.furnitureId = furnitureId; }
    public String getType() { return type; }
    public void setType(String type) { ValidationUtils.validateNonNull(type, "Type"); this.type = type; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { ValidationUtils.validateNonNull(brand, "Brand"); this.brand = brand; }
    public String getColor() { return color; }
    public void setColor(String color) { ValidationUtils.validateNonNull(color, "Color"); this.color = color; }
    public Dimension getDimension() { return dimension; }
    public void setDimension(Dimension dimension) { ValidationUtils.validateNonNull(dimension, "Dimension"); this.dimension = dimension; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { ValidationUtils.validateNonNegativeNumber(quantity, "Quantity"); this.quantity = quantity; }
    public int getBuildTime() { return buildTime; }
    public void setBuildTime(int buildTime) { ValidationUtils.validateGreaterThanZero(buildTime, "Build Time"); this.buildTime = buildTime; }
}