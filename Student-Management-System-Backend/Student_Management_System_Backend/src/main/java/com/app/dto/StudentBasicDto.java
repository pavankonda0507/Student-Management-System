package com.app.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor   // constructor for JPQL "new" projection
public class StudentBasicDto {
    private String fullName;
    private String email;
    private String mobile;
}
