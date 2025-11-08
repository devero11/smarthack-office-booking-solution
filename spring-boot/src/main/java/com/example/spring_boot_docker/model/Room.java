package com.example.spring_boot_docker.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(nullable = false)
    private String name;

    private Integer capacity;
    private String roomType;
    private String requiredRole;
    private String description;

    // Relație 1:N cu BookableObject
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<BookableObject> objects;

    // Relație 1:N cu SpecialEvent
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<SpecialEvent> events;

    public Room() {}

    public Room(String name, Integer capacity, String roomType) {
        this.name = name;
        this.capacity = capacity;
        this.roomType = roomType;
    }

    // Getters & Setters
    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public String getRequiredRole() { return requiredRole; }
    public void setRequiredRole(String requiredRole) { this.requiredRole = requiredRole; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<BookableObject> getObjects() { return objects; }
    public void setObjects(List<BookableObject> objects) { this.objects = objects; }

    public List<SpecialEvent> getEvents() { return events; }
    public void setEvents(List<SpecialEvent> events) { this.events = events; }
}
