package com.dipl.classbooklit.entity;

import com.dipl.classbooklit.dto.literature.AnalogLiteratureDTO;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "analog")
public class AnalogLiterature extends LiteratureType<AnalogLiteratureDTO> {

    //fields
    @Column(name = "publisher")
    @NotEmpty(message = "Please input the publisher.")
    private String publisher;

    @Column(name = "address")
    private String address;

    @Column(name = "editor")
    private String editor;

    @Column(name = "edition")
    private String edition;

    @Column(name = "number")
    private String number;

    @Column(name = "series")
    private String series;

    @Column(name = "volume")
    private String volume;

    @ManyToMany(mappedBy = "books")
    private List<Class> classes = new ArrayList<>();

    //constructors
    public AnalogLiterature() {
    }

    public AnalogLiterature(String title, String month, String note, String yearOfPublishing, String publisher, String address, String editor, String edition, String number, String series, String volume, List<Class> classes) {
        super.setTitle(title);
        super.setMonth(month);
        super.setYearOfPublishing(yearOfPublishing);
        super.setNote(note);
        super.setType("analog");
        this.publisher = publisher;
        this.address = address;
        this.editor = editor;
        this.edition = edition;
        this.number = number;
        this.series = series;
        this.volume = volume;
        this.classes = classes;
    }

    //getters and setters
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

    public List<Class> getClasses() {
        return classes;
    }

    public void setClasses(List<Class> classes) {
        this.classes = classes;
    }

    //methods override
    @Override
    public String toString() {
        return super.toString() + "AnalogLiterature{" +
                "publisher='" + publisher + '\'' +
                ", placeOfPublishing='" + address + '\'' +
                '}';
    }

    @Override
    public AnalogLiteratureDTO convertToBaseDTO() {
        return new AnalogLiteratureDTO(this);
    }


    @Override
    public boolean addLiteratureEntry(File bibtex) {
        try {
            BufferedWriter fileWriter = new BufferedWriter(new FileWriter(bibtex, true));
            String authorsString = "";
            for (int i = 0; i < getLiteratureAuthors().size(); i++) {
                authorsString += getLiteratureAuthors().get(i).toString().toLowerCase();
                if(i == getLiteratureAuthors().size()) {
                    authorsString += ", ";
                }
            }

            fileWriter.write("@book{" + getLiteratureAuthors().get(0).getName().toLowerCase() + getYearOfPublishing() + ", " + System.lineSeparator() +
                    "author = \"" + authorsString + "\"," + System.lineSeparator() +
                    "title = \"" + getTitle() + "\"," + System.lineSeparator() +
                    "year = \"" + getYearOfPublishing() + "\"," + System.lineSeparator() +
                    "month = \"" + getMonth() + "\"," + System.lineSeparator() +
                    "address = \"" + getAddress() + "\"," + System.lineSeparator() +
                    "publisher = \"" + getPublisher() + "\"," + System.lineSeparator() +
                    "edition = \"" + getEdition() + "\"," + System.lineSeparator() +
                    "editor = \"" + getEditor() + "\"," + System.lineSeparator() +
                    "address = \"" + getAddress() + "\"," + System.lineSeparator() +
                    "number = \"" + getNumber() + "\"," + System.lineSeparator() +
                    "series = \"" + getSeries() + "\"," + System.lineSeparator() +
                    "volume = \"" + getVolume() + "\"," + System.lineSeparator() +
                    "note = \"" + getNote() + "\"" + System.lineSeparator() +
                    " }" + System.lineSeparator() );
            fileWriter.close();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
}
