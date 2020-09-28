package com.dipl.classbooklit.entity;

import com.dipl.classbooklit.dto.user.RoleDTO;
import com.dipl.classbooklit.util.baseDTOMapper;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Role implements baseDTOMapper<RoleDTO> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column
    private ERole name;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    private List<SystemUser> users = new ArrayList<>();

    public Role() {
    }

    public Role(ERole name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }

    public List<SystemUser> getUsers() {
        return users;
    }

    public void setUsers(List<SystemUser> users) {
        this.users = users;
    }

    @Override
    public RoleDTO convertToBaseDTO() {
        return new RoleDTO(this);
    }

}