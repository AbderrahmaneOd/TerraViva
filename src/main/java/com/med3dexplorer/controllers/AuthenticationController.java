package com.med3dexplorer.controllers;

import com.med3dexplorer.dto.*;
import com.med3dexplorer.models.Role;
import com.med3dexplorer.models.User;
import com.med3dexplorer.services.implementations.JwtServiceImpl;
import com.med3dexplorer.services.implementations.AuthenticationServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/v1/auth")
@RestController
public class AuthenticationController {
    private final JwtServiceImpl jwtService;
    private final AuthenticationServiceImpl authenticationService;
    private final UserDetailsService userDetailsService;


    public AuthenticationController(JwtServiceImpl jwtService, AuthenticationServiceImpl authenticationService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterUserDTO registerUserDto) {
        try {
            User registeredUser = authenticationService.signup(registerUserDto);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessage("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDTO loginUserDto) {
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            String accessToken = jwtService.generateToken(authenticatedUser);
            String refreshToken = jwtService.generateRefreshToken(authenticatedUser);

            List<String> roles = jwtService.extractRoles(accessToken);
            String role = roles.isEmpty() ? null : roles.get(0);

            LoginResponseDTO loginResponseDTO = new LoginResponseDTO()
                    .setAccessToken(accessToken)
                    .setExpiresIn(jwtService.getExpirationTime())
                    .setRole(Role.valueOf(role))
                    .setRefreshToken(refreshToken);

            return ResponseEntity.ok(loginResponseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseMessage("error", e.getMessage()));
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<LoginResponseDTO> authenticate(@RequestBody LoginUserDTO loginUserDto) {
//        User authenticatedUser = authenticationService.authenticate(loginUserDto);
//
//        String accessToken = jwtService.generateToken(authenticatedUser);
//        String refreshToken = jwtService.generateRefreshToken(authenticatedUser);
//
//        List<String> roles = jwtService.extractRoles(accessToken);
//        String role = roles.isEmpty() ? null : roles.get(0);
//
//        LoginResponseDTO loginResponseDTO = new LoginResponseDTO()
//                .setAccessToken(accessToken)
//                .setExpiresIn(jwtService.getExpirationTime())
//                .setRole(Role.valueOf(role))
//                .setRefreshToken(refreshToken);
//
//        return ResponseEntity.ok(loginResponseDTO);
//    }


//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
//        User authenticatedUser = authenticationService.authenticate(loginUserDto);
//
//        String jwtToken = jwtService.generateToken(authenticatedUser);
//
//        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());
//
//        return ResponseEntity.ok(loginResponse);
//    }


    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponseDTO> refreshAccessToken(@RequestBody TokenRefreshRequestDTO request) {
        String refreshToken = request.getRefreshToken();
        String username = jwtService.extractUsername(refreshToken);

        // Load UserDetails using the userDetailsService
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtService.isTokenValid(refreshToken, userDetails)) {
            String newAccessToken = jwtService.generateToken(userDetails);

            List<String> roles = jwtService.extractRoles(newAccessToken);
            String role = roles.isEmpty() ? null : roles.get(0);

            return ResponseEntity.ok(new LoginResponseDTO()
                    .setAccessToken(newAccessToken)
                    .setExpiresIn(jwtService.getExpirationTime())
                    .setRole(Role.valueOf(role))
                    .setRefreshToken(refreshToken));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}