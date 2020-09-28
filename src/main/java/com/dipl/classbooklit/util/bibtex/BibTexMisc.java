package com.dipl.classbooklit.util.bibtex;

import com.dipl.classbooklit.entity.DigitalLiterature;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class BibTexMisc extends BibTexFormater<DigitalLiterature> {

    public BibTexMisc() {
    }

    @Override
    public boolean addLiteratureEntry(DigitalLiterature digitalLiterature) {
        File bibtexFile = new File("D:\\bibtex_scripts.bib");
        boolean entryAdded = false;
        try {
            bibtexFile.createNewFile();
            BufferedWriter fileWriter = new BufferedWriter(new FileWriter(bibtexFile, true));
            String authorsString = "";
            for (int i = 0; i < digitalLiterature.getLiteratureAuthors().size(); i++) {
                authorsString += digitalLiterature.getLiteratureAuthors().get(i).toString().toLowerCase();
                if(i+1 == digitalLiterature.getLiteratureAuthors().size()) {
                    authorsString += ", ";
                }
            }

            fileWriter.write("@misc{" + digitalLiterature.getLiteratureAuthors().get(0).getName().toLowerCase() + digitalLiterature.getYearOfPublishing() + ", " + System.lineSeparator() +
                    "author = \"" + authorsString + "\"," + System.lineSeparator() +
                    "title = \"" + digitalLiterature.getTitle() + "\"," + System.lineSeparator() +
                    "year = \"" + digitalLiterature.getYearOfPublishing() + "\"," + System.lineSeparator() +
                    "month = \"" + digitalLiterature.getMonth() + "\"," + System.lineSeparator() +
                    "howPublished = \"" + digitalLiterature.getHowPublished() + "\"," + System.lineSeparator() +
                    "note = \"" + digitalLiterature.getNote() + "\"" + System.lineSeparator() +
                    " }" + System.lineSeparator() );
            fileWriter.close();
            entryAdded = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return entryAdded;
    }
}
