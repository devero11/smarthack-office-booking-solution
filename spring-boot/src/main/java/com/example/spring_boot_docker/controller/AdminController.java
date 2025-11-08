package com.example.spring_boot_docker.controller;
import java.util.Map;

import java.util.Collections;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/acceptSpecialEvent")
    public Map<String, String> acceptSpecialEvent(@RequestBody BookingRequest bookingRequest) {
        String response = adminService.acceptSpecialEvent(
            bookingRequest.getUserId(),
            bookingRequest.getStartTime(),
            bookingRequest.getEndTime(),
            bookingRequest.getRoomId(),
            bookingRequest.getType(),
            bookingRequest.getDescription(),
            bookingRequest.getTitle(),
            bookingRequest.getGuestList()
        );
        if (response.equals("BookingConflictError") || response.equals("InvalidDataError")) {
            throw new RuntimeException(response);
        }
        return Collections.singletonMap("response", response);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/getBookingsForUser")
    public Map<String, Object> getBookings(@RequestBody BookingRequest bookingRequest) {
        List<Booking> bookings = adminService.getBookings(
            bookingRequest.getUserId(),
            bookingRequest.getStartTime(),
            bookingRequest.getEndTime()
        );
        return Collections.singletonMap("bookings", bookings);
    }    
}