package com.example.spring_boot_docker.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "objects")
public class BookableObject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long objectId;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "object_type_name", nullable = false)
    private ObjectType objectType;

    private Boolean isBookable;
    private String description;

    @OneToMany(mappedBy = "object", fetch = FetchType.LAZY)
    private List<Booking> bookings;

    public BookableObject() {}

    public BookableObject(String name, Room room, ObjectType objectType) {
        this.name = name;
        this.room = room;
        this.objectType = objectType;
    }

    // Getters & Setters
    public Long getObjectId() { return objectId; }
    public void setObjectId(Long objectId) { this.objectId = objectId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }

    public ObjectType getObjectType() { return objectType; }
    public void setObjectType(ObjectType objectType) { this.objectType = objectType; }

    public Boolean getIsBookable() { return isBookable; }
    public void setIsBookable(Boolean isBookable) { this.isBookable = isBookable; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<Booking> getBookings() { return bookings; }
    public void setBookings(List<Booking> bookings) { this.bookings = bookings; }
}
