package com.app.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.app.dto.StudentDto;
import com.app.model.Branch;
import com.app.model.Role;
import com.app.model.Student;

@Component
public class StudentMapper {
	public StudentDto toDto(Student student) {
		StudentDto dto = new StudentDto();
		dto.setId(student.getId());
		dto.setFullName(student.getFullName());
		dto.setBranchId(student.getBranch().getId());
		dto.setRollNo(student.getRollNo());
		dto.setEmail(student.getEmail());
		dto.setMobile(student.getMobile());
		dto.setDateOfBirth(student.getDateOfBirth());
		dto.setCurrentSemester(student.getCurrentSemester());
		dto.setRoleId(student.getRole().getId());
		dto.setCreatedDate(student.getCreatedDate());
		dto.setUpdatedDate(student.getUpdatedDate());
		dto.setStatus(student.getStatus());
		return dto;
	}
	
	public Student toEntity(StudentDto dto, Branch branch, Role role) {
		Student student = new Student();
		student.setId(dto.getId());
		student.setFullName(dto.getFullName());
		student.setBranch(branch);
		student.setRollNo(dto.getRollNo());
		student.setEmail(dto.getEmail());
		student.setMobile(dto.getMobile());
		student.setDateOfBirth(dto.getDateOfBirth());
		student.setCurrentSemester(dto.getCurrentSemester());
		student.setRole(role);
//		student.setCreatedDate(dto.getCreatedDate());
//		student.setUpdatedDate(dto.getUpdatedDate());
		student.setStatus(dto.getStatus());
		return student;
	}
	
	public List<StudentDto> toDtoList(List<Student> students) {
        return students.stream().map(this::toDto).toList();
    }

}
