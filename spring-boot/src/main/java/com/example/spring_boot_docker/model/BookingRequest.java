
package com.example.spring_boot_docker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

public class BookingRequest {
  
  public String token;

  public Long[] chairs;
  public Long[] userIDs;
  public LocalDateTime startTime;
  public LocalDateTime endTime;
  public String type;
  public String title;
  public String description;

}
