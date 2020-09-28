package com.dipl.classbooklit.dto.faculty;

import com.dipl.classbooklit.dto.classes.ClassDTO;
import com.dipl.classbooklit.entity.Class;
import com.dipl.classbooklit.entity.Faculty;
import com.dipl.classbooklit.util.entityConverter;

import java.util.List;
import java.util.stream.Collectors;

public class FacultyDTOWithClasses implements entityConverter<Faculty> {

    //fields
    private Long id;
    private String name;
    private String activity;
    private List<ClassDTO> classes;

    //constructors
    public FacultyDTOWithClasses(Faculty faculty) {
        this.id = faculty.getId();
        this.name = faculty.getName();
        this.activity = faculty.getActivity();
        // pay attention
        this.classes = faculty.getClasses().stream().map(Class::convertToBaseDTO).collect(Collectors.toList());
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

    public List<ClassDTO> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassDTO> classes) {
        this.classes = classes;
    }

    @Override
    public Faculty convertToDomainEntity() {
        Faculty faculty = new Faculty();
        faculty.setId(getId());
        faculty.setName(getName());
        faculty.setActivity(getActivity());
        faculty.setClasses(getClasses().stream().map(ClassDTO::convertToDomainEntity).collect(Collectors.toList()));
        return faculty;
    }
}
