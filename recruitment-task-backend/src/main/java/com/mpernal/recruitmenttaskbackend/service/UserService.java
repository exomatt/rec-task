package com.mpernal.recruitmenttaskbackend.service;

import com.mpernal.recruitmenttaskbackend.dto.IUserDto;
import com.mpernal.recruitmenttaskbackend.dto.PaginatedDataWrapper;
import com.mpernal.recruitmenttaskbackend.dto.UserDto;
import com.mpernal.recruitmenttaskbackend.mapper.UserMapper;
import com.mpernal.recruitmenttaskbackend.model.User;
import com.mpernal.recruitmenttaskbackend.repository.UserRepository;
import com.mpernal.recruitmenttaskbackend.utils.SQLUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    public UserDto save(UserDto userDto) {
        UserMapper userMapper = UserMapper.INSTANCE;
        User User = userMapper.dtoToNewEntity(userDto);
        userRepository.saveAndFlush(User);
        return userMapper.entityToDto(User);
    }

    public UserDto update(UserDto userDto) {
        Optional<User> optionalUser = userRepository.findById(userDto.getId());
        if (optionalUser.isEmpty()) {
            return null;
        }

        User User = optionalUser.get();
        UserMapper mapper = UserMapper.INSTANCE;
        mapper.dtoToExistingEntity(userDto, User);
        userRepository.saveAndFlush(User);

        return mapper.entityToDto(User);
    }

    public void delete(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("No user with id: " + userId + " found");
        }
        userRepository.deleteById(userId);
    }
}
