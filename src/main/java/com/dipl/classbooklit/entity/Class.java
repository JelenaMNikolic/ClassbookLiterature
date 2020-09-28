package com.dipl.classbooklit.entity;

import com.dipl.classbooklit.dto.classes.ClassDTO;
import com.dipl.classbooklit.dto.classes.ClassDTOWithFaculty;
import com.dipl.classbooklit.util.baseDTOMapper;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="class", uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
public class Class implements Serializable, baseDTOMapper<ClassDTO> {

    //fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotEmpty()
    @Column(name = "acronym")
    private String acronym;

    @NotEmpty()
    @Column(name = "name")
    private String name;

    @NotEmpty()
    @Column(name = "type")
    private String type;

    @NotEmpty()
    @Column(name = "semester")
    private String semester;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "faculty_id", nullable = false)
    private Faculty faculty;

    @ManyToMany()
    @JoinTable(name = "class_literature",
            joinColumns = @JoinColumn(name = "class_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "literature_id", referencedColumnName = "id"))
    private List<LiteratureType<?>> literature = new ArrayList<>();

    @ManyToMany()
    @JoinTable(name = "class_books",
            joinColumns = @JoinColumn(name = "class_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "analog_id", referencedColumnName = "id"))
    private List<AnalogLiterature> books = new ArrayList<>();

    @ManyToMany()
    @JoinTable(name = "class_scripts",
            joinColumns = @JoinColumn(name = "class_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "digital_id", referencedColumnName = "id"))
    private List<DigitalLiterature> scripts = new ArrayList<>();

    //constructors
    public Class() {
    }

    public Class(String acronym, String name, String type, String semester, Faculty faculty) {
        this.acronym = acronym;
        this.name = name;
        this.type = type;
        this.semester = semester;
        this.faculty = faculty;
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

    public List<AnalogLiterature> getBooks() {
        return books;
    }

    public void setBooks(List<AnalogLiterature> books) {
        this.books = books;
    }

    public List<DigitalLiterature> getScripts() {
        return scripts;
    }

    public void setScripts(List<DigitalLiterature> scripts) {
        this.scripts = scripts;
    }

    //function override
    @Override
    public String toString() {
        return "Class{" +
                "id=" + id +
                ", acronym='" + acronym + '\'' +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", semester='" + semester + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Class)) return false;
        return id != null && id.equals(((Class) o).getId());
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public ClassDTO convertToBaseDTO() {
        return new ClassDTO(this);
    }

    public ClassDTOWithFaculty convertToDTOWithFaculty() {
        return new ClassDTOWithFaculty(this);
    }

}
