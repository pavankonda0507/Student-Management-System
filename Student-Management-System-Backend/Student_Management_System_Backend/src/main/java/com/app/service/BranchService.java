package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.Exception.ResourceNotFoundException;
import com.app.model.Branch;
import com.app.model.Student;
import com.app.repository.BranchRepository;
import com.app.repository.StudentRepository;

@Service
public class BranchService {
	@Autowired
	private BranchRepository branchRepository;
	
	@Autowired
	private StudentRepository studentRepository;

	public List<Branch> getBranch() {
		// TODO Auto-generated method stub
		return branchRepository.findAll();
	}
	
	public List<Branch> getBranchByCode(String code) {
		// TODO Auto-generated method stub
		return branchRepository.findByCode(code);
	};

	public Branch addBranch(Branch branch) {
		// TODO Auto-generated method stub
		return branchRepository.save(branch);
	}

	public ResponseEntity<Branch> updateBranchById(Branch branch, Integer id) {
		// TODO Auto-generated method stub
		Branch existingBranch = branchRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("The Branch with id "+id+" not found"));
		existingBranch.setName(branch.getName());
		existingBranch.setCode(branch.getCode());
		existingBranch.setContactEmail(branch.getContactEmail());
		existingBranch.setHodName(branch.getHodName());
		existingBranch.setLocation(branch.getLocation());
		existingBranch.setTotalSemesters(branch.getTotalSemesters());
		existingBranch.setStatus(branch.getStatus());
		Branch updatedBranch = branchRepository.save(existingBranch);
//		return ResponseEntity.ok(updatedBranch);
		
		return new ResponseEntity<Branch>(updatedBranch,HttpStatus.ACCEPTED);
	}
	
	public ResponseEntity<Branch> deleteBranchById(Integer id) {
		Branch existingBranch = branchRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("The Branch with id "+id+" not found"));
		branchRepository.deleteById(id);
		return new ResponseEntity<Branch>(existingBranch,HttpStatus.OK);
		
	}

	public List<Object[]> getStudentBranchInfo() {
		// TODO Auto-generated method stub
		return branchRepository.getStudentBranchInfo();
	}
	
	
	//Updating the Student in Branch
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

	public ResponseEntity<Integer> branchCount() {
		// TODO Auto-generated method stub
		Integer count = branchRepository.branchCount();
		return new ResponseEntity<Integer>(count,HttpStatus.OK);
	}

	public ResponseEntity<Integer> activeBranchesCount() {
		Integer count = branchRepository.activeBranchesCount();
		return new ResponseEntity<Integer>(count,HttpStatus.OK);
	}

	public ResponseEntity<Integer> inActiveBranchesCount() {
		// TODO Auto-generated method stub
		Integer count = branchRepository.inActiveBranchesCount();
		return new ResponseEntity<Integer>(count,HttpStatus.OK);
	}

	public ResponseEntity<List<Branch>> search(String search) {
		// TODO Auto-generated method stub
		List<Branch> branch = branchRepository.search(search);
		return new ResponseEntity<List<Branch>>(branch,HttpStatus.OK);
	}

	public ResponseEntity<List<Branch>> activeBranches() {
		// TODO Auto-generated method stub
		List<Branch> branch = branchRepository.activeBranches();
		return new ResponseEntity<List<Branch>>(branch, HttpStatus.OK);
	}

	public ResponseEntity<List<Branch>> inActiveBranches() {
		// TODO Auto-generated method stub
		List<Branch> branch = branchRepository.inActiveBranches();
		return new ResponseEntity<List<Branch>>(branch, HttpStatus.OK);
	}

	

}
