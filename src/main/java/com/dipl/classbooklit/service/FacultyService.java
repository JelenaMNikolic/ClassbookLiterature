package com.dipl.classbooklit.service;

import com.dipl.classbooklit.dto.faculty.FacultyDTOBase;
import com.dipl.classbooklit.dto.faculty.FacultyDTOWithClasses;
import com.dipl.classbooklit.util.baseService;

import java.util.List;

public interface FacultyService extends baseService<FacultyDTOBase> {

    List<FacultyDTOWithClasses> findAllWithClasses();

    FacultyDTOWithClasses findByIdWithClasses(Long id);

    FacultyDTOWithClasses save(FacultyDTOWithClasses faculty);

}
