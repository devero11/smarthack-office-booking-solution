
package com.example.spring_boot_docker.repository;

import com.example.spring_boot_docker.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
