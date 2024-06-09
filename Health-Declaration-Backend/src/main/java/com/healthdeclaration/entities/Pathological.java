package com.healthdeclaration.entities;

import com.healthdeclaration.util.enumeration.PathologicalStatus;
import com.healthdeclaration.util.enumeration.PathologicalType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_pathological")
public class Pathological extends AbstractEntity<Integer> {

    private String name;

    @Lob
    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private PathologicalType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PathologicalStatus status;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "pathological")
    private List<DeclarationDetails> declarationDetails;
}
