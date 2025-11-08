package com.example.spring_boot_docker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "special_events")
public class SpecialEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @Column(nullable = false)
    private String eventName;

    private String description;
    private Boolean isPublic;
    private Integer capacity;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    // Creatorul evenimentului
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User creator;

    // Sala unde are loc evenimentul
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    // Lista de invitații la eveniment
    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    private List<Invitation> invitations;

    public SpecialEvent() {}

    public SpecialEvent(String eventName, LocalDateTime startTime, LocalDateTime endTime, User creator, Room room) {
        this.eventName = eventName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.creator = creator;
        this.room = room;
    }

    // Getters și Setters
    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public User getCreator() { return creator; }
    public void setCreator(User creator) { this.creator = creator; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }

    public List<Invitation> getInvitations() { return invitations; }
    public void setInvitations(List<Invitation> invitations) { this.invitations = invitations; }
}
