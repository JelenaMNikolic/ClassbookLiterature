package com.dipl.classbooklit.dto.user;

import com.dipl.classbooklit.entity.ERole;
import com.dipl.classbooklit.entity.Role;
import com.dipl.classbooklit.entity.SystemUser;
import com.dipl.classbooklit.util.entityConverter;

import java.util.List;

public class RoleDTO implements entityConverter<Role> {

    private long id;
    private ERole name;
    private List<SystemUserDTO> users;

    public RoleDTO() {
    }

    public RoleDTO(Role role) {
        this.id = role.getId();
        this.name = role.getName();
//        this.users = role.getUsers();
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

    public List<SystemUserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<SystemUserDTO> users) {
        this.users = users;
    }

    @Override
    public Role convertToDomainEntity() {
        Role role = new Role();
        role.setId(getId());
        role.setName(getName());
//        role.setUsers(getUsers());
        return role;
    }
}
