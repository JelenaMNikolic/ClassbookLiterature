package com.dipl.classbooklit.dao;

import com.dipl.classbooklit.entity.ERole;
import com.dipl.classbooklit.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);
}
