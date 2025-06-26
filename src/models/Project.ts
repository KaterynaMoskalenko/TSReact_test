// file implemented when update project not early 26.06

export interface Task {
    id: string | number;
    title: string;
}

export interface Project {
    id: string;
    name: string;
    shortDescription: string;
    startDate: string;
    endDate: string;
    tasks?: Task[];
    leads?: string[];
}