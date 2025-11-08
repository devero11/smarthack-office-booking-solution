package com.example.spring_boot_docker.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "object_types")
public class ObjectType {

    @Id
    @Column(name = "type_name")
    private String typeName;

    private String description;
    private Boolean requiresApproval;
    private Boolean isBookable;

    // Relație 1:N — un tip de obiect are mai multe obiecte asociate
    @OneToMany(mappedBy = "objectType", fetch = FetchType.LAZY)
    private List<BookableObject> objects;

    public ObjectType() {}

    public ObjectType(String typeName, String description, Boolean requiresApproval, Boolean isBookable) {
        this.typeName = typeName;
        this.description = description;
        this.requiresApproval = requiresApproval;
        this.isBookable = isBookable;
    }

    public String getTypeName() { return typeName; }
    public void setTypeName(String typeName) { this.typeName = typeName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getRequiresApproval() { return requiresApproval; }
    public void setRequiresApproval(Boolean requiresApproval) { this.requiresApproval = requiresApproval; }

    public Boolean getIsBookable() { return isBookable; }
    public void setIsBookable(Boolean isBookable) { this.isBookable = isBookable; }

    public List<BookableObject> getObjects() { return objects; }
    public void setObjects(List<BookableObject> objects) { this.objects = objects; }
}
