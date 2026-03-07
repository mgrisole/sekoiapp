import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { BaseChart } from '../../components/charts/base-chart';
import { MetricCard } from '../../components/metric-card/metric-card';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-metrics-dashboard',
  imports: [CommonModule, BaseChart, MetricCard],
  templateUrl: './metrics-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricsDashboardPage {
  private readonly alertService = inject(AlertService);

  readonly severityChartConfig = computed<ChartConfiguration>(() => {
    const counts = this.alertService.countsBySeverity();
    return {
      type: 'doughnut',
      data: {
        labels: Object.keys(counts),
        datasets: [{
          data: Object.values(counts),
          backgroundColor: [
            '#ef4444', // Critical - red-500
            '#f97316', // High - orange-500
            '#eab308', // Medium - yellow-500
            '#3b82f6', // Low - blue-500
            '#6b7280'  // Info - gray-500
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#9ca3af', usePointStyle: true, padding: 20 }
          }
        }
      }
    };
  });

  readonly statusChartConfig = computed<ChartConfiguration>(() => {
    const counts = this.alertService.countsByStatus();
    return {
      type: 'bar',
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Alerts',
          data: Object.values(counts),
          backgroundColor: '#3b82f6',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { 
            beginAtZero: true, 
            grid: { color: '#1f2937' },
            ticks: { color: '#9ca3af' }
          },
          x: { 
            grid: { display: false },
            ticks: { color: '#9ca3af' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    };
  });

  readonly timeChartConfig = computed<ChartConfiguration>(() => {
    return {
      type: 'line',
      data: {
        labels: ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7'],
        datasets: [{
          label: 'Alert Volume',
          data: [12, 19, 15, 8, 22, 14, 18],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { 
            beginAtZero: true, 
            grid: { color: '#1f2937' },
            ticks: { color: '#9ca3af' }
          },
          x: { 
            grid: { display: false },
            ticks: { color: '#9ca3af' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    };
  });
}
