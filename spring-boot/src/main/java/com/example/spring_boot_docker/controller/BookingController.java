// BookingController is responsible for handling booking-related requests

package com.example.spring_boot_docker.controller;
import java.util.Map;

import java.util.Collections;
import org.springframework.web.bind.annotation.*;
import com.example.spring_boot_docker.model.BookingRequest;
@RestController
@RequestMapping("/booking")
public class BookingController {


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/scheduleBooking")
    public Map<String, String> scheduleBooking(@RequestBody BookingRequest bookingRequest) {
      return Collections.singletonMap("status", "ok");
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/scheduleSpecialEvent")
    public Map<String, String> scheduleSpecialEvent(@RequestBody BookingRequest bookingRequest) {
      return Collections.singletonMap("status", "ok");
    }


}
