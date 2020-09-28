package com.dipl.classbooklit.entity;

import com.dipl.classbooklit.dto.literature.DigitalLiteratureDTO;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "digital")
public class DigitalLiterature extends LiteratureType<DigitalLiteratureDTO> {

    //fields
    @Column(name = "how_published")
    private String howPublished;

    @ManyToMany(mappedBy = "scripts")
    private List<Class> classes = new ArrayList<>();

        //Constructors
    public DigitalLiterature() {
    }

    @Autowired
    public DigitalLiterature(String title, String month, String note, String yearOfPublishing, String howPublished, List<Class> classes) {
        this.setTitle(title);
        this.setNote(note);
        this.setMonth(month);
        this.setYearOfPublishing(yearOfPublishing);
        this.setType("digital");
        this.howPublished = howPublished;
        this.classes = classes;
    }

    //getters and setters

    public String getHowPublished() {
        return howPublished;
    }

    public void setHowPublished(String howPublished) {
        this.howPublished = howPublished;
    }

    public List<Class> getClasses() {
        return classes;
    }

    public void setClasses(List<Class> classes) {
        this.classes = classes;
    }

    //method override

    @Override
    public String toString() {
        return super.toString() + "DigitalLiterature{" +
                "url='" + howPublished + '\'' +
                '}';
    }

    @Override
    public DigitalLiteratureDTO convertToBaseDTO() {
        return new DigitalLiteratureDTO(this);
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

            fileWriter.write("@misc{" + getLiteratureAuthors().get(0).getName().toLowerCase() + getYearOfPublishing() + ", " + System.lineSeparator() +
                    "author = \"" + authorsString + "\"," + System.lineSeparator() +
                    "title = \"" + getTitle() + "\"," + System.lineSeparator() +
                    "year = \"" + getYearOfPublishing() + "\"," + System.lineSeparator() +
                    "month = \"" + getMonth() + "\"," + System.lineSeparator() +
                    "howPublished = \"" + getHowPublished() + "\"," + System.lineSeparator() +
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
