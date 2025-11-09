package com.example.spring_boot_docker.controller;

import java.util.List;


import org.springframework.web.bind.annotation.*;

import com.example.spring_boot_docker.model.Booking;
import com.example.spring_boot_docker.service.BookingService;

@RestController
public class BookingController {

  BookingService bookingService;
   public BookingController(BookingService b) {
     this.bookingService = b;
   }

   @CrossOrigin(origins = "http://localhost:4200")
   @PostMapping("/booking")
   public String createBooking(@RequestBody Booking booking) {
      bookingService.createBooking(booking); 
      return "Ok";
   }


   @CrossOrigin(origins = "http://localhost:4200")
   @GetMapping("/getbookings")
    public List<Booking> getAllBookings() {
      return bookingService.getBookings();
    }

}
