package com.dashboard.dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dashboard.dashboard.model.Client;
import com.dashboard.dashboard.service.ClientService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService service ;

    @GetMapping
    public List<Client> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Client create(@RequestBody Client client) {
        return service.save(client);
    }
}

