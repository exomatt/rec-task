package com.mpernal.recruitmenttaskbackend.repository;

import com.mpernal.recruitmenttaskbackend.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    <T> List<T> findAllProjectedBy(Class<T> clazz, Pageable pageable);
}