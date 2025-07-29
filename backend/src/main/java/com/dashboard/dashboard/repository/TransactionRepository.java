package com.dashboard.dashboard.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dashboard.dashboard.model.Transaction;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByClientId(String clientId);
    List<Transaction> findByClientIdAndPayee(String clientId, boolean payee);
    List<Transaction> findByPayee(boolean payee);
}
