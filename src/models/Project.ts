// file implemented when update project not early 26.06

export interface Task {
    id: string | number;
    title: string;
    assignedTo?: string; // userId или имя

}

export interface Lead {
  id: string | number;
  value: string; // может быть email, имя, или другая информация
}


export interface Project {
  id: string | number;
  name: string;
  shortDescription: string;
  detailedDescription?: string;
  startDate: string;
  endDate: string;
  budget: number;
  risks?: string;
  communicationPlan?: string;
  evaluationCriteria?: string;
  tasks?: Task[];      // задачи проекта
  leads?: Lead[];      // максимум 2 менеджера проекта

}



// extension of Task interface
// for using in Используй  taskSlice, компонентах TaskPage, фильтрах и формах
  export interface FullTask extends Task {
  status?: 'новая' | 'в процессе' | 'завершена';
  deadline?: string;
  assignedTo?: string;
  description?: string;
  priority?: 'низкий' | 'средний' | 'высокий'
}

