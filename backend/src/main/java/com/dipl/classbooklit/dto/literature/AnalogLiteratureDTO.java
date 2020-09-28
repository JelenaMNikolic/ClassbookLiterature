package com.dipl.classbooklit.dto.literature;

import com.dipl.classbooklit.dto.classes.ClassDTO;
import com.dipl.classbooklit.entity.AnalogLiterature;
import com.dipl.classbooklit.entity.Author;
import com.dipl.classbooklit.entity.Class;

import javax.persistence.Column;
import java.util.List;
import java.util.stream.Collectors;

public class AnalogLiteratureDTO extends LiteratureDTO<AnalogLiterature, AnalogLiteratureDTO> {

    //fields
    private String publisher;
    private String address;

    private String editor;
    private String edition;
    private String number;
    private String series;
    private String volume;

    //constructors
    public AnalogLiteratureDTO() {
        super();
    }

    public AnalogLiteratureDTO(AnalogLiterature analogLiterature) {
        super(analogLiterature);
        this.type = "analog";
        this.publisher = analogLiterature.getPublisher();
        this.address = analogLiterature.getAddress();
        this.editor = analogLiterature.getEditor();
        this.edition = analogLiterature.getEdition();
        this.number = analogLiterature.getNumber();
        this.series = analogLiterature.getSeries();
        this.volume = analogLiterature.getVolume();
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public List<ClassDTO> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassDTO> classes) {
        this.classes = classes;
    }

    @Override
    public AnalogLiterature convertToDomainEntity() {
        AnalogLiterature analogLiterature = new AnalogLiterature();
        analogLiterature.setType("analog");
        analogLiterature.setId(getId());
        analogLiterature.setTitle(getTitle());
        analogLiterature.setMonth(getMonth());
        analogLiterature.setNote(getNote());
        analogLiterature.setLiteratureAuthors(getAuthor().stream().map(AuthorDTO::convertToDomainEntity).collect(Collectors.toList()));
        analogLiterature.setYearOfPublishing(getYearOfPublishing());
        analogLiterature.setPublisher(getPublisher());
        analogLiterature.setAddress(getAddress());
        analogLiterature.setEditor(getEditor());
        analogLiterature.setEdition(getEdition());
        analogLiterature.setNumber(getNumber());
        analogLiterature.setSeries(getSeries());
        analogLiterature.setVolume(getVolume());
        return analogLiterature;
    }
}
