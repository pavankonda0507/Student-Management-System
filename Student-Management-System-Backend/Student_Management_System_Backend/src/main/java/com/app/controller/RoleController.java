package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Role;
import com.app.service.RoleService;

@RestController
@RequestMapping("/api/role")
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {
	@Autowired
	private RoleService roleService;
	
	@PostMapping("/add")
	public Role addRole(@RequestBody Role role) {
		return roleService.addRole(role);
	}
	
	@GetMapping("/getRoles")
	public List<Role> gerRoles() {
		return roleService.getRoles();
	}
	
}
