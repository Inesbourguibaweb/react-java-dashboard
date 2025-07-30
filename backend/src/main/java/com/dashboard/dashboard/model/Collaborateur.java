package com.dashboard.dashboard.model;

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
public class Collaborateur {

    @Id
    private String id;

    @NotBlank(message = "Name is mandatory")
    private String nom;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Role is mandatory")
    private String role;
}
