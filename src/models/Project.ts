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