package com.dipl.classbooklit.dto.literature;

import com.dipl.classbooklit.dto.classes.ClassDTO;
import com.dipl.classbooklit.entity.Author;
import com.dipl.classbooklit.entity.Class;
import com.dipl.classbooklit.entity.LiteratureType;
import com.dipl.classbooklit.util.entityConverter;

import java.util.List;
import java.util.stream.Collectors;

public abstract class LiteratureDTO<DOMAIN, DTO> implements entityConverter<DOMAIN> {

    protected Long id;
    protected String title;
    protected String month;
    protected String yearOfPublishing;
    protected String note;
    private List<AuthorDTO> author;
    protected String type;
    protected List<ClassDTO> classes;

    public LiteratureDTO() {

    }

    public LiteratureDTO(LiteratureType<DTO> literatureType) {
        this.id = literatureType.getId();
        this.title = literatureType.getTitle();
        this.month = literatureType.getMonth();
        this.note = literatureType.getNote();
        this.author = literatureType.getLiteratureAuthors().stream().map(Author::convertToBaseDTO).collect(Collectors.toList());
        this.type = literatureType.getType();
        this.yearOfPublishing = literatureType.getYearOfPublishing();
        this.classes = literatureType.getClasses().stream().map(Class::convertToBaseDTO).collect(Collectors.toList());
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getYearOfPublishing() {
        return yearOfPublishing;
    }

    public void setYearOfPublishing(String yearOfPublishing) {
        this.yearOfPublishing = yearOfPublishing;
    }

    public List<ClassDTO> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassDTO> classes) {
        this.classes = classes;
    }

    public List<AuthorDTO> getAuthor() {
        return author;
    }

    public void setAuthor(List<AuthorDTO> author) {
        this.author = author;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public abstract DOMAIN convertToDomainEntity();
}
