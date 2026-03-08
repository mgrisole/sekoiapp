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
import { FFlowModule } from '@foblex/flow';

interface FlowPosition {
  x: number;
  y: number;
}

interface InvestigationFlowRootNode {
  id: string;
  outputId: string;
  position: FlowPosition;
}

interface InvestigationFlowEntityNode {
  id: string;
  inputId: string;
  entity: Entity;
  position: FlowPosition;
}

interface InvestigationFlowConnection {
  id: string;
  outputId: string;
  inputId: string;
}

@Component({
  selector: 'app-investigation-details',
  imports: [CommonModule, SeverityBadge, StatusChip, MetricCard, InvestigationNodeCard, TimelineItemComponent, DatePipe, FormsModule, FFlowModule],
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
  readonly rootNode = computed<InvestigationFlowRootNode | null>(() => {
    const alert = this.alert();
    if (!alert) return null;

    const entityCount = this.entities().length;
    const columns = Math.min(Math.max(entityCount, 1), 3);
    const rowWidth = (columns - 1) * 280;

    return {
      id: `alert-node-${alert.id}`,
      outputId: `alert-output-${alert.id}`,
      position: {
        x: 120 + rowWidth / 2,
        y: 56
      }
    };
  });
  readonly entityNodes = computed<InvestigationFlowEntityNode[]>(() =>
    this.entities().map((entity, index) => ({
      id: `entity-node-${entity.id}`,
      inputId: `entity-input-${entity.id}`,
      entity,
      position: this.getEntityNodePosition(index)
    }))
  );
  readonly graphConnections = computed<InvestigationFlowConnection[]>(() => {
    const rootNode = this.rootNode();
    if (!rootNode) return [];

    const connections = this.entityNodes().map((node) => ({
      id: `connection-${rootNode.id}-${node.id}`,
      outputId: rootNode.outputId,
      inputId: node.inputId
    }));
    console.log(connections)

    return connections;
  });

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

  private getEntityNodePosition(index: number): FlowPosition {
    const columns = 3;
    const row = Math.floor(index / columns);
    const column = index % columns;

    return {
      x: 120 + column * 280,
      y: 200 + row * 120
    };
  }
}
