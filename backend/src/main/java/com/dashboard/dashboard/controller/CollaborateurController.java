package com.dashboard.dashboard.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dashboard.dashboard.model.Collaborateur;
import com.dashboard.dashboard.service.CollaborateurService;

@RestController
@RequestMapping("/api/collaborateurs")
public class CollaborateurController {
    
    private final CollaborateurService service;
    
   
    public CollaborateurController(CollaborateurService service) {
        this.service = service;
    }
    
    @GetMapping
    public List<Collaborateur> getAll() {
        return service.findAll();
    }
    
    @PostMapping
    public Collaborateur create(@RequestBody Collaborateur collab) {
        return service.save(collab);
    }
}