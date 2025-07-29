package com.dashboard.dashboard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dashboard.dashboard.model.Collaborateur;

@Repository
public interface CollaborateurRepository extends MongoRepository<Collaborateur, String> {}
