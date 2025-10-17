package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Branch;
import com.app.model.Student;
import com.app.service.BranchService;
import com.app.service.StudentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/branch")
@CrossOrigin
public class BranchController {
	@Autowired
	private BranchService branchService;
	
	
	
	@GetMapping("/session")
    public String getSessionId(HttpSession session) {
        return "Session ID: " + session.getId();
    }
	
	@GetMapping("/csrf-token")
	public CsrfToken getCsrfToken(HttpServletRequest request) {
		return (CsrfToken) request.getAttribute("_csrf");
	}
	
	//Get all branches
	@GetMapping("/getBranch")
	public List<Branch> getBranch() {
		return branchService.getBranch();
	}
	
	@GetMapping("/getByCode/{code}")
	public List<Branch> getBranchByCode(@PathVariable String code) {
		return branchService.getBranchByCode(code);
	}
	
	
	//Adding new Branch
	@PostMapping("/addBranch")
	public Branch addBranch(@RequestBody Branch branch) {
		return branchService.addBranch(branch);
	}
	
	
	//Update branch by id
	@PutMapping("/updateBranch/{id}")
	public ResponseEntity<Branch> updateBranchById(@RequestBody Branch branch, @PathVariable Integer id) {
		return branchService.updateBranchById(branch,id);
	}
	
	
	//Delete by branch by id
	@DeleteMapping("/deleteBranch/{id}")
	public ResponseEntity<Branch> deleteBranchById(@PathVariable Integer id) {
		return branchService.deleteBranchById(id);
	}
	
	@GetMapping("/getStudentBranch")
	public List<Object[]> getStudentBranchInfo() {
		return branchService.getStudentBranchInfo();
	}
	
	//Total no.of branches
	@GetMapping("/branchCount")
	public ResponseEntity<Integer> branchCount() {
		return branchService.branchCount();
	}
	
	//Total no.of Active Branches
	@GetMapping("/activeBranchesCount")
	public ResponseEntity<Integer> activeBranchesCount() {
		return branchService.activeBranchesCount();
	}
	
	//Total no.of InActive Branches
	@GetMapping("/inActiveBranchesCount")
	public ResponseEntity<Integer> inActiveBranchesCount() {
		return branchService.inActiveBranchesCount();
	}
	
	//Search branch by name, code and id
	@GetMapping("/search/{search}")
	public ResponseEntity<List<Branch>> search(@PathVariable String search) {
		return branchService.search(search);
	}
	
	//Active Branches
	@GetMapping("/activeBranches")
	public ResponseEntity<List<Branch>> activeBranches() {
		return branchService.activeBranches();
	}
	
	//Inactive branches
	@GetMapping("/inActiveBranches")
	public ResponseEntity<List<Branch>> inActiveBranches() {
		return branchService.inActiveBranches();
	}
	
	
	
	
}
