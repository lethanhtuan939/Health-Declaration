package com.healthdeclaration.entities;

import com.healthdeclaration.util.enumeration.NotificationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_notification")
public class Notification extends AbstractEntity<Integer> {

    private String content;

    @Column(name = "posting_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date postingDate;

    private NotificationStatus status;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "notification")
    private List<NotificationDetails> notificationDetails;
}
