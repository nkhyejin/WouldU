export interface Planner {
  id?: number;
  description: string;
  date?: string;
  priority?: number;
  isCompleted?: number;
}

export interface MonthPlan {
  nowYear: number;
  nowMonth: number;
}