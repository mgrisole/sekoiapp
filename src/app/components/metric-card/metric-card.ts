import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  template: `
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm">
      <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">{{ label() }}</h3>
      <div class="flex items-end justify-between">
        <div class="text-2xl font-bold text-white">{{ value() }}</div>
        @if (change() !== undefined) {
          <div [class]="changeClasses()" class="text-xs font-semibold px-2 py-1 rounded">
            {{ change()! > 0 ? '+' : '' }}{{ change() }}%
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricCard {
  label = input.required<string>();
  value = input.required<string | number>();
  change = input<number>();

  protected changeClasses() {
    const val = this.change();
    if (val === undefined) return '';
    return val >= 0 ? 'bg-green-900/20 text-green-500' : 'bg-red-900/20 text-red-500';
  }
}
