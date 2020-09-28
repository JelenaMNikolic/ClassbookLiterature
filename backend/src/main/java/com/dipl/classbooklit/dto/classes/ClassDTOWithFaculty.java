package com.dipl.classbooklit.dto.classes;

import com.dipl.classbooklit.dto.literature.AnalogLiteratureDTO;
import com.dipl.classbooklit.dto.literature.DigitalLiteratureDTO;
import com.dipl.classbooklit.dto.literature.LiteratureDTO;
import com.dipl.classbooklit.dto.faculty.FacultyDTOBase;
import com.dipl.classbooklit.entity.AnalogLiterature;
import com.dipl.classbooklit.entity.Class;
import com.dipl.classbooklit.entity.DigitalLiterature;
import com.dipl.classbooklit.entity.LiteratureType;
import com.dipl.classbooklit.util.entityConverter;

import java.util.List;
import java.util.stream.Collectors;

public class ClassDTOWithFaculty implements entityConverter<Class> {

    //fields
    private Long id;
    private String acronym;
    private String name;
    private String type;
    private String semester;
    private FacultyDTOBase faculty;
    private List<AnalogLiteratureDTO> books;
    private List<DigitalLiteratureDTO> scripts;

    //constructors
    public ClassDTOWithFaculty() {
    }

    public ClassDTOWithFaculty(Class theClass) {
        this.id = theClass.getId();
        this.acronym = theClass.getAcronym();
        this.name = theClass.getName();
        this.type = theClass.getType();
        this.semester = theClass.getSemester();
        this.faculty = theClass.getFaculty().convertToBaseDTO();
        this.books = theClass.getBooks().stream().map(AnalogLiterature::convertToBaseDTO).collect(Collectors.toList());
        this.scripts = theClass.getScripts().stream().map(DigitalLiterature::convertToBaseDTO).collect(Collectors.toList());
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

    public FacultyDTOBase getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyDTOBase faculty) {
        this.faculty = faculty;
    }

    public List<AnalogLiteratureDTO> getBooks() {
        return books;
    }

    public void setBooks(List<AnalogLiteratureDTO> books) {
        this.books = books;
    }

    public List<DigitalLiteratureDTO> getScripts() {

        return scripts;
    }

    public void setScripts(List<DigitalLiteratureDTO> scripts) {
        this.scripts = scripts;
    }

    @Override
    public Class convertToDomainEntity() {
        Class theClass = new Class();
        theClass.setId(getId());
        theClass.setAcronym(getAcronym());
        theClass.setName(getName());
        theClass.setType(getType());
        theClass.setSemester(getSemester());
        theClass.setFaculty(getFaculty().convertToDomainEntity());
        //uncomment
        if( this.books != null) {
            theClass.setBooks(getBooks().stream().map(AnalogLiteratureDTO::convertToDomainEntity).collect(Collectors.toList()));
        }
        if( this.scripts != null) {
            theClass.setScripts(getScripts().stream().map(DigitalLiteratureDTO::convertToDomainEntity).collect(Collectors.toList()));;
        }

        return theClass;
    }
}
