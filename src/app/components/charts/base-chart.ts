import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild, effect, afterNextRender } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-base-chart',
  template: `
    <div class="relative h-64 w-full">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseChart {
  config = input.required<ChartConfiguration>();
  canvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');
  
  private chart?: Chart;

  constructor() {
    afterNextRender(() => {
      this.initChart();
    });

    effect(() => {
      const config = this.config();
      if (this.chart) {
        this.chart.data = config.data;
        if (config.options) {
          this.chart.options = config.options;
        }
        this.chart.update();
      }
    });
  }

  private initChart() {
    const canvasEl = this.canvas()?.nativeElement;
    if (canvasEl) {
      this.chart = new Chart(canvasEl, this.config());
    }
  }
}
