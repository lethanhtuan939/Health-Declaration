package com.healthdeclaration.entities;

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
@Table(name = "tbl_declaration")
public class Declaration extends AbstractEntity<Integer> {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String schedule;

    private String symptom;

    @Column(name = "declaration_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date declarationTime;

    private String proof;

    @ManyToOne
    @JoinColumn(name = "declarant_id")
    private User declarant;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "declaration")
    private List<DeclarationDetails> declarationDetails;
}
