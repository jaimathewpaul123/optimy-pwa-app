export interface UserInfo {
  user_token: string;
  user_id: number;
}
export interface LoginRequestBody {
  email: string;
  password: string;
  tenantid: number;
}
export interface ListResponse {
  data: Task[];
  status: number;
}
export interface TaskRequestBody {
  parent_id?: string;
  id?: number;
}
export interface Task {
  'id': number;
  'creator': string;
  'owner': string;
  'assignee': string;
  'parent_id': string;
  'start_dt': string;
  'due_dt': string;
  'reminder_dt': string;
  'status': string;
  'attr': string;
}
