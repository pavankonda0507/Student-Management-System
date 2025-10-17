package com.app.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.Exception.ResourceNotFoundException;
import com.app.dto.StudentDto;
import com.app.mapper.StudentMapper;
import com.app.model.Student;
import com.app.repository.StudentRepository;

@Service
public class StudentService {
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private StudentMapper studentMapper;
	

	public List<Student> getStudent() {
		// TODO Auto-generated method stub
		return studentRepository.findAll();
	}

	public Student addStudent(Student student) {
		// TODO Auto-generated method stub
		return studentRepository.save(student);
	}

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
		existingStudent.setFatherName(updatedStudent.getFatherName());
		existingStudent.setMotherName(updatedStudent.getMotherName());
		existingStudent.setAddress(updatedStudent.getAddress());
		existingStudent.setPercentage(updatedStudent.getPercentage());
		Student student = studentRepository.save(existingStudent);
		
		return student;
	}
	
	public ResponseEntity<String> deleteStudent(int id) {
		Student existingStudent = studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Please provide the valid id"));
		studentRepository.deleteById(id);
		return new ResponseEntity<String>("Information with id "+id+" is deleted",HttpStatus.OK);
	}

	public Student partialStudentUpdate(Student updatedStudent, int id) {
		// TODO Auto-generated method stub
		Student existingStudent = studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Please provide the valid id"));
		existingStudent.setDateOfBirth(updatedStudent.getDateOfBirth());
		existingStudent.setEmail(updatedStudent.getEmail());
		existingStudent.setFullName(updatedStudent.getFullName());
		existingStudent.setMobile(updatedStudent.getMobile());
		existingStudent.setPassword(updatedStudent.getPassword());
		existingStudent.setCurrentSemester(updatedStudent.getCurrentSemester());
		Student student = studentRepository.save(existingStudent);
		return student;
	}

	public ResponseEntity<Integer> totalStudentsCount() {
		// TODO Auto-generated method stub
		Integer count = studentRepository.totalStudentsCount();
		return ResponseEntity.ok(count);
	}

	public ResponseEntity<Integer> activeStudentsCount() {
		// TODO Auto-generated method stub
		Integer count = studentRepository.activeStudentsCount();
		return new ResponseEntity<Integer>(count,HttpStatus.OK);
	}

	public ResponseEntity<Integer> inActiveStudentsCount() {
		// TODO Auto-generated method stub
		Integer count = studentRepository.inActiveStudentsCount();
		return new ResponseEntity<Integer>(count,HttpStatus.OK);
	}

	public ResponseEntity<List<Student>> activeStudents() {
		// TODO Auto-generated method stub
		List<Student> student = studentRepository.activeStudents();
		
		return new ResponseEntity<List<Student>>(student,HttpStatus.OK);
	}

	public ResponseEntity<List<Student>> inActiveStudents() {
		// TODO Auto-generated method stub
		List<Student> student = studentRepository.inActiveStudents();
		
		return new ResponseEntity<List<Student>>(student,HttpStatus.OK);
	}

	public ResponseEntity<List<Student>> search(String search) {
		// TODO Auto-generated method stub
		List<Student> student = studentRepository.search(search);
		return new ResponseEntity<List<Student>>(student,HttpStatus.OK);
	}

	public ResponseEntity<List<Student>> findStudentsByCreationDateBetween(LocalDate startDate, LocalDate endDate) {
		// TODO Auto-generated method stub
		List<Student> student = studentRepository.findStudentsByCreationDateBetween(startDate, endDate);
		return new ResponseEntity<List<Student>>(student,HttpStatus.OK);
	}

	public ResponseEntity<List<Student>> getStudentByBranch(int branchId) {
		// TODO Auto-generated method stub
		List<Student> student  = studentRepository.getStudentByBranch(branchId);
		return new ResponseEntity<List<Student>>(student,HttpStatus.OK);
	}

	public ResponseEntity<Student> getStudentById(Integer id) {
		// TODO Auto-generated method stub
		Student student = studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Please provide the valid id"));
		
		return new ResponseEntity<Student>(student,HttpStatus.OK);
	}

	public ResponseEntity<Integer> maxId() {
		// TODO Auto-generated method stub
		Integer result = studentRepository.maxId();
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

	public ResponseEntity<Integer> secondMaxId() {
		// TODO Auto-generated method stub
		Integer result = studentRepository.secondMaxId();
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

	public ResponseEntity<Student> maxPercentage() {
		// TODO Auto-generated method stub
		Student student = studentRepository.maxPercentage();
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}

	public ResponseEntity<Student> secondMaxPercentage() {
		// TODO Auto-generated method stub
		Student student = studentRepository.secondMaxPercentage();
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}

	public ResponseEntity<Student> thirdMaxPercentage() {
		// TODO Auto-generated method stub
		Student student = studentRepository.thirdMaxPercentage();
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}

	public ResponseEntity<Student> getStudentByEmail(String email) {
		// TODO Auto-generated method stub
		Student student = studentRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("Invalid email id"));
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}

//	public List<StudentDto> getNameandMobile() {
//		// TODO Auto-generated method stub
//		List<Student> student = studentRepository.getNameandMobile();
//		
//		return studentMapper.toDtoList(student);
//	}

	
	

}
