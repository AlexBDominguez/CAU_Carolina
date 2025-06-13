package com.cau.dashboard.service;

import com.cau.dashboard.model.Agent;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class CrmService {

    private final RestTemplate restTemplate;
    private final String USERS_API_URL = "https://jsonplaceholder.typicode.com/users";
    private final List<Agent> agentsInMemo = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(10);

    public CrmService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostConstruct
    public void init() {
        Agent[] initialAgents = restTemplate.getForObject(USERS_API_URL, Agent[].class);
        if (initialAgents != null) {
            Random random = new Random();
            this.agentsInMemo.addAll(Arrays.stream(initialAgents).peek(agent -> {
                agent.setStatus(random.nextBoolean() ? "Active" : "Inactive");
            }).collect(Collectors.toList()));
        }
    }

    public List<Agent> getAgents() {
        return new ArrayList<>(agentsInMemo); // Return a copy
    }

    public Agent addAgent(Agent agent) {
        agent.setId(idCounter.incrementAndGet());
        agent.setStatus("Active"); // Default status
        agentsInMemo.add(agent);
        return agent;
    }

    public void deleteAgent(Long id) {
        agentsInMemo.removeIf(agent -> agent.getId().equals(id));
    }

    public Agent updateAgentStatus(Long id, String newStatus) {
        return agentsInMemo.stream()
                .filter(agent -> agent.getId().equals(id))
                .findFirst()
                .map(agent -> {
                    agent.setStatus(newStatus);
                    return agent;
                })
                .orElse(null);
    }
}
