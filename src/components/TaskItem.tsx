import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit.png';

interface TaskItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({
  index,
  item,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) textInputRef.current.focus();
      else textInputRef.current.blur();
    }
  }, [isEditing]);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setNewTitle(item.title);
  }

  function handleSubmitEditing() {
    editTask(item.id, newTitle);
    setIsEditing(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => !isEditing && toggleTaskDone(item.id)}>
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}>
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          testID={`edit-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={isEditing ? handleCancelEditing : handleStartEditing}>
          {!isEditing && <Image source={editIcon} />}
          {isEditing && <Icon name="x" size={24} color="#B2B2B2" />}
        </TouchableOpacity>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
          disabled={isEditing}
          onPress={() => removeTask(item.id)}>
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  buttonGroup: {
    width: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
