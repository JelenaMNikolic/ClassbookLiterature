package com.dipl.classbooklit.dto.classes;

import com.dipl.classbooklit.entity.Faculty;
import com.dipl.classbooklit.util.entityConverter;
import com.dipl.classbooklit.entity.Class;


public class ClassDTO implements entityConverter<Class> {

    //fields
    private Long id;
    private String acronym;
    private String name;
    private String type;
    private String semester;
    private Faculty faculty;

    //constructors
    public ClassDTO() {
    }

    public ClassDTO(Class theClass) {
        this.id = theClass.getId();
        this.acronym = theClass.getAcronym();
        this.name = theClass.getName();
        this.type = theClass.getType();
        this.semester = theClass.getSemester();
        this.faculty = theClass.getFaculty().convertToBaseDTO().convertToDomainEntity();
    }

    //getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    @Override
    public Class convertToDomainEntity() {
        Class theClass = new Class();
        theClass.setId(getId());
        theClass.setAcronym(getAcronym());
        theClass.setName(getName());
        theClass.setType(getType());
        theClass.setSemester(getSemester());
        theClass.setFaculty(getFaculty());
        return theClass;
    }
}
