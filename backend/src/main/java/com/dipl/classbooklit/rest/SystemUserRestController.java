package com.dipl.classbooklit.rest;

import com.dipl.classbooklit.dto.user.SystemUserDTO;
import com.dipl.classbooklit.service.SystemUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class SystemUserRestController {

    private SystemUserService systemUserService;

    @Autowired
    public SystemUserRestController(SystemUserService systemUserService) {
        this.systemUserService = systemUserService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<SystemUserDTO> findAll() {
        return systemUserService.findAll();
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/users/{id}")
    public SystemUserDTO findById(@PathVariable Long id) {
        SystemUserDTO user = systemUserService.findById(id);
        if (user == null) {
            throw new RuntimeException("There's no user with id: " + id);
        }
        return user;
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping("/users/{id}")
    public SystemUserDTO updateUser(@PathVariable Long id, @RequestBody SystemUserDTO user) {
        systemUserService.save(user);
        return user;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("users/{id}")
    public String deleteUser(@PathVariable Long id) {
        SystemUserDTO userDTO = findById(id);
        if (userDTO == null) {
            throw new RuntimeException("There's no user with id: " + id);
        }
        systemUserService.deleteById(id);
        return "Deleted faculty with id: " + id;
    }

}
