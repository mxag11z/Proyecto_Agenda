package com.max.agenda.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendWelcomeEmail(String toEmail, String userName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("araujo.galan.maximiliano@gmail.com");
            message.setTo(toEmail);
            message.setSubject("¡Bienvenido!");
            message.setText("Hola " + userName + ", gracias por registrarte a la agenda de Schneider electrics.");
            mailSender.send(message);
            System.out.println("Email enviado a: " + toEmail);
        } catch (Exception e) {
            System.err.println("Error al enviar email: " + e.getMessage());
        }
    }
}