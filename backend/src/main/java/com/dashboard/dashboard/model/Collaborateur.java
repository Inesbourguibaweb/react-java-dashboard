package com.dashboard.dashboard.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "collaborateurs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Represents a collaborateur")
public class Collaborateur {

    @Id
    @Schema(description = "Unique identifier of the collaborateur")
    private String id;

    @NotBlank(message = "Name is mandatory")
    @Schema(description = "Name of the collaborateur", example = "Jane Doe")
    private String nom;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    @Schema(description = "Email of the collaborateur", example = "jane.doe@example.com")
    private String email;

    @NotBlank(message = "Role is mandatory")
    @Schema(description = "Role of the collaborateur", example = "Developer")
    private String role;
}
