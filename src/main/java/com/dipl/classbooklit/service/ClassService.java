package com.dipl.classbooklit.service;

import com.dipl.classbooklit.dto.classes.ClassDTOWithFaculty;
import com.dipl.classbooklit.util.baseService;
import com.dipl.classbooklit.dto.classes.ClassDTO;

import java.util.List;

public interface ClassService extends baseService<ClassDTOWithFaculty> {

    List<ClassDTOWithFaculty> findAllWithFaculties();

    ClassDTOWithFaculty findByIdWithFaculties(Long id);

}
