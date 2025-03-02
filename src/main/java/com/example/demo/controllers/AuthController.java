package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.services.AuthService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

	AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("auth/login")
	public Map<String, String> login(@RequestBody Map<String, String> request) {

		User user = authService.login(request.get("username"), request.get("password"));
		Map<String, String> response = null;

		if (user != null) {
			response = new HashMap<String, String>();
			response.put("username", user.getUsername());
			response.put("messagge", "Login Success");
		} else {
			response.put("error", "Login failed.........");
		}
		return response;
	}

	@PostMapping("auth/register")
	public Map<String, String> register(@RequestBody User user) {
		User registeredUser = authService.register(user);
		Map<String, String> response = new HashMap<>();

		if (registeredUser != null) {
			response.put("username", registeredUser.getUsername());
			response.put("message", "Registration Successful!");
		} else {
			response.put("error", "Registration failed...");
		}
		return response;
	}

}
