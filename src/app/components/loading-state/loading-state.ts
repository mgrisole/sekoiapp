import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `
    <div class="flex flex-col items-center justify-center p-12 text-center">
      <div class="relative w-16 h-16 mb-4">
        <div class="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">{{ message() }}</h3>
      <p class="text-gray-400">Please wait while we fetch the latest data.</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingState {
  message = input<string>('Loading...');
}
