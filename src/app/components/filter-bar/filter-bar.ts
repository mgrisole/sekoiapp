import { ChangeDetectionStrategy, Component, input, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-wrap items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-sm mb-6">
      <div class="flex-1 min-w-[200px] relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input 
          type="text" 
          [(ngModel)]="search" 
          placeholder="Search alerts..." 
          aria-label="Search alerts"
          class="w-full bg-gray-800 border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500"
        >
      </div>
      
      <div class="flex items-center gap-2">
        <label for="severity-filter" class="text-sm font-medium text-gray-400 uppercase tracking-wider">Severity</label>
        <select 
          id="severity-filter"
          [(ngModel)]="severity" 
          class="bg-gray-800 border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
          <option value="Info">Info</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <label for="status-filter" class="text-sm font-medium text-gray-400 uppercase tracking-wider">Status</label>
        <select 
          id="status-filter"
          [(ngModel)]="status" 
          class="bg-gray-800 border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
          <option value="False Positive">False Positive</option>
        </select>
      </div>

      <button (click)="reset.emit()" class="text-sm font-medium text-gray-500 hover:text-white transition-colors">
        Reset filters
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBar {
  search = model<string>('');
  severity = model<string>('All');
  status = model<string>('All');
  reset = output<void>();
}
