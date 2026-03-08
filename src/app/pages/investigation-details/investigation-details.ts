import { ChangeDetectionStrategy, Component, inject, computed, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlertService } from '../../services/alert.service';
import { SeverityBadge } from '../../components/severity-badge/severity-badge';
import { StatusChip } from '../../components/status-chip/status-chip';
import { MetricCard } from '../../components/metric-card/metric-card';
import { InvestigationNodeCard } from '../../components/investigation-node-card/investigation-node-card';
import { TimelineItemComponent } from '../../components/timeline-item/timeline-item';
import { Alert, Entity, Status } from '../../models/alert.model';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-investigation-details',
  imports: [CommonModule, SeverityBadge, StatusChip, MetricCard, InvestigationNodeCard, TimelineItemComponent, DatePipe, FormsModule],
  templateUrl: './investigation-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestigationDetailsPage {
  private readonly alertService = inject(AlertService);
  private readonly route = inject(ActivatedRoute);

  readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' }
  );

  readonly alert = computed(() => this.alertService.getAlertById(this.id()));
  readonly entities = computed(() => this.alertService.getEntitiesForAlert(this.id()));
  readonly timeline = computed(() => this.alertService.getTimelineForAlert(this.id()));

  readonly selectedEntity = signal<Entity | null>(null);
  readonly noteText = signal('');
  readonly notes = signal<{text: string, date: Date, author: string}[]>([]);

  selectEntity(entity: Entity) {
    this.selectedEntity.set(entity);
  }

  addNote() {
    if (!this.noteText().trim()) return;
    this.notes.update(n => [{
      text: this.noteText(),
      date: new Date(),
      author: 'Max (Analyst)'
    }, ...n]);
    this.noteText.set('');
  }

  updateStatus(status: Status) {
    const alert = this.alert();
    if (alert) {
      this.alertService.updateAlertStatus(alert.id, status);
    }
  }
}
