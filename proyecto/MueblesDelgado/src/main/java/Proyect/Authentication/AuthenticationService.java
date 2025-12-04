package Proyect.Authentication;

import Proyect.Repositories.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private AdministratorRepository administratorRepository;

    // Cambiamos el tipo de retorno de String a Administrator
    public Administrator authenticate(String name, String password) {
        Administrator admin = administratorRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Si usas BCrypt, cámbialo aquí. Por ahora texto plano como lo tenías.
        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        return admin; // Devolvemos el objeto completo
    }

    public Administrator validateToken(String token) {
        if (!JwtUtil.validateToken(token)) {
            throw new RuntimeException("Token inválido");
        }
        String name = JwtUtil.getSubjectFromToken(token);
        return administratorRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
    }

    // Este método ya no es tan necesario si la lógica la mueve el controlador, 
    // pero lo dejamos por si acaso.
    public String renewToken(String token) {
        Administrator admin = validateToken(token);
        return JwtUtil.generateToken(admin.getName());
    }

    public Administrator registerAdministrator(Administrator newAdmin) {
        if (administratorRepository.existsByName(newAdmin.getName())) {
            throw new RuntimeException("El administrador ya existe");
        }
        // newAdmin.setPassword(passwordEncoder.encode(newAdmin.getPassword())); // Si usaras encoder
        return administratorRepository.save(newAdmin);
    }

    public Iterable<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }

    public void deleteAdministrator(Long id) {
        if (!administratorRepository.existsById(id)) {
            throw new RuntimeException("Administrador no encontrado");
        }
        administratorRepository.deleteById(id);
    }
}