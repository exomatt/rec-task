package com.mpernal.recruitmenttaskbackend.mapper;

import com.mpernal.recruitmenttaskbackend.dto.CreateUserDto;
import com.mpernal.recruitmenttaskbackend.dto.UserDto;
import com.mpernal.recruitmenttaskbackend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "id", ignore = true)
    User dtoToNewEntity(CreateUserDto bookDto);

    @Mapping(target = "id", ignore = true)
    void dtoToExistingEntity(UserDto bookDto, @MappingTarget User book);

    UserDto entityToDto(User book);

}
