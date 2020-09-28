package com.dipl.classbooklit.entity;

import com.dipl.classbooklit.util.baseDTOMapper;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "literature_type")
public abstract class LiteratureType<DTO> implements baseDTOMapper<DTO> {

    //fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    @NotEmpty(message = "Please input the title.")
    private String title;

    @Column(name = "month")
    private String month;

    @Column(name = "year_of_publishing")
    @NotEmpty(message = "Please input the year of publishing.")
    private String yearOfPublishing;

    @Column(name = "note")
    private String note;

    @Column(name = "type")
    private String type;

    @NotNull(message = "Please input the author/authors.")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "author_literature",
            joinColumns = @JoinColumn(name = "literature_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "author_id", referencedColumnName = "id"))
    private List<Author> literatureAuthors = new ArrayList();

    @ManyToMany(mappedBy = "literature")
    private List<Class> classes = new ArrayList<>();

    public LiteratureType () {

    }

    //getters and setters
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getYearOfPublishing() {
        return yearOfPublishing;
    }

    public void setYearOfPublishing(String yearOfPublishing) {
        this.yearOfPublishing = yearOfPublishing;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Author> getLiteratureAuthors() {
        return literatureAuthors;
    }

    public void setLiteratureAuthors(List<Author> literatureAuthors) {
        this.literatureAuthors = literatureAuthors;
    }

    public List<Class> getClasses() {
        return classes;
    }

    public void setClasses(List<Class> classes) {
        this.classes = classes;
    }

    @Override
    public abstract DTO convertToBaseDTO();

    public boolean addBibTexFileEntry() {
        File bibtexFile = new File("D:\\bibtex.bib");
        boolean entryAdded = false;
        try {
            bibtexFile.createNewFile();
            entryAdded = addLiteratureEntry(bibtexFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return entryAdded;
    }

    public abstract boolean addLiteratureEntry(File bibtexFile);

    //method override
    @Override
    public String toString() {
        return "LiteratureType{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", month='" + month + '\'' +
                ", yearOfPublishing='" + yearOfPublishing + '\'' +
                '}';
    }

}
