import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { Severity } from '../../models/alert.model';

@Component({
  selector: 'app-severity-badge',
  template: `
    <span 
      [class]="badgeClasses()"
      class="px-2.5 py-0.5 rounded-full text-xs font-medium border"
    >
      {{ severity() }}
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeverityBadge {
  severity = input.required<Severity>();

  badgeClasses = computed(() => {
    switch (this.severity()) {
      case 'Critical': return 'bg-red-900/20 text-red-500 border-red-900/30';
      case 'High': return 'bg-orange-900/20 text-orange-500 border-orange-900/30';
      case 'Medium': return 'bg-yellow-900/20 text-yellow-500 border-yellow-900/30';
      case 'Low': return 'bg-blue-900/20 text-blue-500 border-blue-900/30';
      case 'Info': return 'bg-gray-800 text-gray-400 border-gray-700';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  });
}
