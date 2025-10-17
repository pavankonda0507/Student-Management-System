package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Motivation;

@Repository
public interface MotivationRepository extends JpaRepository<Motivation, Integer> {
	
}
