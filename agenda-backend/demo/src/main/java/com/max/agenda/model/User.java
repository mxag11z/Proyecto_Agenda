package com.max.agenda.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "USERS") // evita palabra reservada USER en Oracle
@NoArgsConstructor @AllArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // guardada con BCrypt
}
