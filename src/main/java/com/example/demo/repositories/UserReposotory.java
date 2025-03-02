package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserReposotory extends JpaRepository<User, Integer> {
	User findByUsername(String username);
	User findByEmail(String email);
}
