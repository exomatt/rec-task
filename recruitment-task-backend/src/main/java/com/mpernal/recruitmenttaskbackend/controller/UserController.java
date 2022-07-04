package com.mpernal.recruitmenttaskbackend.controller;

import com.mpernal.recruitmenttaskbackend.dto.IUserDto;
import com.mpernal.recruitmenttaskbackend.dto.PaginatedDataWrapper;
import com.mpernal.recruitmenttaskbackend.dto.UserDto;
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
                                                                 @RequestParam(required = false) String orderDirection){
        return ResponseEntity.ok(userService.findAll(page, pageSize, orderBy, orderDirection));
    }

    @Operation(summary = "Get book by ID")
    @GetMapping("/{bookId}")
    public ResponseEntity<UserDto> getById(@PathVariable Long bookId){
        return ResponseEntity.ok(userService.findById(bookId));
    }

    @Operation(summary = "Create new book")
    @PostMapping("/")
    public ResponseEntity<UserDto> saveBook(@Valid @RequestBody UserDto bookDto) {
        return ResponseEntity.ok(userService.save(bookDto));
    }

    @Operation(summary = "Update book")
    @PutMapping("/")
    public ResponseEntity<UserDto> updateBook(@Valid @RequestBody UserDto bookDto) {
        return ResponseEntity.ok(userService.update(bookDto));
    }

    @Operation(summary = "Delete book by ID")
    @ApiResponses()
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long bookId) {
        userService.delete(bookId);
        return ResponseEntity.ok().build();
    }
}
