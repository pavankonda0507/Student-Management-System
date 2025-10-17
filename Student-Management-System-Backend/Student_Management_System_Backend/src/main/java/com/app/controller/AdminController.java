package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Admin;
import com.app.model.Student;
import com.app.service.AdminService;
import com.app.service.StudentService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private StudentService studentService;
	
	
	//Getting all admins
	@GetMapping("/getallAdmins")
	public List<Admin> getAdmins() {
		return adminService.getAdmins();
	}
	
	
	//Adding new admins
	@PostMapping("/add")
	public Admin addAdmin(@RequestBody Admin admin) {
		return adminService.addAdmin(admin);
	}
	
	//Updating admin
	@PutMapping("/updateAdmin/{id}")
	public ResponseEntity<String> updateAdmin(@RequestBody Admin updatedAdmin,@PathVariable int id) {
		return adminService.updateAdmin(updatedAdmin,id);
	}
	
	@DeleteMapping("/deleteAdmin/{id}")
	public ResponseEntity<String> deleteAdmin(@PathVariable int id) {
		return adminService.deleteAdmin(id);
	}
	
	//Updating the Student in Admin 
	@PutMapping("/updateStudent/{id}") 
	public Student updateStudent(@RequestBody Student updatedStudent,@PathVariable int id) {
		return studentService.updateStudent(updatedStudent,id);
	}
	
//	Total no.of admins
	@GetMapping("/adminCount")
	public ResponseEntity<Integer> totalAdminsCount() {
		return adminService.totalAdminsCount();
	}
	
	//Total no.of active admins
	@GetMapping("/activeAdminsCount")
	public ResponseEntity<Integer> activeAdminsCount() {
		return adminService.activeAdminsCount();
	}
	
	//Total no.of inactive admins
	@GetMapping("/inActiveAdminsCount")
	public ResponseEntity<Integer> inActiveAdminsCount() {
		return adminService.inActiveAdminsCount();
	}
	
	//Active Admins
	@GetMapping("/activeAdmins")
	public ResponseEntity<List<Admin>> activeAdmins() {
		return adminService.activeAdmins();
	}
	
	//InActive Admins
	@GetMapping("/inActiveAdmins")
	public ResponseEntity<List<Admin>> inActiveAdmins() {
		return adminService.inActiveAdmins();
	}
	
	
	//Search by name, email, mobile
	@GetMapping("/search/{search}")
	public ResponseEntity<List<Admin>> search(@PathVariable String search) {
		return adminService.search(search);
	}
	
	
	@GetMapping("/getAdminByEmail/{email}")
	public ResponseEntity<Admin> getAdminByEmail(@PathVariable String email) {
		return adminService.getAdminByEmail(email);
	}
	

	

}
