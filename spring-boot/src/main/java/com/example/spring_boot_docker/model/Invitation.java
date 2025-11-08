package com.example.spring_boot_docker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "invitations")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invitationId;

    private String status; // "Pending", "Accepted", "Declined"
    private String message;

    // Evenimentul la care se face invitația
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private SpecialEvent event;

    // User care trimite invitația
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_user_id", nullable = false)
    private User sender;

    // User care primește invitația
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invited_user_id", nullable = false)
    private User receiver;

    public Invitation() {}

    public Invitation(SpecialEvent event, User sender, User receiver, String status) {
        this.event = event;
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
    }

    // Getters și Setters
    public Long getInvitationId() { return invitationId; }
    public void setInvitationId(Long invitationId) { this.invitationId = invitationId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public SpecialEvent getEvent() { return event; }
    public void setEvent(SpecialEvent event) { this.event = event; }

    public User getSender() { return sender; }
    public void setSender(User sender) { this.sender = sender; }

    public User getReceiver() { return receiver; }
    public void setReceiver(User receiver) { this.receiver = receiver; }
}
