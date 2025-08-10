package com.dashboard.dashboard.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dashboard.dashboard.model.Collaborateur;
import com.dashboard.dashboard.service.CollaborateurService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/collaborateurs")
@RequiredArgsConstructor
@Tag(name = "Collaborateur", description = "Collaborateur management APIs")
public class CollaborateurController {

    private final CollaborateurService service;

    @Operation(summary = "Get all collaborateurs", description = "Returns a list of all collaborateurs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    })
    @GetMapping
    public List<Collaborateur> getAll() {
        return service.findAll();
    }

    @Operation(summary = "Create a new collaborateur", description = "Creates a new collaborateur and returns the created collaborateur")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully created"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public Collaborateur create(@Valid @RequestBody Collaborateur collab) {
        return service.save(collab);
    }
}
