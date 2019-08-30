export interface Todo {
  id: number;
  description: string;
  completed?: boolean;
  tags?: string[];
  checklist?: {
    description: string;
    completed?: boolean;
  }[];
}
