package com.dashboard.dashboard.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Represents a transaction")
public class Transaction {

    @Id
    @Schema(description = "Unique identifier of the transaction")
    private String id;

    @NotNull(message = "Date is mandatory")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Schema(description = "Date of the transaction", example = "2023-01-01")
    private LocalDate date;

    @NotNull(message = "Amount is mandatory")
    @Schema(description = "Amount of the transaction", example = "100.50")
    private double montant;

    @Schema(description = "Indicates if the transaction is paid or not", example = "true")
    private boolean payee;

    @NotBlank(message = "Client ID is mandatory")
    @Schema(description = "ID of the client associated with the transaction")
    private String clientId;

    @NotBlank(message = "Collaborator ID is mandatory")
    @Schema(description = "ID of the collaborator associated with the transaction")
    private String collaborateurId;
}
