package Proyect.Controllers;

import Proyect.Inventory.Furniture;
import Proyect.Inventory.InventoryAdmin;
import Proyect.Inventory.PackingList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryAdminController {

    @Autowired
    private InventoryAdmin inventoryAdminService;

    @PostMapping("/add_furniture")
    public ResponseEntity<Void> addFurniture(@RequestBody PackingList packingList) {
        // CORREGIDO: Usar el nombre correcto del método en el servicio
        inventoryAdminService.addFurnitureItemsToInventory(packingList);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/remove_furniture")
    public ResponseEntity<Void> removeFurniture(@RequestBody PackingList packingList) {
        // CORREGIDO: Usar el nombre correcto del método en el servicio
        inventoryAdminService.removeFurnitureItemsFromInventory(packingList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update_furniture")
    public ResponseEntity<Void> updateFurniture(@RequestBody PackingList packingList) {
        // CORREGIDO: Usar el nombre correcto del método en el servicio
        inventoryAdminService.updateFurnitureItemsInInventory(packingList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/retrieve_furniture")
    public ResponseEntity<List<Furniture>> getAllFurnitureWithQuantities() {
        List<Furniture> furnitureList = inventoryAdminService.retrieveAllFurnitureFromInventory();
        return new ResponseEntity<>(furnitureList, HttpStatus.OK);
    }

    @GetMapping("/getpackinglist")
    public ResponseEntity<List<PackingList>> getAllPackingList() {
        // CORREGIDO: El método en el servicio se llama getAllPackingLists
        List<PackingList> packingLists = inventoryAdminService.getAllPackingLists();
        return new ResponseEntity<>(packingLists, HttpStatus.OK);
    }
}