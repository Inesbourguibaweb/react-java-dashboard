package com.dashboard.dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import com.dashboard.dashboard.dto.ClientTransactionSummary;
import com.dashboard.dashboard.dto.GlobalTransactionSummary;
import com.dashboard.dashboard.model.Transaction;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dashboard.dashboard.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@Tag(name = "Transaction", description = "Transaction management APIs")
public class TransactionController {
    private final TransactionService service;

    @Operation(summary = "Get all transactions", description = "Returns a list of all transactions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping
    public List<Transaction> getAll() {
        return service.findAll();
    }

    @Operation(summary = "Create a new transaction", description = "Creates a new transaction and returns the created transaction")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully created"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public Transaction create(@Valid @RequestBody Transaction transaction) {
        return service.save(transaction);
    }

    @Operation(summary = "Get all paid transactions", description = "Returns a list of all paid transactions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping("/payee")
    public List<Transaction> getPayees() {
        return service.findByPayee(true);
    }

    @Operation(summary = "Get all unpaid transactions", description = "Returns a list of all unpaid transactions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping("/non-payee")
    public List<Transaction> getNonPayees() {
        return service.findByPayee(false);
    }

    @Operation(summary = "Get all transactions for a client", description = "Returns a list of all transactions for a given client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping("/client/{clientId}")
    public List<Transaction> getByClient(@PathVariable String clientId) {
        return service.findByClientId(clientId);
    }

    @Operation(summary = "Get all paid transactions for a client", description = "Returns a list of all paid transactions for a given client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping("/client/{clientId}/payee")
    public List<Transaction> getPayeeByClient(@PathVariable String clientId) {
        return service.findByClientIdAndPayee(clientId, true);
    }

    @Operation(summary = "Get all unpaid transactions for a client", description = "Returns a list of all unpaid transactions for a given client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping("/client/{clientId}/non-payee")
    public List<Transaction> getNonPayeeByClient(@PathVariable String clientId) {
        return service.findByClientIdAndPayee(clientId, false);
    }

    @Operation(summary = "Get a summary of transactions for a client", description = "Returns a summary of transactions for a given client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping("/client/{clientId}/summary")
    public ClientTransactionSummary getClientSummary(@PathVariable String clientId) {
        List<Transaction> all = service.findByClientId(clientId);

        double total = all.stream().mapToDouble(Transaction::getMontant).sum();
        double totalPayee = all.stream().filter(Transaction::isPayee).mapToDouble(Transaction::getMontant).sum();
        double totalNonPayee = total - totalPayee;

        return new ClientTransactionSummary(clientId, total, totalPayee, totalNonPayee);
    }

    @Operation(summary = "Get a global summary of all transactions", description = "Returns a global summary of all transactions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping("/summary")
    public GlobalTransactionSummary getGlobalSummary() {
        return service.getGlobalSummary();
    }
}
