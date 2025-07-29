package com.dashboard.dashboard.service;

import com.dashboard.dashboard.model.Collaborateur;
import com.dashboard.dashboard.repository.CollaborateurRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CollaborateurService {

    private final CollaborateurRepository collabRepo;

    public List<Collaborateur> findAll() {
        return collabRepo.findAll();
    }

    public Collaborateur save(Collaborateur collab) {
        return collabRepo.save(collab);
    }
}
