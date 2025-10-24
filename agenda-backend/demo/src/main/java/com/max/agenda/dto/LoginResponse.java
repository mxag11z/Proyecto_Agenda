package com.max.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private String type;
    private Long id;
    private String nombre;
    private String email;

    public LoginResponse(String token, String type) {
        this.token = token;
        this.type = type;
    }
}
