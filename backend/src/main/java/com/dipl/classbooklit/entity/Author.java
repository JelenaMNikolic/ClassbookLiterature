package com.dipl.classbooklit.entity;

import com.dipl.classbooklit.dto.literature.AuthorDTO;
import com.dipl.classbooklit.util.baseDTOMapper;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "author")
public class Author implements Serializable, baseDTOMapper<AuthorDTO> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    @NotEmpty
    private String name;

    @Column
    @NotEmpty
    private String surname;

    @ManyToMany(mappedBy = "literatureAuthors", fetch = FetchType.LAZY)
    private List<LiteratureType> literature = new ArrayList<>();


    public Author() {
    }

    public Author(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public List<LiteratureType> getLiterature() {
        return literature;
    }

    public void setLiterature(List<LiteratureType> books) {
        this.literature = books;
    }

    @Override
    public AuthorDTO convertToBaseDTO() {
        return new AuthorDTO(this);
    }

    @Override
    public String toString() {
        return name + " " + surname;
    }
}
