package com.dipl.classbooklit.service.literature;

import com.dipl.classbooklit.dao.DigitalLiteratureRepository;
import com.dipl.classbooklit.dto.literature.DigitalLiteratureDTO;
import com.dipl.classbooklit.entity.DigitalLiterature;
import org.springframework.stereotype.Service;

@Service
public class DigitalLiteratureServiceImpl extends LiteratureServiceImpl<DigitalLiterature, DigitalLiteratureDTO, DigitalLiteratureRepository> implements DigitalLiteratureService {

    public DigitalLiteratureServiceImpl(DigitalLiteratureRepository digitalLiteratureRepository) {
        super(digitalLiteratureRepository);
    }
}
