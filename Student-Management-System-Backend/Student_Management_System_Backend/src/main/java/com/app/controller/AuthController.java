// AuthController.java
package com.app.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoginRequest;
import com.app.dto.LoginResponse;
import com.app.model.Admin;
import com.app.model.Student;
import com.app.repository.AdminRepository;
import com.app.repository.StudentRepository;
import com.app.security.JwtService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // React app
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // authenticate
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // generate token
        String token = jwtService.generateToken(authentication);

        // extract role
        String role = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("USER");
        
        String fullName = "";
        if (role.equals("ROLE_ADMIN")) {
            Optional<Admin> admin = adminRepository.findByEmail(request.getEmail());
            if (admin.isPresent()) {
                fullName = admin.get().getFullName(); // make sure Admin entity has fullName field
            }
        } else if(role.equals("ROLE_STUDENT")) {
            Optional<Student> student = studentRepository.findByEmail(request.getEmail());
            if (student.isPresent()) {
                fullName = student.get().getFullName(); // same for Student entity
            }
        }

        return ResponseEntity.ok(
            new LoginResponse(token, request.getEmail(), role, fullName, "Login successful")
        );
        
        
        
    }
}
