package com.example.spring_boot_docker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    // Obiectul rezervat (sală, birou, etc.)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "object_id", nullable = false)
    private BookableObject object;

    // Utilizatorul care face rezervarea
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private String type; // ex: "Meeting", "Relaxation", "Work"

    @Column(nullable = false)
    private String status; // "pending", "approved", "cancelled"

    private String title;
    private String description;

    // ID-ul userului care aprobă rezervarea (manager/admin)
    private Long approvedBy;

    public Booking() {}

    public Booking(BookableObject object, User user, LocalDateTime startTime, LocalDateTime endTime, String type, String status) {
        this.object = object;
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.type = type;
        this.status = status;
    }

    // Getters și Setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public BookableObject getObject() { return object; }
    public void setObject(BookableObject object) { this.object = object; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getApprovedBy() { return approvedBy; }
    public void setApprovedBy(Long approvedBy) { this.approvedBy = approvedBy; }
}
