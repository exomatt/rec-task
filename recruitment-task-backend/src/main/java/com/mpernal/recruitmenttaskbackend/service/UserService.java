package com.mpernal.recruitmenttaskbackend.service;

import com.mpernal.recruitmenttaskbackend.dto.*;
import com.mpernal.recruitmenttaskbackend.mapper.UserMapper;
import com.mpernal.recruitmenttaskbackend.model.User;
import com.mpernal.recruitmenttaskbackend.repository.UserRepository;
import com.mpernal.recruitmenttaskbackend.utils.SQLUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public PaginatedDataWrapper<IUserDto> findAll(Integer page, Integer pageSize, String orderBy, String orderDirection) {
        List<IUserDto> Users = userRepository.findAllProjectedBy(IUserDto.class, SQLUtils.getPageRequest(page, pageSize, orderBy, orderDirection));
        return new PaginatedDataWrapper<>(Users, userRepository.count());
    }

    public UserDto findById(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("No User with id: " + userId + " found");
        }
        UserMapper userMapper = UserMapper.INSTANCE;
        return userMapper.entityToDto(optionalUser.get());
    }

    public UserDto save(CreateUserDto createUserDto) {
        UserMapper userMapper = UserMapper.INSTANCE;
        User user = userMapper.dtoToNewEntity(createUserDto);
        user.setHashedPassword(passwordEncoder.encode(createUserDto.getPassword()));
        userRepository.saveAndFlush(user);
        return userMapper.entityToDto(user);
    }

    public UserDto update(UserDto userDto) {
        Optional<User> optionalUser = userRepository.findById(userDto.getId());
        if (optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();
        UserMapper mapper = UserMapper.INSTANCE;
        mapper.dtoToExistingEntity(userDto, user);
        userRepository.saveAndFlush(user);

        return mapper.entityToDto(user);
    }

    public UserDto changePassword(ChangePasswordRequest changePasswordRequest) {
        Optional<User> optionalUser = userRepository.findById(changePasswordRequest.getId());
        if (optionalUser.isEmpty()) {
            return null;
        }
        User user = optionalUser.get();
        user.setHashedPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
        userRepository.saveAndFlush(user);
        UserMapper mapper = UserMapper.INSTANCE;
        return mapper.entityToDto(user);
    }

    public void delete(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("No user with id: " + userId + " found");
        }
        userRepository.deleteById(userId);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
