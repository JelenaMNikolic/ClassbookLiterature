package com.dipl.classbooklit.dto.literature;

import com.dipl.classbooklit.entity.AnalogLiterature;
import com.dipl.classbooklit.entity.Author;
import com.dipl.classbooklit.entity.DigitalLiterature;
import com.dipl.classbooklit.util.entityConverter;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class AuthorDTO implements entityConverter<Author> {

    private Long id;
    private String name;
    private String surname;

    public AuthorDTO() {
    }

    public AuthorDTO(Author author) {
        this.id = author.getId();
        this.name = author.getName();
        this.surname = author.getSurname();
    }

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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Override
    public Author convertToDomainEntity() {
        Author author = new Author();
        author.setId(getId());
        author.setName(getName());
        author.setSurname(getSurname());
        return author;
    }
}
