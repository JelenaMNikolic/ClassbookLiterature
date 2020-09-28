package com.dipl.classbooklit.rest;

import com.dipl.classbooklit.dto.faculty.FacultyDTOBase;
import com.dipl.classbooklit.dto.faculty.FacultyDTOWithClasses;
import com.dipl.classbooklit.payload.MessageResponse;
import com.dipl.classbooklit.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class FacultyRestController {

    private FacultyService facultyService;

    @Autowired
    public FacultyRestController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/faculties")
    public List<FacultyDTOWithClasses> findAll() {
        return facultyService.findAllWithClasses();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/faculties/{id}")
    public ResponseEntity<?> findByIdWithClasses(@PathVariable Long id) {
        try {
            FacultyDTOWithClasses faculty = facultyService.findByIdWithClasses(id);
            if (faculty == null) {
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There's no faculty with id: " + id);
            }
            return ResponseEntity.ok(faculty);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage()+"ERROR: The requested faculty could not be found.");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/faculties")
    public ResponseEntity<?> addFaculty(@Valid @RequestBody FacultyDTOBase faculty) {
        if( faculty.getName() == "") {
            return ResponseEntity.badRequest().body(new MessageResponse("Input faculty name."));
        }
        facultyService.save(faculty);
        return ResponseEntity.ok(faculty);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/faculties/{id}")
    public ResponseEntity<?> updateFaculty(@PathVariable Long id, @RequestBody FacultyDTOBase faculty) {
        FacultyDTOBase current = faculty;
        current.setId(id);
        if( faculty.getName() == "") {
            return ResponseEntity.badRequest().body(new MessageResponse("Input faculty name."));
        }
        return ResponseEntity.ok(faculty);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("faculties/{id}")
    public String deleteFaculty(@PathVariable Long id) {
        try {
            findByIdWithClasses(id);
            facultyService.deleteById(id);
            return "Deleted faculty with id: " + id;
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage()+"ERROR: The requested faculty could not be deleted.");
        }
    }
}
