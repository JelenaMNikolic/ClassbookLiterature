package com.dipl.classbooklit.dto.literature;

import com.dipl.classbooklit.dto.classes.ClassDTO;
import com.dipl.classbooklit.entity.Author;
import com.dipl.classbooklit.entity.Class;
import com.dipl.classbooklit.entity.DigitalLiterature;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class DigitalLiteratureDTO extends LiteratureDTO<DigitalLiterature, DigitalLiteratureDTO> {

    //fields
    private String howPublished;

    //controllers
    public DigitalLiteratureDTO() {
        super();
    }

    public DigitalLiteratureDTO(DigitalLiterature digitalLiterature) {
        super(digitalLiterature);
        this.type = "digital";
        this.howPublished = digitalLiterature.getHowPublished();
    }

    public String getHowPublished() {
        return howPublished;
    }

    public void setHowPublished(String howPublished) {
        this.howPublished = howPublished;
    }


    public List<ClassDTO> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassDTO> classes) {
        this.classes = classes;
    }

    @Override
    public DigitalLiterature convertToDomainEntity() {
        DigitalLiterature digitalLiterature = new DigitalLiterature();
        digitalLiterature.setId(getId());
        digitalLiterature.setType("digital");
        digitalLiterature.setTitle(getTitle());
        digitalLiterature.setMonth(getMonth());
        digitalLiterature.setNote(getNote());
        digitalLiterature.setLiteratureAuthors(getAuthor().stream().map(AuthorDTO::convertToDomainEntity).collect(Collectors.toList()));
        digitalLiterature.setYearOfPublishing(getYearOfPublishing());
        digitalLiterature.setHowPublished(getHowPublished());
        return digitalLiterature;
    }

}
