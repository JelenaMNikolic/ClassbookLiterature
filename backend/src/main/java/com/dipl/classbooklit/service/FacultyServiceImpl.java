package com.dipl.classbooklit.service;

import com.dipl.classbooklit.dao.FacultyRepository;
import com.dipl.classbooklit.dto.faculty.FacultyDTOBase;
import com.dipl.classbooklit.dto.faculty.FacultyDTOWithClasses;
import com.dipl.classbooklit.entity.Faculty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FacultyServiceImpl implements FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    public FacultyServiceImpl(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    @Override
    @Transactional
    public List<FacultyDTOBase> findAll() {
        List<Faculty> facultyEntities = facultyRepository.findAll();
        return facultyEntities.stream().map(Faculty::convertToBaseDTO).collect(Collectors.toList());
    }


    @Override
    @Transactional
    public List<FacultyDTOWithClasses> findAllWithClasses() {
        List<Faculty> facultyEntities = facultyRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return facultyEntities.stream().map(Faculty::convertToDTOWithClasses).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FacultyDTOBase findById(Long id) {
        Optional<Faculty> result = facultyRepository.findById(id);
        FacultyDTOBase facultyDTO = null;
        if (result.isPresent()) {
            facultyDTO = result.get().convertToBaseDTO();
        } else {
            // there's no faculty with this ID
            throw new RuntimeException("There's no faculty with the id: " + id);
        }

        return facultyDTO;
    }

    @Override
    @Transactional
    public FacultyDTOWithClasses findByIdWithClasses(Long id) {
        Optional<Faculty> result = facultyRepository.findById(id);
        FacultyDTOWithClasses facultyDTO = null;
        if (result.isPresent()) {
            facultyDTO = result.get().convertToDTOWithClasses();
        } else {
            // there's no faculty with this ID
            throw new RuntimeException("There's no faculty with the id: " + id);
        }

        return facultyDTO;
    }

    @Override
    @Transactional
    public void save(FacultyDTOBase faculty) {
        Faculty facultyEntity = faculty.convertToDomainEntity();
        facultyRepository.save(facultyEntity);
    }

    @Override
    @Transactional
    public FacultyDTOWithClasses save(FacultyDTOWithClasses faculty) {
        Faculty facultyEntity = faculty.convertToDomainEntity();
        facultyRepository.save(facultyEntity);
        return  faculty;
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        facultyRepository.deleteById(id);
    }

}
