package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.Exception.ResourceNotFoundException;
import com.app.model.Motivation;
import com.app.repository.MotivationRepository;

@Service
public class MotivationService {
	@Autowired
	private MotivationRepository motivationRepository;

	public ResponseEntity<List<Motivation>> getAllMotivations() {
		List<Motivation> motivation = motivationRepository.findAll();
		return new ResponseEntity<List<Motivation>>(motivation,HttpStatus.OK);
	}

	public ResponseEntity<String> addMotivation(Motivation motivation) {
		// TODO Auto-generated method stub
		motivationRepository.save(motivation);
		
		return new ResponseEntity<String>("Motivation Inserted Successfully",HttpStatus.OK);
	}

	public ResponseEntity<Motivation> getMotivationById(Integer id) {
		// TODO Auto-generated method stub
		Motivation motivation = motivationRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Please provide valid id"));
		return new ResponseEntity<Motivation>(motivation,HttpStatus.OK);
	}

}
