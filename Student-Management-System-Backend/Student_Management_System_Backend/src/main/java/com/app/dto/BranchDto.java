package com.app.dto;

import lombok.Data;

@Data
public class BranchDto {
	private Integer id;
    private String name;
    private String code;
    private Integer totalSemesters;
    private String hodName;
    private String contactEmail;
    private String location;
    private String status;
}
