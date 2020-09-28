package com.dipl.classbooklit.service;

import com.dipl.classbooklit.dao.SystemUserRepository;
import com.dipl.classbooklit.dto.user.SystemUserDTO;
import com.dipl.classbooklit.entity.SystemUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SystemUserServiceImpl implements SystemUserService {

    @Autowired
    private PasswordEncoder encoder;

    private SystemUserRepository systemUserRepository;

    @Autowired
    public SystemUserServiceImpl(SystemUserRepository systemUserRepository) {
        this.systemUserRepository = systemUserRepository;
    }

    @Override
    public List<SystemUserDTO> findAll() {
        List<SystemUser> users = systemUserRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return users.stream().map(SystemUser::convertToBaseDTO).collect(Collectors.toList());
    }

    @Override
    public SystemUserDTO findById(Long id) {
        Optional<SystemUser> result = systemUserRepository.findById(id);
        SystemUserDTO userDTO = null;
        if (result.isPresent()) {
            userDTO = result.get().convertToBaseDTO();
        } else {
            // there's no faculty with this ID
            throw new RuntimeException("There's no user with the id: " + id);
        }
        return userDTO;
    }

    @Override
    public void save(SystemUserDTO systemUserDTO) {
        SystemUser user = systemUserDTO.convertToDomainEntity();
        String encoded = encoder.encode(systemUserDTO.getPassword());
        user.setPassword(encoded);
        systemUserRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        systemUserRepository.deleteById(id);
    }

    @Override
    public SystemUser register(SystemUser user) {
        System.out.println(user.toString());
        systemUserRepository.save(user);
        return user;
    }
}
