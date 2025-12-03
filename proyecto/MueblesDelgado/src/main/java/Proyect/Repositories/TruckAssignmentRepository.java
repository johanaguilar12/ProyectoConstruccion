package Proyect.Repositories;

import Proyect.Logistics.DeliveryTruck;
import Proyect.Logistics.TruckAssignment;
import Proyect.Logistics.TruckDriver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TruckAssignmentRepository extends JpaRepository<TruckAssignment, Integer> {
    
    // CORRECCIÓN: Usar 'findByDeliveryTruck' (nombre exacto del atributo en la clase)
    Optional<TruckAssignment> findByDeliveryTruck(DeliveryTruck deliveryTruck);
    
    // CORRECCIÓN: Usar 'findByTruckDriver' (nombre exacto del atributo en la clase)
    Optional<TruckAssignment> findByTruckDriver(TruckDriver truckDriver);
    
    boolean existsByDeliveryTruckAndTruckDriver(DeliveryTruck deliveryTruck, TruckDriver truckDriver);
}