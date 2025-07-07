import { useState } from 'react';
import type { FullTask } from '@/models/Project';

type Props = {
  onFilterChange: (filters: {
    status?: FullTask['status'];
    assignedTo?: string;
    deadlineBefore?: string;
    priority?: FullTask['priority'];
  }) => void;
};

export default function TaskFilterPanel({ onFilterChange }: Props) {
  const [status, setStatus] = useState<FullTask['status'] | ''>('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadlineBefore, setDeadlineBefore] = useState('');
  const [priority, setPriority] = useState<FullTask['priority'] | ''>('');

  const handleChange = () => {
    onFilterChange({
      status: status || undefined,
    //   assignedTo: assignedTo || undefined,
    //   deadlineBefore: deadlineBefore || undefined,
      priority: priority || undefined,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
      <select value={status} onChange={e => { setStatus(e.target.value as FullTask['status'] | ''); handleChange(); }}>
        <option value="">Статус</option>
        <option value="новая">Новая</option>
        <option value="в процессе">В процессе</option>
        <option value="завершена">Завершена</option>
      </select>

   
      <select value={priority} onChange={e => { setPriority(e.target.value as FullTask['priority'] | ''); handleChange(); }}>
        <option value="">Приоритет</option>
        <option value="низкий">Низкий</option>
        <option value="средний">Средний</option>
        <option value="высокий">Высокий</option>
      </select>
    </div>
  );
}