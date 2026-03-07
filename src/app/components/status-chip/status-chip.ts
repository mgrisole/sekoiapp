import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { Status } from '../../models/alert.model';

@Component({
  selector: 'app-status-chip',
  template: `
    <span 
      [class]="chipClasses()"
      class="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border"
    >
      {{ status() }}
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusChip {
  status = input.required<Status>();

  chipClasses = computed(() => {
    switch (this.status()) {
      case 'New': return 'bg-purple-900/10 text-purple-400 border-purple-900/30';
      case 'In Progress': return 'bg-blue-900/10 text-blue-400 border-blue-900/30';
      case 'Closed': return 'bg-green-900/10 text-green-400 border-green-900/30';
      case 'False Positive': return 'bg-gray-800 text-gray-400 border-gray-700';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  });
}
