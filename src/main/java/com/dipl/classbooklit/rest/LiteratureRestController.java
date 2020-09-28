package com.dipl.classbooklit.rest;

import com.dipl.classbooklit.dto.literature.AnalogLiteratureDTO;
import com.dipl.classbooklit.dto.literature.DigitalLiteratureDTO;
import com.dipl.classbooklit.dto.literature.LiteratureDTO;
import com.dipl.classbooklit.entity.LiteratureType;
import com.dipl.classbooklit.payload.MessageResponse;
import com.dipl.classbooklit.service.literature.LiteratureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

public abstract class LiteratureRestController<DOMAIN extends LiteratureType<DTO>, DTO extends LiteratureDTO<DOMAIN, DTO>, SERVICE extends LiteratureService<DTO>> {

    private SERVICE literatureService;

    @Autowired
    public LiteratureRestController(@Qualifier("literatureServiceImpl") SERVICE literatureService) {
        this.literatureService = literatureService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/scripts")
    public List<DTO> findAll() {
        return literatureService.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/scripts/{id}")
    public DTO findById(@PathVariable Long id) {
        DTO literatureDTO = literatureService.findById(id);
        if (literatureDTO == null) {
            throw new RuntimeException("There's no literature with id "+ id);
        }
        return literatureDTO;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/scripts")
    public ResponseEntity<?> addLiteratureDTO(@Valid @RequestBody DTO literatureDTO) {
        literatureDTO.setId((long) 0);
        literatureService.save(literatureDTO);
        return ResponseEntity.ok(literatureDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/scripts/{id}")
    public DTO updateLiteratureDTO(@PathVariable Long id, @RequestBody DTO literatureDTO) {
        literatureService.save(literatureDTO);
        return literatureDTO;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/scripts/{id}")
    public String deleteById(@PathVariable Long id) {
        DTO literatureDTO = findById(id);
        if (literatureDTO == null) {
            throw new RuntimeException("There's no literature with id "+ id);
        }
        literatureService.deleteById(id);
        return "Deleted literature with id: " + id;
    }

}
