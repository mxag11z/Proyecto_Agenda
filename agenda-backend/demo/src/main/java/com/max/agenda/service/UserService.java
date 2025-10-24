package com.max.agenda.service;

import com.max.agenda.dto.RegisterRequest;
import com.max.agenda.model.User;
import com.max.agenda.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository users;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository users, BCryptPasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    public boolean existsByEmail(String email) {
        return users.findByEmail(email).isPresent();
    }

    public User register(RegisterRequest req) {
        User u = new User();
        u.setNombre(req.getNombre());
        u.setApellido(req.getApellido());
        u.setEmail(req.getEmail());
        u.setPassword(encoder.encode(req.getPassword()));
        return users.save(u);
    }

    public Optional<User> authenticate(String email, String rawPassword) {
        return users.findByEmail(email)
                .filter(u -> encoder.matches(rawPassword, u.getPassword()));
    }
}
