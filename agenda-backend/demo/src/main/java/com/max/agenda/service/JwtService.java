package com.max.agenda.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secret.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    public boolean isValid(String token, UserDetails userDetails) {
        try {
            String email = extractEmail(token);
            System.out.println("Token email: " + email + " | UserDetails email: " + userDetails.getUsername());
            System.out.println("Token expirado: " + isTokenExpired(token));
            return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (JwtException e) {
            System.out.println("Error validando token: " + e.getMessage());
            return false;
        }
    }


    public boolean isValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secret.getBytes())
                    .build()
                    .parseClaimsJws(token);
            boolean expired = isTokenExpired(token);
            System.out.println("Token válido (firma): true, expirado: " + expired);
            return !expired;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expirado: " + e.getMessage());
            return false;
        } catch (JwtException e) {
            System.out.println("Token inválido: " + e.getMessage());
            return false;
        }
    }
}