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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@Service
public class InventoryAdmin {

    @Autowired
    private FurnitureRepository furnitureRepository;
    
    @Autowired
    private PackingListRepository packingListRepository;
    
    @Autowired
    private OrderRepository orderRepository; 

    public List<PackingList> getAllPackingLists() {
        return packingListRepository.findAll();
    }

    @Transactional
    public void addFurnitureItemsToInventory(PackingList p_packingList) {
        ValidationUtils.validateNonNull(p_packingList, "Packing List");

        List<Furniture> products = p_packingList.getProducts();
        
        Map<Integer, Order> tempIdToRealOrderMap = new HashMap<>();

        if (products != null) {
            for (Furniture f : products) {
                Integer targetId = f.getTempOrderID();
                
                if (targetId == null || targetId <= 0) {
                    throw new IllegalArgumentException("Error: Un mueble no tiene ID de orden asignado.");
                }

                Order orderToAssign = null;

                // --- Lógica de Orden ---
                if (tempIdToRealOrderMap.containsKey(targetId)) {
                    orderToAssign = tempIdToRealOrderMap.get(targetId);
                } else if (orderRepository.existsById(targetId)) {
                    orderToAssign = orderRepository.findById(targetId).orElse(null);
                }

                if (orderToAssign == null) {
                    Order newOrder = new Order();
                    newOrder.setDestination("Destino pendiente (" + targetId + ")");
                    newOrder.setDeliveryDate(LocalDate.now().plusDays(7));
                    newOrder.setOrderContent(new ArrayList<>());
                    
                    orderToAssign = orderRepository.saveAndFlush(newOrder);
                    tempIdToRealOrderMap.put(targetId, orderToAssign);
                }

                // --- Asignación ---
                f.setOrder(orderToAssign);
                
            }
        }
        packingListRepository.save(p_packingList);
    }

   
    public void removeFurnitureItemsFromInventory(PackingList p_packingList) {
        if(packingListRepository.existsById(p_packingList.getFolio())){
            packingListRepository.delete(p_packingList);
        }
    }

    public void updateFurnitureItemsInInventory(PackingList p_packingList) {
        if(packingListRepository.existsById(p_packingList.getFolio())){
            packingListRepository.save(p_packingList);
        }
    }

    public List<Furniture> retrieveAllFurnitureFromInventory() {
        return furnitureRepository.findAll();
    }
}