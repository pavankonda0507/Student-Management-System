package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.StudentDto;
import com.app.model.Student;
import com.app.service.StudentService;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@GetMapping("/getStudents") 
	public List<Student> getStudent() {
		return studentService.getStudent();
	}
	
	@GetMapping("/getStudentById/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
		return studentService.getStudentById(id);
	}
	
	@PostMapping("/addStudent") 
	public Student addStudent(@RequestBody Student student) {
		return studentService.addStudent(student);
	}
	
	@PutMapping("/updateStudent/{id}") 
	public Student updateStudent(@RequestBody Student updatedStudent,@PathVariable int id) {
		return studentService.updateStudent(updatedStudent,id);
	}
	
	@PatchMapping("/partialUpdate/{id}")
	public Student partialStudentUpdate(@RequestBody Student updatedStudent,@PathVariable int id) {
		return studentService.partialStudentUpdate(updatedStudent,id);
	}
	
	@DeleteMapping("/deleteStudent/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable int id) {
		return studentService.deleteStudent(id);
	}
	
	//Total no.of students
	@GetMapping("/studentCount")
	public ResponseEntity<Integer> totalStudentsCount() {
		return studentService.totalStudentsCount();
	}
	
	//Total no.of Active Students
	@GetMapping("/activeStudentsCount")
	public ResponseEntity<Integer> activeStudentsCount() {
		return studentService.activeStudentsCount();
	}
	
	//Total no.of InActive Students
	@GetMapping("/inActiveStudentsCount")
	public ResponseEntity<Integer> inActiveStudentsCount() {
		return studentService.inActiveStudentsCount();
	}
	
	//Active students
	@GetMapping("/activeStudents")
	public ResponseEntity<List<Student>> activeStudents() {
		return studentService.activeStudents();
	}
	
	//InActive students
	@GetMapping("/inActiveStudents")
	public ResponseEntity<List<Student>> inActiveStudents() {
		return studentService.inActiveStudents();
	}
	
	//Search by Name, Rollno, email, branch code
	@GetMapping("/search/{search}")
	public ResponseEntity<List<Student>> search(@PathVariable String search) {
		return studentService.search(search);
	}
	
	//finding students whose creationDate is between a start and end date
	@GetMapping("/findByCreationDateBetween/{startDate}/{endDate}")
	public ResponseEntity<List<Student>> findStudentsByCreationDateBetween(@PathVariable LocalDate startDate,@PathVariable LocalDate endDate) {
		return studentService.findStudentsByCreationDateBetween(startDate,endDate);
	}
	
	//Students list by branch id
	@GetMapping("/getByBranch/{branchId}")
	public ResponseEntity<List<Student>> getStudentByBranch(@PathVariable int branchId) {
		return studentService.getStudentByBranch(branchId);
	}
	
//	@GetMapping("/getNameandMobile")
//	public List<StudentDto> getNameandMobile() {
//		return studentService.getNameandMobile();
//	}
	
	//Student with max id for recent student added
	@GetMapping("/maxId")
	public ResponseEntity<Integer> maxId() {
		return studentService.maxId();
	}
	
	//Student with second max id for recent student added
	@GetMapping("/secondMaxId")
	public ResponseEntity<Integer> secondMaxId() {
		return studentService.secondMaxId();
	}
	
	//Student with Max percentage
	@GetMapping("/maxPercentage")
	public ResponseEntity<Student> maxPercentage() {
		return studentService.maxPercentage();
	}
	
	//Student with second Max percentage
	@GetMapping("/secondMaxPercentage")
	public ResponseEntity<Student> secondMaxPercentage() {
		return studentService.secondMaxPercentage();
	}
	
	//Student with third Max percentage
	@GetMapping("/thirdMaxPercentage")
	public ResponseEntity<Student> thirdMaxPercentage() {
		return studentService.thirdMaxPercentage();
	}
	
	//find student by email
	@GetMapping("/getStudentByEmail/{email}")
	public ResponseEntity<Student>getStudentByEmail(@PathVariable String email) {
		return studentService.getStudentByEmail(email);
	}

}
