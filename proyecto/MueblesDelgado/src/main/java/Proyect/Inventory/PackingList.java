package Proyect.Inventory;

import Proyect.Validations.ValidationUtils;
import com.fasterxml.jackson.annotation.JsonFormat; 
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class PackingList {

    @Id
    private int folio = 0;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Furniture> products = new ArrayList<>();

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd") 
    private Date arrivalDate = new Date();

    public PackingList(int p_folio, List<Furniture> p_products, Date p_arrivalDate) {
        setFolio(p_folio);
        setProducts(p_products);
        setArrivalDate(p_arrivalDate);
    }

    public PackingList() {}

    public List<Furniture> getProducts() { return products; }

    public void setProducts(List<Furniture> p_products) {
        ValidationUtils.validatesList(p_products, "Products");
        this.products = p_products;
    }

    public int getFolio() { return folio; }

    public void setFolio(int p_folio) {
        ValidationUtils.validateGreaterThanZero(p_folio, "Folio");
        this.folio = p_folio;
    }

    public Date getArrivalDate() { return arrivalDate; }

    public void setArrivalDate(Date p_arrivalDate) {
        ValidationUtils.validateNonNull(p_arrivalDate, "Date");
        this.arrivalDate = p_arrivalDate;
    }
}