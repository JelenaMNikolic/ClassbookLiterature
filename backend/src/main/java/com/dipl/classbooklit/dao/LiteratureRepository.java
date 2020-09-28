package com.dipl.classbooklit.dao;

import com.dipl.classbooklit.entity.LiteratureType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LiteratureRepository<DOMAIN extends LiteratureType> extends JpaRepository<DOMAIN, Long> {
}
