package com.dipl.classbooklit.rest;

import com.dipl.classbooklit.dto.literature.AnalogLiteratureDTO;
import com.dipl.classbooklit.entity.AnalogLiterature;
import com.dipl.classbooklit.service.literature.AnalogLiteratureService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analog")
public class AnalogLiteratureRestController extends LiteratureRestController<AnalogLiterature, AnalogLiteratureDTO, AnalogLiteratureService> {

    public AnalogLiteratureRestController(AnalogLiteratureService literatureService) {
        super(literatureService);
    }

//    @GetMapping("/books")
//    public List<AnalogLiteratureDTO> findAll() {
//        return analogLiteratureService.findAll();
//    }
//
//    @GetMapping("/books/{id}")
//    public AnalogLiteratureDTO findById(@PathVariable Long id) {
//        AnalogLiteratureDTO analogLiterature = analogLiteratureService.findById(id);
//        if (analogLiterature == null) {
//            throw new RuntimeException("There's no book with id: " + id);
//        }
//        return analogLiterature;
//    }
//
//    @PostMapping("/books")
//    public AnalogLiteratureDTO addBook(@RequestBody AnalogLiteratureDTO analogLiterature) {
//        analogLiterature.setId((long) 0);
//        analogLiteratureService.save(analogLiterature);
//        return analogLiterature;
//    }
//
//    @PutMapping("/books")
//    public AnalogLiteratureDTO updateBook(@RequestBody AnalogLiteratureDTO analogLiterature) {
//        analogLiteratureService.save(analogLiterature);
//        return analogLiterature;
//    }
//
//    @DeleteMapping("/books/{id}")
//    private String deleteById(@PathVariable Long id) {
//        AnalogLiteratureDTO analogLiterature = findById(id);
//        if (analogLiterature == null) {
//            throw new RuntimeException("There's no book with id: " + id);
//        }
//        analogLiteratureService.deleteById(id);
//        return "Deleted book with id: " + id;
//    }
}
