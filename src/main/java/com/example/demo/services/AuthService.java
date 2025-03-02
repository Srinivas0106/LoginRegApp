package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserReposotory;

@Service
public class AuthService {

	UserReposotory userReposotory;

	public AuthService(UserReposotory userReposotory) {
		this.userReposotory = userReposotory;
	}

	public User login(String username, String password) {
		// check the validness of username and password
		User user = userReposotory.findByUsername(username);
		if (user != null && user.getPassword().equals(password)) {
			return user;
		} else {
			return null;
		}
	}

	public User register(User user) {
		// Check if the username or email already exists
		if (userReposotory.findByUsername(user.getUsername()) != null
				|| userReposotory.findByEmail(user.getEmail()) != null) {
			return null; // Username or email already taken
		}

		// Save the new user
		return userReposotory.save(user);
	}
}
