package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.Exception.ResourceNotFoundException;
import com.app.model.Admin;
import com.app.model.Student;
import com.app.repository.AdminRepository;
import com.app.repository.StudentRepository;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	

	public List<Admin> getAdmins() {
		// TODO Auto-generated method stub
		return adminRepository.findAll();
	}

	public Admin addAdmin(Admin admin) {
		// TODO Auto-generated method stub
		return adminRepository.save(admin);
		
	}
	
	

		public ResponseEntity<String> updateAdmin(Admin updatedAdmin, int id) {
			// TODO Auto-generated method stub
			Admin existingAdmin = adminRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Please provide the valid id"));
			existingAdmin.setEmail(updatedAdmin.getEmail());
			existingAdmin.setFullName(updatedAdmin.getFullName());
			existingAdmin.setMobile(updatedAdmin.getMobile());
			existingAdmin.setPassword(updatedAdmin.getPassword());
			existingAdmin.setGender(updatedAdmin.getGender());
			existingAdmin.setRole(updatedAdmin.getRole());
			existingAdmin.setStatus(updatedAdmin.getStatus());
			existingAdmin.setAddress(updatedAdmin.getAddress());
			Admin admin = adminRepository.save(existingAdmin);
			return new ResponseEntity<String>("Information with id "+ id +" updated successfully",HttpStatus.OK);
		}

		public ResponseEntity<String> deleteAdmin(int id) {
			// TODO Auto-generated method stub
			Admin existingAdmin = adminRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Please provide the valid id"));
			adminRepository.deleteById(id);
			return new ResponseEntity<String>("Information with id "+ id +" deleted successfully",HttpStatus.OK);
		}
		
		//Updating the Student in Admin
		public Student updateStudent(Student updatedStudent, int id) {
			// TODO Auto-generated method stub
			Student existingStudent = studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Please provide the valid id"));
			existingStudent.setBranch(updatedStudent.getBranch());
			existingStudent.setCurrentSemester(updatedStudent.getCurrentSemester());
			existingStudent.setDateOfBirth(updatedStudent.getDateOfBirth());
			existingStudent.setEmail(updatedStudent.getEmail());
			existingStudent.setFullName(updatedStudent.getFullName());
			existingStudent.setMobile(updatedStudent.getMobile());
			existingStudent.setPassword(updatedStudent.getPassword());
			existingStudent.setRole(updatedStudent.getRole());
			existingStudent.setRollNo(updatedStudent.getRollNo());
			existingStudent.setStatus(updatedStudent.getStatus());
			Student student = studentRepository.save(existingStudent);
					
			return student;
		}

		public ResponseEntity<Integer> totalAdminsCount() {
			// TODO Auto-generated method stub
			Integer count = adminRepository.totalAdminsCount();
			return ResponseEntity.ok(count);
		}

		public ResponseEntity<Integer> activeAdminsCount() {
			// TODO Auto-generated method stub
			Integer count = adminRepository.activeAdminsCount();
			return new ResponseEntity<Integer>(count,HttpStatus.OK);
		}

		public ResponseEntity<Integer> inActiveAdminsCount() {
			// TODO Auto-generated method stub
			Integer count = adminRepository.inActiveAdminsCount();
			return new ResponseEntity<Integer>(count,HttpStatus.OK);
		}

		public ResponseEntity<List<Admin>> activeAdmins() {
			// TODO Auto-generated method stub
			return new ResponseEntity<List<Admin>>(adminRepository.activeAdmins(), HttpStatus.OK);
		}

		public ResponseEntity<List<Admin>> inActiveAdmins() {
			// TODO Auto-generated method stub
			return new ResponseEntity<List<Admin>>(adminRepository.inActiveAdmins(), HttpStatus.OK);
		}

		public ResponseEntity<List<Admin>> search(String search) {
			// TODO Auto-generated method stub
			List<Admin> admin  = adminRepository.search(search);
			return new ResponseEntity<List<Admin>>(admin,HttpStatus.OK);
		}

		public ResponseEntity<Admin> getAdminByEmail(String email) {
			// TODO Auto-generated method stub
			Admin admin = adminRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("Provide valid Email"));
			return new ResponseEntity<Admin>(admin, HttpStatus.OK);
		}

}
