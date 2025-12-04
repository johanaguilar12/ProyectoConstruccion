package Proyect.Controllers;

import Proyect.Authentication.AuthenticationService;
import Proyect.Authentication.Administrator;
import Proyect.Authentication.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AdministratorAuthContoller {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login") // Aseguramos la ruta /login explícita
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        try {
            // 1. Autenticar
            Administrator admin = authenticationService.authenticate(
                    credentials.get("name"),
                    credentials.get("password")
            );
            
            // 2. Generar respuesta JSON completa
            return ResponseEntity.ok(Map.of(
                "token", JwtUtil.generateToken(admin.getName()),
                "user", admin.getName(),
                "uid", admin.getId()
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/renew")
    public ResponseEntity<Map<String, Object>> renewToken(@RequestHeader("x-token") String token) {
        try {
            // 1. Validar token y obtener el usuario real
            Administrator admin = authenticationService.validateToken(token);
            
            // 2. Generar nuevo token
            String newToken = JwtUtil.generateToken(admin.getName());

            // 3. Devolver JSON completo (Token + Datos de usuario)
            return ResponseEntity.ok(Map.of(
                "token", newToken,
                "user", admin.getName(),
                "uid", admin.getId()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Token inválido o expirado"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerAdministrator(@RequestBody Administrator newAdmin) {
        try {
            authenticationService.registerAdministrator(newAdmin);
            return new ResponseEntity<>("Administrador creado exitosamente", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/admins")
    public ResponseEntity<Iterable<Administrator>> getAllAdministrators() {
        return new ResponseEntity<>(authenticationService.getAllAdministrators(), HttpStatus.OK);
    }

    @DeleteMapping("/admins/{id}")
    public ResponseEntity<String> deleteAdministrator(@PathVariable Long id) {
        try {
            authenticationService.deleteAdministrator(id);
            return new ResponseEntity<>("Administrador eliminado", HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}