// BookingController is responsible for handling booking-related requests

package com.example.spring_boot_docker.controller;
import java.util.Map;

import java.util.Collections;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

// /scheduleBooking endpoint allows users to schedule a new booking
// Input data:
// - userId: ID of the user making the booking
// - startTime: Date of the booking in YYYY-MM-DD HH:MM format
// - endTime: Date of the booking in YYYY-MM-DD HH:MM format
// - objectId: ID of the object being booked
// - type: Type of booking (e.g., "meeting", "event", "entertainment")
// - description: Description of the booking
// - title: Title of the booking

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/scheduleBooking")
    public Map<String, String> scheduleBooking(@RequestBody BookingRequest bookingRequest) {
      String response = bookingService.scheduleBooking(
        bookingRequest.getUserId(),
        bookingRequest.getStartTime(),
        bookingRequest.getEndTime(),
        bookingRequest.getObjectId(),
        bookingRequest.getType(), // meeting, event, entertainment
        bookingRequest.getDescription(),
        bookingRequest.getTitle()
      );
      if (response.equals("BookingConflictError") || response.equals("InvalidDataError")) {
        throw new RuntimeException(response);
      }
      return Collections.singletonMap("response", response);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/scheduleSpecialEvent")
    public Map<String, String> scheduleSpecialEvent(@RequestBody BookingRequest bookingRequest) {
      String response = bookingService.scheduleSpecialEvent(
        bookingRequest.getUserId(),
        bookingRequest.getStartTime(),
        bookingRequest.getEndTime(),
        bookingRequest.getRoomId(),
        bookingRequest.getType(), // public or private
        bookingRequest.getDescription(),
        bookingRequest.getTitle(),
        bookingRequest.getGuestList()
      );
      if (response.equals("BookingConflictError") || response.equals("InvalidDataError")) {
        throw new RuntimeException(response);
      }
      return Collections.singletonMap("response", response);
    }


}
