package com.app.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.model.Admin;
import com.app.model.Student;
import com.app.repository.AdminRepository;
import com.app.repository.StudentRepository;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final StudentRepository studentRepository;

    public AppUserDetailsService(AdminRepository adminRepository, StudentRepository studentRepository) {
        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try admin first
        Optional<Admin> adminOpt = adminRepository.findByEmail(email);
        if (adminOpt.isPresent()) {
            Admin a = adminOpt.get();
            return User.builder()
                       .username(a.getEmail())
                       .password(a.getPassword()) // hashed in DB
                       .roles(a.getRole().getRoleName().toUpperCase())
                       .build();
        }
        

        Optional<Student> stOpt = studentRepository.findByEmail(email);
        if (stOpt.isPresent()) {
            Student s = stOpt.get();
            return User.builder()
                       .username(s.getEmail())
                       .password(s.getPassword())
                       .roles(s.getRole().getRoleName().toUpperCase())
                       .build();
        }
        

        throw new UsernameNotFoundException("User not found: " + email);
    }
}
