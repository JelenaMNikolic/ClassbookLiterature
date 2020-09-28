package com.dipl.classbooklit.util;

import java.util.List;

public interface baseService<DTO> {

    List<DTO> findAll();

    DTO findById(Long id);

    void save(DTO dto);

    void deleteById(Long id);

}
