package Proyect.Controllers;

import Proyect.Logistics.LogisticsAdminService;
import Proyect.Logistics.OrderTruckAssignment;
import Proyect.Logistics.Route;
import Proyect.StoreKeeper.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/logistics")
public class LogisticsAdminController {

    private final LogisticsAdminService logisticsAdminService;

    @Autowired
    public LogisticsAdminController(LogisticsAdminService logisticsAdminService) {
        this.logisticsAdminService = logisticsAdminService;
    }

    // --- Endpoint NUEVO: Generar rutas para órdenes seleccionadas manualmente ---
    @PostMapping("/generate-custom-routes")
    public ResponseEntity<?> generateCustomRoutes(@RequestBody List<Integer> orderIds) {
        try {
            logisticsAdminService.generateCustomRoutes(orderIds);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    // --- Endpoints Existentes (Para compatibilidad o uso futuro) ---

    // Endpoint para planificar rutas (Solo cálculo, sin guardar)
    @PostMapping("/planRoutes")
    public ResponseEntity<?> planRoutes(@RequestBody List<Order> orders) {
        try {
            List<Route> plannedRoutes = logisticsAdminService.planRoutes(orders);
            return ResponseEntity.ok(plannedRoutes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    // Endpoint para asignar rutas manualmente (si envías objetos Route completos)
    @PostMapping("/assignRoutes")
    public ResponseEntity<Void> assignRoutes(@RequestBody List<Route> plannedRoutes, @RequestBody List<Order> orders) {
        try {
            logisticsAdminService.assignRoutesToTrucks(plannedRoutes, orders);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // Endpoint para obtener el historial de asignaciones
    @GetMapping("/assignmentsRoutesTrucks")
    public ResponseEntity<List<OrderTruckAssignment>> getAssignments() {
        List<OrderTruckAssignment> assignments = logisticsAdminService.getOrderTruckAssignments();
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/routes")
    public ResponseEntity<List<Route>> getAllRoutes() {
        return ResponseEntity.ok(logisticsAdminService.getAllRoutes());
    }
}