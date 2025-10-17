package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.model.Branch;


public interface BranchRepository extends JpaRepository<Branch, Integer> {
	
	List<Branch> findByCode(String code);
	
	@Query("SELECT s.fullName, s.mobile, s.branch.id, s.email, b.code, b.name " +
	           "FROM Student s INNER JOIN Branch b on s.branch.id = b.id")
	List<Object[]> getStudentBranchInfo();
	
	@Query("select count(b) from Branch b")
	Integer branchCount();
	
	@Query("select count(b) from Branch b where b.status='ACTIVE'")
	Integer activeBranchesCount();
	
	@Query("select count(b) from Branch b where b.status='INACTIVE'")
	Integer inActiveBranchesCount();

	@Query("select b from Branch b where b.name like %:search% or b.code like %:search% or CAST(b.id AS string) like %:search%")
	List<Branch> search(String search);

	@Query("select b from Branch b where b.status='ACTIVE'")
	List<Branch> activeBranches();
	
	@Query("select b from Branch b where b.status='INACTIVE'")
	List<Branch> inActiveBranches();

}
