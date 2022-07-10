package com.mpernal.recruitmenttaskbackend.controller;

import com.mpernal.recruitmenttaskbackend.dto.*;
import com.mpernal.recruitmenttaskbackend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Get all users")
    @GetMapping("/all")
    public ResponseEntity<PaginatedDataWrapper<IUserDto>> getAll(@RequestParam Integer page,
                                                                 @RequestParam Integer pageSize,
                                                                 @RequestParam(required = false) String orderBy,
                                                                 @RequestParam(required = false) String orderDirection) {
        return ResponseEntity.ok(userService.findAll(page, pageSize, orderBy, orderDirection));
    }

    @Operation(summary = "Get user by ID")
    @GetMapping("/{bookId}")
    public ResponseEntity<UserDto> getById(@PathVariable Long bookId) {
        return ResponseEntity.ok(userService.findById(bookId));
    }

    @Operation(summary = "Create new user")
    @PostMapping("/")
    public ResponseEntity<UserDto> saveUser(@Valid @RequestBody CreateUserDto bookDto) {
        return ResponseEntity.ok(userService.save(bookDto));
    }

    @Operation(summary = "Change password")
    @PostMapping("/changePassword")
    public ResponseEntity<UserDto> changePassword(@Valid @RequestBody ChangePasswordRequest changePassword) {
        return ResponseEntity.ok(userService.changePassword(changePassword));
    }

    @Operation(summary = "Update user")
    @PutMapping("/")
    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto bookDto) {
        return ResponseEntity.ok(userService.update(bookDto));
    }

    @Operation(summary = "Delete user by ID")
    @ApiResponses()
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.delete(userId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Check if user exists by username")
    @ApiResponses()
    @GetMapping("/existsByUsername")
    public ResponseEntity<Boolean> existsByUsername(@RequestParam String username) {
        return ResponseEntity.ok(userService.existsByUsername(username));
    }

    @Operation(summary = "Check if user exists by email")
    @ApiResponses()
    @GetMapping("/existsByEmail")
    public ResponseEntity<Boolean> existsByEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.existsByEmail(email));
    }
}
