package com.app.model;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "student")
@Getter
@Setter
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="full_name", nullable = false)
	private String fullName;
	
	@Column(name="gender", nullable = false)
	private String gender;
	
	@Column(name="father_name")
	private String fatherName;
	
	@Column(name="mother_name")
	private String motherName;
	
	@ManyToOne
	@JoinColumn(name = "branch_id", referencedColumnName = "id")
	private Branch branch;
	
	@Column(name="roll_no", nullable = false)
	private String rollNo;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "mobile", nullable = false)
	private String mobile;
	
	@Column(name = "date_of_birth", nullable = false)
	private LocalDate dateOfBirth;
	
	@Column(name = "current_semester", nullable = false)
	private Integer currentSemester;
	
	@Column(name = "percentage", nullable = false)
	private Double percentage;
	
	@ManyToOne
	@JoinColumn(name = "role_id", referencedColumnName = "id")
	private Role role;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id", referencedColumnName = "id")
	private Address address;
	
	@CreationTimestamp
	@Column(name = "created_date")
	private LocalDate createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private LocalDate updatedDate;
	
	@Column(name = "status", nullable = false)
	private String status;
	
	@PrePersist
	public void encodePassword() {
	    this.password = new BCryptPasswordEncoder().encode(this.password);
	}

	
	
}
