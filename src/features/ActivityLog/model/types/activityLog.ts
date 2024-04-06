import { User } from '@/entities/User';

export interface ActivityLog {
  id: number;
  log_name: string;
  description: string;
  subject_type: string;
  event: string;
  subject_id: number;
  causer_type: string;
  causer_id?: number;
  batch_uuid?: string;
  created_at: string;
  updated_at: string;
  properties: Properties;

  causer?: User;
}

export interface Properties {
  old: { [key: string]: unknown };
  attributes: { [key: string]: unknown };
}
