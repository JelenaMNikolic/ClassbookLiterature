package com.dipl.classbooklit.util.bibtex;

import com.dipl.classbooklit.entity.AnalogLiterature;
import com.dipl.classbooklit.entity.Author;
import com.dipl.classbooklit.entity.DigitalLiterature;
import com.dipl.classbooklit.entity.LiteratureType;

import java.io.File;
import java.io.IOException;
import java.util.List;

public abstract class BibTexFormater<TYPE> {


    public BibTexFormater() {
    }


//    public boolean addBibTexFileEntry() {
//        File bibtexFile = new File("D:\\bibtex.bib");
//        boolean entryAdded = false;
//        try {
//            bibtexFile.createNewFile();
//            String type = "";
//            switch (type) {
//                case "digital":
//            }
//            entryAdded = addLiteratureEntry(bibtexFile, type);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return entryAdded;
//    }

    public abstract boolean addLiteratureEntry(TYPE type);

}
