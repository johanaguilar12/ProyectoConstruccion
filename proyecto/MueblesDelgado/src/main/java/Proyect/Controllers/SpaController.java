package Proyect.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }

    // Soporte para rutas anidadas (ej: /admin/panel)
    @RequestMapping(value = "/**/{path:[^\\.]*}")
    public String redirectNested() {
        return "forward:/index.html";
    }
}