package com.dipl.classbooklit.entity;

import com.dipl.classbooklit.dto.faculty.FacultyDTOBase;
import com.dipl.classbooklit.dto.faculty.FacultyDTOWithClasses;
import com.dipl.classbooklit.util.baseDTOMapper;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="faculty")
public class Faculty implements Serializable, baseDTOMapper<FacultyDTOBase>  {

    //fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    @NotEmpty(message = "Please input the department name.")
    private String name;

    @Column(name="activity")
    private String activity;

    @OneToMany
            (mappedBy = "faculty",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Class> classes = new ArrayList<>();

    //constructors
    public Faculty() {
    }

    public Faculty(String name, String activity) {
        this.name = name;
        this.activity = activity;
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

    public List<Class> getClasses() {
        return classes;
    }

    public void setClasses(List<Class> classes) {
        this.classes = classes;
    }

    //method overrides
    @Override
    public String toString() {
        return "Faculty{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", activity='" + activity + '\'' +
                '}';
    }

    @Override
    public FacultyDTOBase convertToBaseDTO() {
        return new FacultyDTOBase(this);
    }

    public FacultyDTOWithClasses convertToDTOWithClasses() {
        return new FacultyDTOWithClasses(this);
    }
}
