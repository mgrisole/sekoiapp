export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';

export type Status = 'New' | 'In Progress' | 'Closed' | 'False Positive';

export interface Alert {
  id: string;
  title: string;
  severity: Severity;
  status: Status;
  source: string;
  creationDate: Date;
  assignedAnalyst?: string;
  description: string;
}

export interface Entity {
  id: string;
  type: 'IP' | 'Domain' | 'User' | 'Process';
  name: string;
  metadata?: Record<string, string>;
}

export interface TimelineItem {
  id: string;
  timestamp: Date;
  type: string;
  message: string;
  entityId?: string;
}

export interface Metric {
  label: string;
  value: number;
  change?: number;
}
