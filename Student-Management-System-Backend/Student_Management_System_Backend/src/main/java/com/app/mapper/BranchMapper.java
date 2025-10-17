package com.app.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.app.dto.BranchDto;
import com.app.model.Branch;

@Component
public class BranchMapper {
	public BranchDto toDto(Branch branch) {
        if (branch == null) return null;

        BranchDto dto = new BranchDto();
        dto.setId(branch.getId());
        dto.setName(branch.getName());
        dto.setCode(branch.getCode());
        dto.setTotalSemesters(branch.getTotalSemesters());
        dto.setHodName(branch.getHodName());
        dto.setContactEmail(branch.getContactEmail());
        dto.setLocation(branch.getLocation());
        dto.setStatus(branch.getStatus());
        return dto;
    }

    // DTO → Entity
    public Branch toEntity(BranchDto dto) {
        if (dto == null) return null;

        Branch branch = new Branch();
        branch.setId(dto.getId());
        branch.setName(dto.getName());
        branch.setCode(dto.getCode());
        branch.setTotalSemesters(dto.getTotalSemesters());
        branch.setHodName(dto.getHodName());
        branch.setContactEmail(dto.getContactEmail());
        branch.setLocation(dto.getLocation());
        branch.setStatus(dto.getStatus());
        return branch;
    }

    // Convert list of entities → list of DTOs
    public List<BranchDto> toDtoList(List<Branch> branches) {
        return branches.stream().map(this::toDto).collect(Collectors.toList());
    }

    // Convert list of DTOs → list of entities
    public List<Branch> toEntityList(List<BranchDto> dtos) {
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

}
