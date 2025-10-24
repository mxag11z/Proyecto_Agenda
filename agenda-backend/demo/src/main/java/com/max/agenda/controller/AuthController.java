package com.max.agenda.controller;

import com.max.agenda.dto.*;
import com.max.agenda.model.User;
import com.max.agenda.service.JwtService;
import com.max.agenda.service.UserService;
import com.max.agenda.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final JwtService jwt;
    private final EmailService emailService;

    public AuthController(UserService userService, JwtService jwt, EmailService emailService) {
        this.userService = userService;
        this.jwt = jwt;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        if (userService.existsByEmail(req.getEmail())) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", "El correo electrónico ya está registrado"));
        }

        User u = userService.register(req);
        emailService.sendWelcomeEmail(u.getEmail(), u.getNombre());
        return ResponseEntity.ok(u);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
        return userService.authenticate(req.getEmail(), req.getPassword())
                .map(u -> ResponseEntity.ok(
                        new LoginResponse(
                                jwt.generateToken(u.getEmail()),
                                "Bearer",
                                u.getId(),
                                u.getNombre(),
                                u.getEmail()
                        )
                ))
                .orElse(ResponseEntity.status(401)
                        .body(new LoginResponse("Credenciales inválidas", "")));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Logout OK");
    }
}