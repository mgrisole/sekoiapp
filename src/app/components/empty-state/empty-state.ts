import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="flex flex-col items-center justify-center p-12 text-center bg-gray-900/50 border border-dashed border-gray-800 rounded-2xl">
      <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">{{ title() }}</h3>
      <p class="text-gray-400 max-w-xs">{{ message() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyState {
  title = input<string>('No data available');
  message = input<string>('There is no information to display at this moment.');
}
