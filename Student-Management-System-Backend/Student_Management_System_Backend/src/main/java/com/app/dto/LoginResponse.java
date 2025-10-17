// LoginResponse.java


package com.app.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

public class LoginResponse {
    private String token;
    private String email;
    private String role;
    private String message;
    private String fullName;

    public LoginResponse(String token, String email, String role, String fullName, String message) {
        this.token = token;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.message = message;
    }

    
}
