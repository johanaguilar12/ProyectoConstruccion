package Proyect.Controllers;

import Proyect.Logistics.LogisticsAdminService;
import Proyect.Logistics.OrderTruckAssignment;
import Proyect.Logistics.Route;
import Proyect.StoreKeeper.Order;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Endpoint para planificar rutas
    @PostMapping("/planRoutes")
    public ResponseEntity<?> planRoutes(@RequestBody List<Order> orders) { // Cambia <List<Route>> por <?>
        try {
            List<Route> plannedRoutes = logisticsAdminService.planRoutes(orders);
            return ResponseEntity.ok(plannedRoutes);
        } catch (Exception e) {
            e.printStackTrace(); // Esto imprimirá el error completo en la consola de Java
            // Devuelve el mensaje de la excepción al frontend
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    // Endpoint para asignar rutas a los camiones
    @PostMapping("/assignRoutes")
    public ResponseEntity<Void> assignRoutes(@RequestBody List<Route> plannedRoutes, @RequestBody List<Order> orders) {
        try {
            // Asignar las rutas planificadas a los camiones y órdenes correspondientes
            logisticsAdminService.assignRoutesToTrucks(plannedRoutes, orders);
            return ResponseEntity.ok().build();  // Responde con un 200 OK si la asignación fue exitosa
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();  // Responde con un error 400 si ocurre una excepción
        }
    }

    // Endpoint para obtener todas las asignaciones de camiones a rutas
    @GetMapping("/assignmentsRoutesTrucks")
    public ResponseEntity<List<OrderTruckAssignment>> getAssignments() {
        // Obtener todas las asignaciones de camiones a rutas
        List<OrderTruckAssignment> assignments = logisticsAdminService.getOrderTruckAssignments();
        return ResponseEntity.ok(assignments);  // Responde con la lista de asignaciones
    }
}
