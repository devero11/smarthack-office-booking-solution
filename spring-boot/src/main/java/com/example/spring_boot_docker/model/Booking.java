
package com.example.spring_boot_docker.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")  // table name in Postgres
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = true)
    public Integer[] objectIds;
    
    @Column( nullable = true)
    public String users;

    @Column( nullable = true)
    public LocalDateTime startTime; 


    @Column( nullable = false)
    public LocalDateTime endTime;




    }
