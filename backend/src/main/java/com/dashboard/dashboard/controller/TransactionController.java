package com.dashboard.dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dashboard.dashboard.model.Transaction;
import com.dashboard.dashboard.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService service;

    @GetMapping
    public List<Transaction> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Transaction create(@RequestBody Transaction t) {
        return service.save(t);
    }

    @GetMapping("/payee")
    public List<Transaction> getPayees() {
        return service.findByPayee(true);
    }

    @GetMapping("/non-payee")
    public List<Transaction> getNonPayees() {
        return service.findByPayee(false);
    }

    @GetMapping("/client/{clientId}")
    public List<Transaction> getByClient(@PathVariable String clientId) {
        return service.findByClientId(clientId);
    }

    @GetMapping("/client/{clientId}/payee")
    public List<Transaction> getPayeeByClient(@PathVariable String clientId) {
        return service.findByClientIdAndPayee(clientId, true);
    }

    @GetMapping("/client/{clientId}/non-payee")
    public List<Transaction> getNonPayeeByClient(@PathVariable String clientId) {
        return service.findByClientIdAndPayee(clientId, false);
    }

    @GetMapping("/client/{clientId}/summary")
    public ClientTransactionSummary getClientSummary(@PathVariable String clientId) {
        List<Transaction> all = service.findByClientId(clientId);

        double total = all.stream().mapToDouble(Transaction::getMontant).sum();
        double totalPayee = all.stream().filter(Transaction::isPayee).mapToDouble(Transaction::getMontant).sum();
        double totalNonPayee = total - totalPayee;

        return new ClientTransactionSummary(clientId, total, totalPayee, totalNonPayee);
    }
}

