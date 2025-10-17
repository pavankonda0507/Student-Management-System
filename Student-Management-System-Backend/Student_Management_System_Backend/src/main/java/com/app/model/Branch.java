package com.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="branch")
@Getter
@Setter
public class Branch {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "name", nullable = false, unique = true)
	private String name;
	
	@Column(name = "code", nullable = false)
	private String code;
	
	@Column(name = "total_semesters", nullable = false)
	private Integer totalSemesters;
	
	@Column(name = "hod_name", nullable = false)
	private String hodName;
	
	@Column(name = "contact_email", nullable = false)
	private String contactEmail;
	
	@Column(name = "location", nullable = false)
	private String location;
	
	@Column(name = "status", nullable = false)
	private String status;

}
