package com.dashboard.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GlobalTransactionSummary {
    private double total;
    private double totalPayee;
    private double totalNonPayee;
}
