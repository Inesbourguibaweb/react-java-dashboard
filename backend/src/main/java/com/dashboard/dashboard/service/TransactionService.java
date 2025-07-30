package com.dashboard.dashboard.service;

import com.dashboard.dashboard.dto.GlobalTransactionSummary;
import com.dashboard.dashboard.model.Transaction;
import com.dashboard.dashboard.repository.TransactionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository repo;

    public List<Transaction> findAll() {
        return repo.findAll();
    }

    public Transaction save(Transaction t) {
        return repo.save(t);
    }

    public List<Transaction> findByClientId(String clientId) {
        return repo.findByClientId(clientId);
    }

    public List<Transaction> findByClientIdAndPayee(String clientId, boolean payee) {
        return repo.findByClientIdAndPayee(clientId, payee);
    }

    public List<Transaction> findByPayee(boolean payee) {
        return repo.findByPayee(payee);
    }

    public GlobalTransactionSummary getGlobalSummary() {
        List<Transaction> all = findAll();
        double total = all.stream().mapToDouble(Transaction::getMontant).sum();
        double totalPayee = all.stream().filter(Transaction::isPayee).mapToDouble(Transaction::getMontant).sum();
        double totalNonPayee = total - totalPayee;
        return new GlobalTransactionSummary(total, totalPayee, totalNonPayee);
    }
}
