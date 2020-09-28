package com.dipl.classbooklit.dto.faculty;

import com.dipl.classbooklit.entity.Faculty;
import com.dipl.classbooklit.util.entityConverter;

public class FacultyDTOBase implements entityConverter<Faculty> {

    //fields
    private Long id;
    private String name;
    private String activity;

    //constructors
    public FacultyDTOBase() {
    }

    public FacultyDTOBase(Faculty faculty) {
        this.id = faculty.getId();
        this.name = faculty.getName();
        this.activity = faculty.getActivity();
    }

    //getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    @Override
    public Faculty convertToDomainEntity() {
        Faculty faculty = new Faculty();
        faculty.setId(getId());
        faculty.setName(getName());
        faculty.setActivity(getActivity());
        return faculty;
    }
}
