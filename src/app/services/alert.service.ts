import { Injectable, signal, computed } from '@angular/core';
import { Alert, Severity, Status, Entity, TimelineItem } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly alerts = signal<Alert[]>(generateMockAlerts());
  
  readonly allAlerts = computed(() => this.alerts());
  
  readonly countsBySeverity = computed(() => {
    const counts: Record<Severity, number> = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Info: 0
    };
    this.alerts().forEach(a => counts[a.severity]++);
    return counts;
  });

  readonly countsByStatus = computed(() => {
    const counts: Record<Status, number> = {
      New: 0,
      'In Progress': 0,
      Closed: 0,
      'False Positive': 0
    };
    this.alerts().forEach(a => counts[a.status]++);
    return counts;
  });

  getAlertById(id: string): Alert | undefined {
    return this.alerts().find(a => a.id === id);
  }

  updateAlertStatus(id: string, status: Status) {
    this.alerts.update(alerts => alerts.map(a => a.id === id ? { ...a, status } : a));
  }

  getEntitiesForAlert(alertId: string): Entity[] {
    return [
      { id: 'e1', type: 'IP', name: '192.168.1.105', metadata: { hostname: 'DEV-MACHINE-01' } },
      { id: 'e2', type: 'IP', name: '45.132.22.11', metadata: { location: 'Russia', reputation: 'Malicious' } },
      { id: 'e3', type: 'Domain', name: 'evil-command-and-control.com' },
      { id: 'e4', type: 'User', name: 'j.doe', metadata: { department: 'Engineering' } },
      { id: 'e5', type: 'Process', name: 'powershell.exe', metadata: { pid: '4521' } }
    ];
  }

  getTimelineForAlert(alertId: string): TimelineItem[] {
    const baseDate = new Date();
    return [
      { id: 't1', timestamp: new Date(baseDate.getTime() - 1000 * 60 * 60), type: 'Detection', message: 'Alert triggered from CrowdStrike EDR' },
      { id: 't2', timestamp: new Date(baseDate.getTime() - 1000 * 60 * 50), type: 'Network', message: 'Outbound connection detected to suspicious IP' },
      { id: 't3', timestamp: new Date(baseDate.getTime() - 1000 * 60 * 45), type: 'System', message: 'Encoded powershell command executed' },
      { id: 't4', timestamp: new Date(baseDate.getTime() - 1000 * 60 * 30), type: 'Enrichment', message: 'IP 45.132.22.11 identified as part of Cobalt Strike infra' },
      { id: 't5', timestamp: new Date(baseDate.getTime() - 1000 * 60 * 10), type: 'Assignment', message: 'Alert assigned to Max for investigation' }
    ];
  }
}

function generateMockAlerts(): Alert[] {
  return [
    {
      id: '1',
      title: 'Suspicious PowerShell Execution',
      severity: 'High',
      status: 'New',
      source: 'CrowdStrike',
      creationDate: new Date('2026-03-07T10:00:00Z'),
      assignedAnalyst: 'Max',
      description: 'A PowerShell script was executed with encoded parameters, potentially bypassing security policies.'
    },
    {
      id: '2',
      title: 'Multiple Failed Login Attempts',
      severity: 'Medium',
      status: 'In Progress',
      source: 'Okta',
      creationDate: new Date('2026-03-07T11:15:00Z'),
      assignedAnalyst: 'Alex',
      description: 'An unusually high number of failed login attempts were detected for user j.doe@company.com.'
    },
    {
      id: '3',
      title: 'Potential SQL Injection',
      severity: 'Critical',
      status: 'New',
      source: 'Cloudflare WAF',
      creationDate: new Date('2026-03-07T09:30:00Z'),
      description: 'Multiple requests containing SQL injection patterns were blocked at the edge.'
    },
    {
      id: '4',
      title: 'Outbound Connection to Known Malicious IP',
      severity: 'Critical',
      status: 'Closed',
      source: 'Palo Alto Networks',
      creationDate: new Date('2026-03-06T22:45:00Z'),
      assignedAnalyst: 'Max',
      description: 'A internal server established a connection to an IP address associated with Cobalt Strike C2.'
    },
    {
      id: '5',
      title: 'New Service Created on Domain Controller',
      severity: 'High',
      status: 'New',
      source: 'Microsoft Defender',
      creationDate: new Date('2026-03-07T14:10:00Z'),
      description: 'A new service was remotely created on DC01, which is often a sign of lateral movement.'
    }
  ];
}
