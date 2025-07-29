package com.dashboard.dashboard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.dashboard.dashboard.model.Client;

@Repository
public interface ClientRepository extends MongoRepository<Client, String> {
  
}
