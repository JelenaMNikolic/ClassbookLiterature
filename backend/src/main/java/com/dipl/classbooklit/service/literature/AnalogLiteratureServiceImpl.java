package com.dipl.classbooklit.service.literature;

import com.dipl.classbooklit.dao.AnalogLiteratureRepository;
import com.dipl.classbooklit.dto.literature.AnalogLiteratureDTO;
import com.dipl.classbooklit.entity.AnalogLiterature;
import org.springframework.stereotype.Service;

@Service
public class AnalogLiteratureServiceImpl extends LiteratureServiceImpl<AnalogLiterature, AnalogLiteratureDTO, AnalogLiteratureRepository> implements AnalogLiteratureService {

    public AnalogLiteratureServiceImpl(AnalogLiteratureRepository analogLiteratureRepository) {
        super(analogLiteratureRepository);
    }

}
