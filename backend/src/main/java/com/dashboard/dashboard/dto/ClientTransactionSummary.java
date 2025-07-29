package com.dashboard.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientTransactionSummary {
    private String clientId;
    private double total;
    private double totalPayee;
    private double totalNonPayee;
    
}
