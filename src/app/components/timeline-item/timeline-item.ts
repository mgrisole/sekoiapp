import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineItem } from '../../models/alert.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-timeline-item',
  imports: [CommonModule, DatePipe],
  template: `
    <div class="flex gap-4 relative pb-6 last:pb-0">
      <div class="absolute left-[11px] top-6 bottom-0 w-px bg-gray-800 last:hidden"></div>
      <div class="z-10 mt-1.5 h-[24px] w-[24px] rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center text-gray-400">
         <div class="h-2 w-2 rounded-full bg-blue-500"></div>
      </div>
      <div class="flex-1">
        <div class="flex justify-between items-start mb-1">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ item().type }}</span>
          <span class="text-xs text-gray-500">{{ item().timestamp | date:'HH:mm:ss' }}</span>
        </div>
        <p class="text-sm text-gray-300">{{ item().message }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineItemComponent {
  item = input.required<TimelineItem>();
}
