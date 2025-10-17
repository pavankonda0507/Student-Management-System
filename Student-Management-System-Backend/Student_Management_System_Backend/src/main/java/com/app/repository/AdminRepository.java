package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

//	List<Admin> findAll();
	Optional<Admin> findByEmail(String email);

	@Query("select count(a) from Admin a")
	Integer totalAdminsCount();

	@Query("select count(a) from Admin a where a.status='ACTIVE'")
	Integer activeAdminsCount();

	@Query("select count(a) from Admin a where a.status='INACTIVE'")
	Integer inActiveAdminsCount();

	@Query("select a from Admin a where a.status='ACTIVE'")
	List<Admin> activeAdmins();

	@Query("select a from Admin a where a.status='INACTIVE'")
	List<Admin> inActiveAdmins();

	@Query("select a from Admin a where "
			+ "a.fullName like %:search% or "
			+ "a.email like %:search% or "
			+ "a.mobile like %:search%")
	List<Admin> search(String search);

}
