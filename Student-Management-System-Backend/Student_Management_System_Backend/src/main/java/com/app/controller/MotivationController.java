package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Motivation;
import com.app.service.MotivationService;

@RestController
@RequestMapping("/api/motivation")
@CrossOrigin(origins = "http://localhost:5173")
public class MotivationController {
	
	@Autowired
	private MotivationService motivationService;
	
	@GetMapping("/getAllMotivations")
	private ResponseEntity<List<Motivation>> getAllMotivations() {
		return motivationService.getAllMotivations();
	}
	
	@GetMapping("/getMotivationById/{id}")
	private ResponseEntity<Motivation> getMotivationById(@PathVariable Integer id) {
		return motivationService.getMotivationById(id);
	}
	
	@PostMapping("/addMotivation")
	private ResponseEntity<String> addMotivation(@RequestBody Motivation motivation) {
		return motivationService.addMotivation(motivation);
	}

}
