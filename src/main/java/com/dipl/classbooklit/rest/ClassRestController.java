package com.dipl.classbooklit.rest;

import com.dipl.classbooklit.dto.classes.ClassDTO;
import com.dipl.classbooklit.dto.classes.ClassDTOWithFaculty;
import com.dipl.classbooklit.payload.MessageResponse;
import com.dipl.classbooklit.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ClassRestController {

    private ClassService classService;

    @Autowired
    public ClassRestController(ClassService classService) {
        this.classService = classService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/classes")
    public List<ClassDTOWithFaculty> findAllClassDTOWithFaculties() {
        return classService.findAllWithFaculties();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/classes/{id}")
    public ClassDTOWithFaculty findById(@PathVariable Long id) {
        ClassDTOWithFaculty theClass = classService.findByIdWithFaculties(id);
        if( theClass == null) {
            throw new RuntimeException("There's no class with id: " + id);
        }
        return theClass;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/classes")
    public ResponseEntity<?> addClass(@Valid @RequestBody ClassDTOWithFaculty theClass) {
        theClass.setId((long) 0);
        if ( theClass.getName() == "" || theClass.getAcronym() == "" || theClass.getType() == "" || theClass.getSemester() == "") {
            return ResponseEntity.badRequest().body(new MessageResponse("Make sure to input all required data."));
        }
        if ( theClass.getFaculty().getName() == "" ) {
            return ResponseEntity.badRequest().body(new MessageResponse("Make sure to choose a faculty the class belongs to."));
        }
        List<ClassDTOWithFaculty> currentClasses = classService.findAllWithFaculties();
        boolean sameName = false;
        for (ClassDTOWithFaculty currentClass: currentClasses) {
            if(currentClass.getName().equals(theClass.getName())) {
                sameName = true;
                break;
            }
        }
        if ( sameName ) {
            return ResponseEntity.badRequest().body(new MessageResponse("Class with name " + theClass.getName() + " already exists."));
        }
        classService.save(theClass);
        return ResponseEntity.ok(theClass);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/classes/{id}")
    public ResponseEntity<?> updateClass(@PathVariable Long id, @RequestBody ClassDTOWithFaculty theClass) {
        theClass.setId(id);
        if ( theClass.getName() == "" || theClass.getAcronym() == "" || theClass.getType() == "" || theClass.getSemester() == "") {
            return ResponseEntity.badRequest().body(new MessageResponse("Make sure to input all required data."));
        }
        if ( theClass.getFaculty().getName() == "" ) {
            return ResponseEntity.badRequest().body(new MessageResponse("Make sure to choose a faculty the class belongs to."));
        }
        List<ClassDTOWithFaculty> currentClasses = classService.findAllWithFaculties();
        boolean sameName = false;
        for (ClassDTOWithFaculty currentClass: currentClasses) {
            if(currentClass.getName().equals(theClass.getName()) && currentClass.getId() != id) {
                sameName = true;
                break;
            }
        }
        if ( sameName ) {
            return ResponseEntity.badRequest().body(new MessageResponse("Class with name " + theClass.getName() + " already exists."));
        }
        classService.save(theClass);
        return ResponseEntity.ok(theClass);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/classes/{id}")
    public String deleteById(@PathVariable Long id) {
        ClassDTOWithFaculty theClass = findById(id);
        if( theClass == null) {
            throw new RuntimeException("There's no class with id: " + id);
        }
        classService.deleteById(id);
        return "Deleted class with id: " + id;
    }
}
