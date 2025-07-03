// file implemented when update project not early 26.06

export interface Task {
    id: string | number;
    title: string;
}

export interface Lead {
  id: string | number;
  value: string; // может быть email, имя, или другая информация
}

export interface Project {
    id: string | number;
    name: string;
    shortDescription: string;
    startDate: string;
    endDate: string;
    tasks?: Task[];
    leads?: Lead[];
}



// extension of Task interface
// for using in Используй  taskSlice, компонентах TaskPage, фильтрах и формах
  export interface FullTask extends Task {
  status: 'новая' | 'в процессе' | 'завершена';
  deadline?: string;
  assignedTo?: string;
  description?: string;
  priority?: 'низкий' | 'средний' | 'высокий'
}

