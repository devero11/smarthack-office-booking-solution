package com.example.spring_boot_docker.service;


import java.util.List;


import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;

import com.example.spring_boot_docker.model.Booking;
import com.example.spring_boot_docker.model.User;
import io.jsonwebtoken.Claims;

import com.example.spring_boot_docker.repository.BookingRepository;
import com.example.spring_boot_docker.repository.UserRepository;

@Service
public class BookingService {
  BookingRepository bookingRepository;
  
  public BookingService(BookingRepository b){
    this.bookingRepository = b; 
  }
  public void createBooking(Booking b) {
    bookingRepository.save(b);     
  }

  public List<Booking> getBookings(){
        return bookingRepository.findAll();
  }
}

