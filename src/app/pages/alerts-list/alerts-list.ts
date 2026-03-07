import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { SeverityBadge } from '../../components/severity-badge/severity-badge';
import { StatusChip } from '../../components/status-chip/status-chip';
import { Severity, Status, Alert } from '../../models/alert.model';

import { FilterBar } from '../../components/filter-bar/filter-bar';

@Component({
  selector: 'app-alerts-list',
  imports: [CommonModule, FormsModule, SeverityBadge, StatusChip, DatePipe, FilterBar],
  templateUrl: './alerts-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsListPage {
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);

  readonly searchTerm = signal('');
  readonly severityFilter = signal<string>('All');
  readonly statusFilter = signal<string>('All');
  readonly sortField = signal<keyof Alert>('creationDate');
  readonly sortOrder = signal<'asc' | 'desc'>('desc');

  readonly filteredAlerts = computed(() => {
    let alerts = this.alertService.allAlerts();

    // Search
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      alerts = alerts.filter(a => 
        a.title.toLowerCase().includes(term) || 
        a.description.toLowerCase().includes(term) ||
        a.source.toLowerCase().includes(term)
      );
    }

    // Filter by severity
    if (this.severityFilter() !== 'All') {
      alerts = alerts.filter(a => a.severity === this.severityFilter());
    }

    // Filter by status
    if (this.statusFilter() !== 'All') {
      alerts = alerts.filter(a => a.status === this.statusFilter());
    }

    // Sort
    const field = this.sortField();
    const order = this.sortOrder();
    
    return [...alerts].sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      
      if (valA! < valB!) return order === 'asc' ? -1 : 1;
      if (valA! > valB!) return order === 'asc' ? 1 : -1;
      return 0;
    });
  });

  updateSort(field: keyof Alert) {
    if (this.sortField() === field) {
      this.sortOrder.update(o => o === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortOrder.set('desc');
    }
  }

  resetFilters() {
    this.searchTerm.set('');
    this.severityFilter.set('All');
    this.statusFilter.set('All');
  }

  openInvestigation(alert: Alert) {
    this.router.navigate(['/investigation', alert.id]);
  }
}
