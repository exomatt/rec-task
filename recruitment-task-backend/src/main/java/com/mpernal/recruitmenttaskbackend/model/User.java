package com.mpernal.recruitmenttaskbackend.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "APP_USER")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID", nullable = false, unique = true)
    private Long id;

    @Column(name = "USERNAME", nullable = false, unique = true)
    private String username;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "HASHED_PASSWORD", nullable = false)
    private String hashedPassword;

}
