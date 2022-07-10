package com.mpernal.recruitmenttaskbackend.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UserDto {
    @NotNull
    private Long id;
    @NotNull
    @NotBlank
    private String username;
    @NotNull
    @NotBlank
    @Email
    private String email;
}
