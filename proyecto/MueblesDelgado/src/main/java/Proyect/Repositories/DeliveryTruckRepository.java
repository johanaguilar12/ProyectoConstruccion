package Proyect.Repositories;

import Proyect.Logistics.DeliveryTruck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

// CORRECCIÓN: ID es String, no Integer
@Repository
public interface DeliveryTruckRepository extends JpaRepository<DeliveryTruck, String> {
    
    Optional<DeliveryTruck> findByTrackingNumber(String trackingNumber);

    // CORRECCIÓN: Usar 'ta.deliveryTruck'
    @Query("SELECT t FROM DeliveryTruck t WHERE t.trackingNumber NOT IN (SELECT ta.deliveryTruck.trackingNumber FROM TruckAssignment ta)")
    List<DeliveryTruck> findAvailableTrucks();
}