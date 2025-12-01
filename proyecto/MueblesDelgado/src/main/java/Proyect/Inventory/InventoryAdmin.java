package Proyect.Inventory;

import Proyect.Repositories.FurnitureRepository;
import Proyect.Repositories.PackingListRepository;
import Proyect.Repositories.OrderRepository;
import Proyect.StoreKeeper.Order;
import Proyect.Validations.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class InventoryAdmin {

    @Autowired
    private FurnitureRepository furnitureRepository;

    @Autowired
    private PackingListRepository packingListRepository;

    @Autowired
    private OrderRepository orderRepository; // Necesario para buscar/crear órdenes

    public List<PackingList> getAllPackingLists() {
        return packingListRepository.findAll();
    }

    @Transactional
    public void addFurnitureItemsToInventory(PackingList p_packingList) {
        ValidationUtils.validateNonNull(p_packingList, "Packing List");

        // Lógica vital: Vincular muebles con órdenes
        if (p_packingList.getProducts() != null) {
            for (Furniture f : p_packingList.getProducts()) {
                // Leemos el ID que mandó el JSON
                Integer targetId = f.getTempOrderID();

                if (targetId != null && targetId > 0) {
                    // Buscamos la orden o creamos una básica si no existe
                    Order order = orderRepository.findById(targetId)
                            .orElseGet(() -> {
                                Order newOrder = new Order();
                                newOrder.setDestination("Destino pendiente");
                                newOrder.setDeliveryDate(LocalDate.now().plusDays(7)); // Fecha default
                                return orderRepository.save(newOrder);
                            });

                    // Vinculamos el mueble a esa orden
                    f.setOrder(order);
                }
            }
        }

        // Guardar el PackingList (guarda los muebles en cascada)
        packingListRepository.save(p_packingList);
    }

    public void removeFurnitureItemsFromInventory(PackingList p_packingList) {
        ValidationUtils.validateNonNull(p_packingList, "Packing List");
        if(packingListRepository.existsById(p_packingList.getFolio())){
            packingListRepository.delete(p_packingList);
        }
    }

    public void updateFurnitureItemsInInventory(PackingList p_packingList) {
        ValidationUtils.validateNonNull(p_packingList, "Packing List");
        if(packingListRepository.existsById(p_packingList.getFolio())){
            packingListRepository.save(p_packingList);
        }
    }

    public List<Furniture> retrieveAllFurnitureFromInventory() {
        return furnitureRepository.findAll();
    }
}