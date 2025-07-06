import {  AppDispatch } from '@/main';
import { Table, Tag, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import type { RootState } from '@/main';
import type { FullTask } from '@/models/Project';
//import { updateTask } from '@/store/actions/tasks'; // ✅ подключи свою функцию обновления задачи

export default function TaskTable() {
 // const dispatch = useDispatch();
 const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector((state: RootState) =>
    state.projects.projects.flatMap((p) =>
      (p.tasks ?? []).map((task) => ({
        ...task,
        key: task.id,
        projectTitle: p.name,
      }))
    )
  ) as (FullTask & { projectTitle: string })[];
 const columns: ColumnsType<FullTask & { projectTitle: string }> = [
    {
      title: '📝 Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: '👤 Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (text?: string) => text || 'Not assigned',
    },
    {
      title: '📅 Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline: string | undefined, record) => {
        const isOverdue = deadline && moment(deadline).isBefore(moment(), 'day');

        return (
          <DatePicker
            style={{
              width: 140,
              border: isOverdue ? '1px solid red' : undefined,
              backgroundColor: isOverdue ? '#ffeaea' : undefined,
            }}
            value={deadline ? moment(deadline) : null}
            format="YYYY-MM-DD"
            onChange={(date) => {
              const newDate = date?.toISOString() ?? null;
              dispatch(updateTask(record.id, { deadline: newDate }));
            }}
          />
        );
      },
    },
    {
      title: '⚡ Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: FullTask['priority'], record) => (
        <Select
          defaultValue={priority}
          style={{ width: 120 }}
          onChange={(newPriority) => {
            dispatch(updateTask(record.id, { priority: newPriority as FullTask['priority'] }));
          }}
          options={[
            { value: 'низкий', label: 'Низкий' },
            { value: 'средний', label: 'Средний' },
            { value: 'высокий', label: 'Высокий' },
          ]}
        />
      ),
    },
    {
      title: '📊 Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: FullTask['status'], record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(newStatus) => {
            dispatch(updateTask(record.id, { status: newStatus as FullTask['status'] }));
          }}
          options={[
            { value: 'новая', label: 'Новая' },
            { value: 'в процессе', label: 'В процессе' },
            { value: 'завершена', label: 'Завершена' },
          ]}
        />
      ),
    },
    {
      title: '📁 Project',
      dataIndex: 'projectTitle',
      key: 'projectTitle',
      render: (text: string) => <em>{text}</em>,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      pagination={{ pageSize: 5 }}
      bordered
      title={() => '📌 Project Tasks Overview'}
    />
  );
}

 
