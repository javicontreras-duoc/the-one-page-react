package com.theonepage.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootRedirectController {

    @GetMapping("/")
    public String redirigirASwagger() {
        return "redirect:/swagger-ui/index.html";
    }
}