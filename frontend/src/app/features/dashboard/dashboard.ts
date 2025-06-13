import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { ApiService } from '../../core/services/api.service';
import { Agent } from '../../core/models/agent.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  agents: Agent[] = [];
  newAgent = { name: '', email: '' };
  isDarkMode = false;

  public pieChartOptions: ChartOptions<'pie'> = { responsive: true };
  public pieChartLabels: string[] = ['Activos', 'Inactivos'];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [{ data: [0, 0] }]
  };
  public pieChartType = 'pie' as const;

  constructor(private apiService: ApiService, private renderer: Renderer2) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.apiService.getAgents().subscribe(data => {
      this.agents = data;
      this.updateChart();
    });
  }

  updateChart(): void {
    const active = this.agents.filter(a => a.status === 'Active').length;
    const inactive = this.agents.filter(a => a.status === 'Inactive').length;
    
    // Re-asignar el objeto para forzar la detección de cambios en el gráfico
    this.pieChartData = {
      ...this.pieChartData,
      datasets: [
        { 
          ...this.pieChartData.datasets[0],
          data: [active, inactive] 
        }
      ]
    };
  }

  onAddAgent(): void {
    if (!this.newAgent.name || !this.newAgent.email) return;
    this.apiService.addAgent(this.newAgent).subscribe(addedAgent => {
      this.agents.push(addedAgent);
      this.updateChart();
      this.newAgent = { name: '', email: '' };
    });
  }

  onDeleteAgent(id: number): void {
    this.apiService.deleteAgent(id).subscribe(() => {
      this.agents = this.agents.filter(a => a.id !== id);
      this.updateChart();
    });
  }

  toggleAgentStatus(agent: Agent): void {
    const newStatus = agent.status === 'Active' ? 'Inactive' : 'Active';
    this.apiService.updateAgentStatus(agent.id, newStatus).subscribe({
      next: (updatedAgent) => {
        const index = this.agents.findIndex(a => a.id === updatedAgent.id);
        if (index !== -1) {
          this.agents[index] = updatedAgent;
          this.updateChart();
        }
      },
      error: (err) => console.error('Error al actualizar el estado del agente:', err)
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.renderer.setAttribute(document.body, 'data-theme', theme);
  }

  get activeAgents(): number {
    return this.agents.filter(a => a.status === 'Active').length;
  }

  get inactiveAgents(): number {
    return this.agents.filter(a => a.status === 'Inactive').length;
  }
}
