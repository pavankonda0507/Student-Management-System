package com.app.repository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.app.dto.StudentDto;
import com.app.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	Optional<Student> findByEmail(String email);
	
	@Query("select count(s) from Student s")
	Integer totalStudentsCount();
	
	@Query("select count(s) from Student s where s.status='ACTIVE'")
	Integer activeStudentsCount();
	
	@Query("select count(s) from Student s where s.status='INACTIVE'")
	Integer inActiveStudentsCount();
	
	@Query("select s from Student s where s.status='ACTIVE'")
	List<Student> activeStudents();

	@Query("select s from Student s where s.status='INACTIVE'")
	List<Student> inActiveStudents();

	@Query("select s from Student s where s.fullName like %:search% "
			+ "or s.email like %:search% "
			+ "or s.rollNo like %:search% "
			+ "or s.branch.code like %:search%")
	List<Student> search(String search);
	
	
	@Query("SELECT s FROM Student s WHERE s.createdDate BETWEEN :startDate AND :endDate")
	List<Student> findStudentsByCreationDateBetween(LocalDate startDate, LocalDate endDate);
	
	@Query("select s from Student s where s.branch.id=:branchId")
	List<Student> getStudentByBranch(int branchId);
	
	
//	@Query("select new com.app.dto.StudentDto(s.fullName, s.mobile) from Student s")
//	List<Student> getNameandMobile();
	
	ResponseEntity<Student> getStudentById(Integer id);

	
	@Query("select max(s.id) from Student s")
	Integer maxId();
	
	
	@Query(value = "SELECT MAX(id) FROM student WHERE id < (SELECT MAX(id) FROM student)", nativeQuery = true)
	Integer secondMaxId();

	@Query(value = "select * from student where percentage=(select max(percentage) from student)", nativeQuery = true)
	Student maxPercentage();
	
	@Query(value = "select * from student where percentage = (select max(percentage) from student where percentage < (select max(percentage) from student))", nativeQuery = true)
	Student secondMaxPercentage();

	@Query(value = "select * from student where percentage = (select max(percentage) from student where percentage < (select max(percentage) from student where percentage < (select max(percentage) from student)))", nativeQuery = true)

	Student thirdMaxPercentage();
	
	
}
