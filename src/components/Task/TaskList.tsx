import {  AppDispatch } from '@/main';
import { Table, Tag, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import type { RootState } from '@/main';
import type { FullTask } from '@/models/Project';
import { updateTaskAsyncThunk } from '@/store/taskSlice';

type Props = {
  tasks: FullTask[]; // 👈 передаваемый массив задач
};

export default function TaskTable({ tasks }: Props) {

 const dispatch = useDispatch<AppDispatch>();

 // Получаем задачи из нормализованного slice
  // const tasks = useSelector((state: RootState) =>
  //   Object.values(state.tasks.entities).filter(Boolean)
  // ) as FullTask[];

  const columns = [
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
      render: (deadline: string | undefined, record: FullTask) => {
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
              dispatch(
                updateTaskAsyncThunk({
                  id: record.id as string,
                  projectId: record.projectId as string,
                  patch: { deadline: newDate },
                })
              );
            }}
          />
        );
      },
    },
    {
      title: '⚡ Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: FullTask['priority'], record: FullTask) => (
        <Select
          defaultValue={priority}
          style={{ width: 120 }}
          onChange={(newPriority) => {
            dispatch(
              updateTaskAsyncThunk({
                id: record.id as string,
                projectId: record.projectId as string,
                patch: { priority: newPriority },
              })
            );
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
      render: (status: FullTask['status'], record: FullTask) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(newStatus) => {
            dispatch(
              updateTaskAsyncThunk({
                id: record.id as string,
                projectId: record.projectId as string,
                patch: { status: newStatus },
              })
            );
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
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      title={() => '📌 Project Tasks Overview'}
    />
  );
}