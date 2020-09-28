package com.dipl.classbooklit.dto.user;

import com.dipl.classbooklit.entity.Role;
import com.dipl.classbooklit.entity.SystemUser;
import com.dipl.classbooklit.util.entityConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

public class SystemUserDTO implements entityConverter<SystemUser> {

    private Long id;
    private String username;
    private String password;
    private String name;
    private String surname;
    private String email;
    private String position;
    private List<RoleDTO> role;

    @Autowired
    PasswordEncoder encoder;

    public SystemUserDTO() {
    }

    public SystemUserDTO(SystemUser user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.position = user.getPosition();
        this.role = user.getRole().stream().map(Role::convertToBaseDTO).collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public List<RoleDTO> getRole() {
        return role;
    }

    public void setRole(List<RoleDTO> roles) {
        this.role = roles;
    }

    @Override
    public SystemUser convertToDomainEntity() {
        SystemUser user = new SystemUser();
        if(getId() != null) {
            user.setId(getId());
        }
        user.setUsername(getUsername());
        user.setPassword(getPassword());
        user.setName(getName());
        user.setSurname(getSurname());
        user.setEmail(getEmail());
        user.setPosition(getPosition());
        user.setRole(getRole().stream().map(RoleDTO::convertToDomainEntity).collect(Collectors.toList()));
        return user;
    }
}
