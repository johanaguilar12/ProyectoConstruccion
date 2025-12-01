package Proyect.Inventory;

import Proyect.Validations.ValidationUtils;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List; // Importante: Usar List, no solo ArrayList

@Entity
public class PackingList {

	@Id
	private int folio;

	// CORRECCIÓN: Cambiar 'ArrayList' por 'List'
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Furniture> products = new ArrayList<>();

	@Temporal(TemporalType.DATE)
	private Date arrivalDate;

	public PackingList() {}

	public PackingList(int p_folio, List<Furniture> p_products, Date p_arrivalDate) {
		setFolio(p_folio);
		setProducts(p_products);
		setArrivalDate(p_arrivalDate);
	}

	public int getFolio() {
		return folio;
	}

	public void setFolio(int folio) {
		ValidationUtils.validateGreaterThanZero(folio, "Folio");
		this.folio = folio;
	}

	public List<Furniture> getProducts() {
		return products;
	}

	public void setProducts(List<Furniture> products) {
		if (products == null) {
			this.products = new ArrayList<>();
		} else {
			this.products = products;
		}
	}

	public Date getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(Date arrivalDate) {
		ValidationUtils.validateNonNull(arrivalDate, "Date");
		this.arrivalDate = arrivalDate;
	}

	public void addProduct(Furniture furniture) {
		if (this.products == null) {
			this.products = new ArrayList<>();
		}
		this.products.add(furniture);
	}
}