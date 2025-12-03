package Proyect.Logistics;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Proyect.Repositories.DeliveryTruckRepository;
import Proyect.Repositories.TruckAssignmentRepository;
import Proyect.Repositories.TruckDriverRepository;

@Service
public class DeliveryTruckAdmin {

    private DeliveryTruckRepository deliveryTruckRepository;
    private TruckDriverRepository truckDriverRepository;
    private TruckAssignmentRepository truckAssignmentRepository;

    @Autowired
    public DeliveryTruckAdmin(
        DeliveryTruckRepository p_deliveryTruckRepository,   
        TruckDriverRepository p_truckDriverRepository, 
        TruckAssignmentRepository p_truckAssignmentRepository) {
        this.deliveryTruckRepository = p_deliveryTruckRepository;
        this.truckDriverRepository = p_truckDriverRepository;
        this.truckAssignmentRepository = p_truckAssignmentRepository;
    }

    @Transactional
    public void registerDeliveryTruck(DeliveryTruck p_deliveryTruck) {
        deliveryTruckRepository.save(p_deliveryTruck);
    }

    @Transactional
    public void registerTruckDriver(TruckDriver p_truckDriver) {
        truckDriverRepository.save(p_truckDriver);
    }

    public List<DeliveryTruck> getAvailableTrucks() {
        return deliveryTruckRepository.findAvailableTrucks(); 
    }

    public List<TruckDriver> getAvailableDrivers() {
        return truckDriverRepository.findAvailableDrivers(); 
    }

    public List<DeliveryTruck> getAllTrucks() {
        return deliveryTruckRepository.findAll();
    }

    public List<TruckDriver> getAllDrivers() {
        return truckDriverRepository.findAll();
    }

    @Transactional
    public void assignDriverToTruck(String p_trackingNumber, String p_name) {
        // 1. Buscar entidades
        DeliveryTruck selectedTruck = deliveryTruckRepository.findByTrackingNumber(p_trackingNumber)
                .orElseThrow(() -> new IllegalArgumentException("Camión no encontrado: " + p_trackingNumber));
        
        TruckDriver selectedDriver = truckDriverRepository.findByName(p_name)
                .orElseThrow(() -> new IllegalArgumentException("Conductor no encontrado: " + p_name));

        // 2. LÓGICA DE LIMPIEZA
        
        // CORRECCIÓN: Usar el nombre nuevo 'findByDeliveryTruck'
        Optional<TruckAssignment> currentTruckAssign = truckAssignmentRepository.findByDeliveryTruck(selectedTruck);
        if (currentTruckAssign.isPresent()) {
            truckAssignmentRepository.delete(currentTruckAssign.get());
        }

        // CORRECCIÓN: Usar el nombre nuevo 'findByTruckDriver'
        Optional<TruckAssignment> currentDriverAssign = truckAssignmentRepository.findByTruckDriver(selectedDriver);
        if (currentDriverAssign.isPresent()) {
            truckAssignmentRepository.delete(currentDriverAssign.get());
        }
        
        // 3. Guardar nueva asignación
        truckAssignmentRepository.save(new TruckAssignment(selectedTruck, selectedDriver));
    }

    public List<TruckAssignment> getTruckAssignments() {
        return truckAssignmentRepository.findAll();
    }
}