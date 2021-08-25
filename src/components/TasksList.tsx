import React from 'react';
import { FlatList } from 'react-native';
import { ItemWrapper } from './ItemWrapper';

import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ItemWrapper index={index}>
          <TaskItem
            key={String(item.id)}
            index={index}
            item={item}
            toggleTaskDone={toggleTaskDone}
            removeTask={removeTask}
            editTask={editTask}
          />
        </ItemWrapper>
      )}
      style={{
        marginTop: 32,
      }}
    />
  );
}
