package com.healthdeclaration.entities.dto;

import com.healthdeclaration.entities.DeclarationDetails;
import com.healthdeclaration.util.enumeration.EnumPattern;
import com.healthdeclaration.util.enumeration.PathologicalStatus;
import com.healthdeclaration.util.enumeration.PathologicalType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PathologicalDto {

    private Integer id;

    @NotEmpty(message = "Name must be not empty")
    private String name;

    @NotEmpty(message = "Description must be not empty")
    private String description;

    @NotNull(message = "Type must be not null")
    @EnumPattern(name = "type", regexp = "INFECTIOUS|SKIN_DISEASE|CHRONIC")
    private PathologicalType type;

    @NotNull(message = "Status must be not null")
    @EnumPattern(name = "status", regexp = "ENDEMIC|NORMAL|RARE|NEW_DISEASE|EPIDEMIC|PANDEMIC|ERADICATED")
    private PathologicalStatus status;

    private List<DeclarationDetails> declarationDetails;

    public PathologicalDto(Integer id, String name, String description, PathologicalType type, PathologicalStatus status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.status = status;
    }
}
