package Proyect.Repositories;

import Proyect.Logistics.TruckDriver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TruckDriverRepository extends JpaRepository<TruckDriver, Integer> {
    
    Optional<TruckDriver> findByName(String name);

    // CORRECCIÓN: Usar 'ta.truckDriver'
    @Query("SELECT d FROM TruckDriver d WHERE d.licenseNumber NOT IN (SELECT ta.truckDriver.licenseNumber FROM TruckAssignment ta)")
    List<TruckDriver> findAvailableDrivers();
}