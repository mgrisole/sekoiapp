import { Routes } from '@angular/router';
import { AlertsListPage } from './pages/alerts-list/alerts-list';
import { InvestigationDetailsPage } from './pages/investigation-details/investigation-details';
import { MetricsDashboardPage } from './pages/metrics-dashboard/metrics-dashboard';
import { ComponentLibraryPage } from './pages/component-library/component-library';

export const routes: Routes = [
  { path: '', redirectTo: 'alerts', pathMatch: 'full' },
  { path: 'alerts', component: AlertsListPage },
  { path: 'investigation/:id', component: InvestigationDetailsPage },
  { path: 'metrics', component: MetricsDashboardPage },
  { path: 'components', component: ComponentLibraryPage },
];
