import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Entity } from '../../models/alert.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investigation-node-card',
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-md w-48 group hover:border-blue-500 transition-colors">
      <div class="flex items-center gap-2 mb-2">
        <span class="p-1.5 rounded bg-gray-900 text-gray-400 group-hover:text-blue-400 transition-colors">
          @switch (entity().type) {
            @case ('IP') { <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg> }
            @case ('Domain') { <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> }
            @case ('User') { <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> }
            @case ('Process') { <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><polyline points="12 4 12 20"></polyline></svg> }
          }
        </span>
        <span class="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{{ entity().type }}</span>
      </div>
      <div class="text-sm font-medium text-white truncate" [title]="entity().name">{{ entity().name }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestigationNodeCard {
  entity = input.required<Entity>();
}
