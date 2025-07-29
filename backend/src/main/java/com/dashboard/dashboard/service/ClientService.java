package com.dashboard.dashboard.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.dashboard.dashboard.model.Client;
import com.dashboard.dashboard.repository.ClientRepository;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepo;

    public List<Client> findAll() {
        return clientRepo.findAll();
    }

    public Client save(Client client) {
        return clientRepo.save(client);
    }
}
