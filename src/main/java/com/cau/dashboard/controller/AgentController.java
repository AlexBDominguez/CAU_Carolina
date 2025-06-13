package com.cau.dashboard.controller;

import com.cau.dashboard.model.Agent;
import com.cau.dashboard.service.CrmService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final CrmService crmService;

    public AgentController(CrmService crmService) {
        this.crmService = crmService;
    }

    @GetMapping
    public List<Agent> getAgents() {
        return crmService.getAgents();
    }

    @PostMapping
    public ResponseEntity<Agent> addAgent(@RequestBody Agent agent) {
        Agent newAgent = crmService.addAgent(agent);
        return new ResponseEntity<>(newAgent, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAgent(@PathVariable Long id) {
        crmService.deleteAgent(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Agent> updateAgentStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        if (newStatus == null || (!newStatus.equals("Active") && !newStatus.equals("Inactive"))) {
            return ResponseEntity.badRequest().build();
        }
        Agent updatedAgent = crmService.updateAgentStatus(id, newStatus);
        if (updatedAgent != null) {
            return ResponseEntity.ok(updatedAgent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
