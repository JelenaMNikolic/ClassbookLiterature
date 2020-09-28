package com.dipl.classbooklit.util.bibtex;

import com.dipl.classbooklit.entity.AnalogLiterature;
import com.dipl.classbooklit.entity.Author;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class BibTexBook extends BibTexFormater<AnalogLiterature> {

    public BibTexBook() {
    }

    @Override
    public boolean addLiteratureEntry(AnalogLiterature analogLiterature) {
        File bibtexFile = new File("D:\\bibtex_books.bib");
        boolean entryAdded = false;
        try {
            bibtexFile.createNewFile();
            BufferedWriter fileWriter = new BufferedWriter(new FileWriter(bibtexFile, true));
            String authorsString = "";
            for (int i = 0; i < analogLiterature.getLiteratureAuthors().size(); i++) {
                authorsString += analogLiterature.getLiteratureAuthors().get(i).toString().toLowerCase();
                if(i+1 == analogLiterature.getLiteratureAuthors().size()) {
                    authorsString += ", ";
                }
            }

            fileWriter.write("@book{" + analogLiterature.getLiteratureAuthors().get(0).getName().toLowerCase() + analogLiterature.getYearOfPublishing() + ", " + System.lineSeparator() +
                    "author = \"" + authorsString + "\"," + System.lineSeparator() +
                    "title = \"" + analogLiterature.getTitle() + "\"," + System.lineSeparator() +
                    "year = \"" + analogLiterature.getYearOfPublishing() + "\"," + System.lineSeparator() +
                    "month = \"" + analogLiterature.getMonth() + "\"," + System.lineSeparator() +
                    "address = \"" + analogLiterature.getAddress() + "\"," + System.lineSeparator() +
                    "publisher = \"" + analogLiterature.getPublisher() + "\"," + System.lineSeparator() +
                    "edition = \"" + analogLiterature.getEdition() + "\"," + System.lineSeparator() +
                    "editor = \"" + analogLiterature.getEditor() + "\"," + System.lineSeparator() +
                    "address = \"" + analogLiterature.getAddress() + "\"," + System.lineSeparator() +
                    "number = \"" + analogLiterature.getNumber() + "\"," + System.lineSeparator() +
                    "series = \"" + analogLiterature.getSeries() + "\"," + System.lineSeparator() +
                    "volume = \"" + analogLiterature.getVolume() + "\"," + System.lineSeparator() +
                    "note = \"" + analogLiterature.getNote() + "\"" + System.lineSeparator() +
                    " }" + System.lineSeparator() );
            fileWriter.close();
            entryAdded = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return entryAdded;
    }
}
