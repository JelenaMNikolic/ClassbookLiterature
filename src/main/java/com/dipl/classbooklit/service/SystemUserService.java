package com.dipl.classbooklit.service;

import com.dipl.classbooklit.dto.user.SystemUserDTO;
import com.dipl.classbooklit.entity.SystemUser;
import com.dipl.classbooklit.util.baseService;

public interface SystemUserService extends baseService<SystemUserDTO> {

    SystemUser register(SystemUser user);
}
