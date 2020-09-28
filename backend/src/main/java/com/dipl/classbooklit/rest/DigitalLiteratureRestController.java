package com.dipl.classbooklit.rest;

import com.dipl.classbooklit.dto.literature.DigitalLiteratureDTO;
import com.dipl.classbooklit.entity.DigitalLiterature;
import com.dipl.classbooklit.service.literature.DigitalLiteratureService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/digital")
public class DigitalLiteratureRestController extends LiteratureRestController<DigitalLiterature, DigitalLiteratureDTO, DigitalLiteratureService> {

    public DigitalLiteratureRestController(DigitalLiteratureService digitalLiteratureService) {
        super(digitalLiteratureService);
    }


}
