package com.dashboard.dashboard.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Represents a client")
public class Client {
    @Id
    @Schema(description = "Unique identifier of the client")
    private String id;

    @NotBlank(message = "Name is mandatory")
    @Schema(description = "Name of the client", example = "John Doe")
    private String nom;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    @Schema(description = "Email of the client", example = "john.doe@example.com")
    private String email;

    @Schema(description = "Phone number of the client", example = "+1234567890")
    private String telephone;
}
