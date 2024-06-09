package com.healthdeclaration.entities;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_declaration_details")
public class DeclarationDetails extends AbstractEntity<Integer> {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "notification_id")
    private Declaration declaration;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pathological_id")
    private Pathological pathological;
}
