package com.dashboard.dashboard.model;

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

    private String nom;

    private String email;

    private String role;
}
