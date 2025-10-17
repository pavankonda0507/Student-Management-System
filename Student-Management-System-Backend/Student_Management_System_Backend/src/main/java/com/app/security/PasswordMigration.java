//package com.app.security;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.app.repository.AdminRepository;
//import com.app.repository.StudentRepository;
//
//@Configuration
//public class PasswordMigration {
//
//    private final AdminRepository adminRepo;
//    private final StudentRepository studentRepo;
//    private final PasswordEncoder passwordEncoder;
//
//    public PasswordMigration(AdminRepository adminRepo, StudentRepository studentRepo,
//                             PasswordEncoder passwordEncoder) {
//        this.adminRepo = adminRepo;
//        this.studentRepo = studentRepo;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @Bean
//    public CommandLineRunner encodeExistingPasswords() {
//        return args -> {
//            // ✅ Encode all Admins
//            adminRepo.findAll().forEach(admin -> {
//                String pwd = admin.getPassword();
//                if (!pwd.startsWith("$2a$")) { // check if not already BCrypt
//                    admin.setPassword(passwordEncoder.encode(pwd));
//                    adminRepo.save(admin);
//                }
//            });
//
//            // ✅ Encode all Students
//            studentRepo.findAll().forEach(student -> {
//                String pwd = student.getPassword();
//                if (!pwd.startsWith("$2a$")) {
//                    student.setPassword(passwordEncoder.encode(pwd));
//                    studentRepo.save(student);
//                }
//            });
//
//            System.out.println("✅ Password migration completed.");
//        };
//    }
//}
