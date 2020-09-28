package com.dipl.classbooklit.service.literature;

import com.dipl.classbooklit.dao.LiteratureRepository;
import com.dipl.classbooklit.dto.literature.LiteratureDTO;
import com.dipl.classbooklit.entity.AnalogLiterature;
import com.dipl.classbooklit.entity.DigitalLiterature;
import com.dipl.classbooklit.entity.LiteratureType;
import com.dipl.classbooklit.util.bibtex.BibTexBook;
import com.dipl.classbooklit.util.bibtex.BibTexMisc;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public abstract class LiteratureServiceImpl<DOMAIN extends LiteratureType<DTO>, DTO extends LiteratureDTO<DOMAIN, DTO>, REPOSITORY extends LiteratureRepository<DOMAIN>> implements LiteratureService<DTO> {

    private final REPOSITORY literatureRepository;

    private BibTexMisc scriptFormater;
    private BibTexBook bookFormater;

    public LiteratureServiceImpl(REPOSITORY literatureRepository) {
        this.literatureRepository = literatureRepository;
    }

    @Override
    @Transactional
    public List<DTO> findAll() {
        List<DOMAIN> literatureTypes = literatureRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
        return literatureTypes.stream().map(DOMAIN::convertToBaseDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DTO findById(Long id) {
        Optional<DOMAIN> result = literatureRepository.findById(id);
        DTO literatureDTO;
        if(result.isPresent()) {
            literatureDTO = result.get().convertToBaseDTO();
        } else {
            // there's no literature with this ID
            throw new RuntimeException("There's no literature with the id: " + id);
        }
        return literatureDTO;
    }

    @Override
    @Transactional
    public void save(DTO literatureDTO) {
        DOMAIN literatureType = literatureDTO.convertToDomainEntity();
        literatureRepository.save(literatureType);
        generateBibTexFile();
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        literatureRepository.deleteById(id);
        generateBibTexFile();
    }

    private void generateBibTexFile() {
        bookFormater = new BibTexBook();
        scriptFormater = new BibTexMisc();
        File bibtexScriptFile = new File("D:\\bibtex_scripts.bib");
        File bibtexBookFile = new File("D:\\bibtex_books.bib");
        List<DOMAIN> allLiterature = literatureRepository.findAll();
        if( (!allLiterature.isEmpty()) && allLiterature.get(0).getType().equals("digital")) {
            try {
                if(!bibtexScriptFile.createNewFile()) {
                    bibtexScriptFile.delete();
                    for (DOMAIN item : allLiterature) {
                        DigitalLiterature digitalItem = (DigitalLiterature) item;
                        scriptFormater.addLiteratureEntry(digitalItem);
                    }
                } else {
                    for (DOMAIN item : allLiterature) {
                        DigitalLiterature digitalItem = (DigitalLiterature) item;
                        scriptFormater.addLiteratureEntry(digitalItem);
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if(allLiterature.get(0) != null && allLiterature.get(0).getType().equals("analog")) {
            try {
                if(!bibtexBookFile.createNewFile()) {
                    bibtexBookFile.delete();
                    for (DOMAIN item : allLiterature) {
                        AnalogLiterature analogItem = (AnalogLiterature) item;
                        bookFormater.addLiteratureEntry(analogItem);
                    }
                } else {
                    for (DOMAIN item : allLiterature) {
                        AnalogLiterature analogItem = (AnalogLiterature) item;
                        bookFormater.addLiteratureEntry(analogItem);
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
