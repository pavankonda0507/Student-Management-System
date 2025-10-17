package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{


}
