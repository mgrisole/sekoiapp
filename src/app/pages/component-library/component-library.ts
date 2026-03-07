import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeverityBadge } from '../../components/severity-badge/severity-badge';
import { StatusChip } from '../../components/status-chip/status-chip';
import { MetricCard } from '../../components/metric-card/metric-card';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LoadingState } from '../../components/loading-state/loading-state';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { InvestigationNodeCard } from '../../components/investigation-node-card/investigation-node-card';
import { TimelineItemComponent } from '../../components/timeline-item/timeline-item';

@Component({
  selector: 'app-component-library',
  imports: [
    CommonModule, 
    SeverityBadge, 
    StatusChip, 
    MetricCard, 
    EmptyState, 
    LoadingState, 
    FilterBar, 
    InvestigationNodeCard,
    TimelineItemComponent
  ],
  templateUrl: './component-library.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentLibraryPage {
  mockEntity = { id: '1', type: 'IP' as const, name: '10.0.0.1', metadata: { hostname: 'APP-SERVER-01' } };
  mockTimelineItem = { id: '1', type: 'EVENT', timestamp: new Date(), message: 'Suspicious login detected from internal network' };
}
