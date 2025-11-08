package com.example.spring_boot_docker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "desks")
public class Desk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deskId;

    private String deskNumber;

    // Relație 1:1 cu BookableObject (un birou e un singur obiect rezervabil)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "object_id", nullable = false, unique = true)
    private BookableObject object;

    public Desk() {}

    public Desk(String deskNumber, BookableObject object) {
        this.deskNumber = deskNumber;
        this.object = object;
    }

    // Getters și Setters
    public Long getDeskId() { return deskId; }
    public void setDeskId(Long deskId) { this.deskId = deskId; }

    public String getDeskNumber() { return deskNumber; }
    public void setDeskNumber(String deskNumber) { this.deskNumber = deskNumber; }

    public BookableObject getObject() { return object; }
    public void setObject(BookableObject object) { this.object = object; }
}

