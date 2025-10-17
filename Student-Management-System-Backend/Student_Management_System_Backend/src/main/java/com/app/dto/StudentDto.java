package com.app.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class StudentDto {
	private Integer id;
	private String fullName;
	private Integer branchId;
	private String rollNo;
	private String email;
	private String password;
	private String mobile;
	private LocalDate dateOfBirth;
	private Integer currentSemester;
	private Integer roleId;
	private LocalDate createdDate;
	private LocalDate updatedDate;
	private String status;
	
	
	

}
