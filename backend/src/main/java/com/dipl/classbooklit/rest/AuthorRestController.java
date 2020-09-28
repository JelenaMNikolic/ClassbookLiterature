package com.dipl.classbooklit.rest;

import com.dipl.classbooklit.dto.literature.AuthorDTO;
import com.dipl.classbooklit.payload.MessageResponse;
import com.dipl.classbooklit.service.literature.AuthorService;
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
public class AuthorRestController {

    private AuthorService authorService;

    @Autowired
    public AuthorRestController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/authors")
    public List<AuthorDTO> findAll() {
        return authorService.findAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/authors/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            AuthorDTO authorDTO = authorService.findById(id);
            if (authorDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There's no author with id: " + id);
            }
            return ResponseEntity.ok(authorDTO);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage()+"ERROR: The requested author could not be found.");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/authors")
    public ResponseEntity<?> addAuthor(@Valid @RequestBody AuthorDTO authorDTO) {
        if( authorDTO.getName() == "" || authorDTO.getSurname() == "") {
            return ResponseEntity.badRequest().body(new MessageResponse("Input author name."));
        }
        authorService.save(authorDTO);
        return ResponseEntity.ok(authorDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/authors/{id}")
    public ResponseEntity<?> updateAuthor(@PathVariable Long id, @RequestBody AuthorDTO authorDTO) {
        AuthorDTO current = authorDTO;
        current.setId(id);
        if( authorDTO.getName() == "" || authorDTO.getSurname() == "" ) {
            return ResponseEntity.badRequest().body(new MessageResponse("Input author name."));
        }
        return ResponseEntity.ok(authorDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("authors/{id}")
    public String deleteFaculty(@PathVariable Long id) {
        try {
            findById(id);
            authorService.deleteById(id);
            return "Deleted author with id: " + id;
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage()+"ERROR: The requested author could not be deleted.");
        }
    }
}
