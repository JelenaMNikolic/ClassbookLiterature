package com.dipl.classbooklit.service;

import com.dipl.classbooklit.dao.ClassRepository;
import com.dipl.classbooklit.dto.classes.ClassDTO;
import com.dipl.classbooklit.dto.classes.ClassDTOWithFaculty;
import com.dipl.classbooklit.entity.Class;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClassServiceImpl implements ClassService {

    private ClassRepository classRepository;

    @Autowired
    public ClassServiceImpl(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @Override
    @Transactional
    public List<ClassDTOWithFaculty> findAll() {
        List<Class> classEntities = classRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return classEntities.stream().map(Class::convertToDTOWithFaculty).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ClassDTOWithFaculty findById(Long id) {
        Optional<Class> result = classRepository.findById(id);
        ClassDTOWithFaculty theClass = null;
        if(result.isPresent()) {
            theClass = result.get().convertToDTOWithFaculty();
        } else {
            // there's no faculty with this ID
            throw new RuntimeException("There's no class with the id: " + id);
        }
        return theClass;
    }

    @Override
    @Transactional
    public List<ClassDTOWithFaculty> findAllWithFaculties() {
        List<Class> classEntities = classRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return classEntities.stream().map(Class::convertToDTOWithFaculty).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ClassDTOWithFaculty findByIdWithFaculties(Long id) {
        Optional<Class> result = classRepository.findById(id);
        ClassDTOWithFaculty theClass = null;
        if(result.isPresent()) {
            theClass = result.get().convertToDTOWithFaculty();
        } else {
            // there's no faculty with this ID
            throw new RuntimeException("There's no class with the id: " + id);
        }
        return theClass;
    }

    @Override
    @Transactional
    public void save(ClassDTOWithFaculty theClass) {
        Class classEntity = theClass.convertToDomainEntity();
        classRepository.save(classEntity);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        classRepository.deleteById(id);
    }
}
