package com.example.spring_boot_docker.controller;
import java.util.Map;

import java.util.Collections;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/acceptInvite")
    public Map<String, String> acceptSpecialEvent(@RequestBody BookingRequest bookingRequest) {
        String response = adminService.acceptSpecialEvent(

        );
        if (response.equals("BookingConflictError") || response.equals("InvalidDataError")) {
            throw new RuntimeException(response);
        }
        return Collections.singletonMap("response", response);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/getInvite")
    public Map<String, String> getInvite(@RequestBody BookingRequest bookingRequest) {
        String response = adminService.getInvite(

        );
        if (response.equals("BookingConflictError") || response.equals("InvalidDataError")) {
            throw new RuntimeException(response);
        }
        return Collections.singletonMap("response", response);
    }
}