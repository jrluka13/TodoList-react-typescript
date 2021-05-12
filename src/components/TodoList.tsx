import React from "react";
import {TodoItem } from './TodoItem';
import { ITodo } from "../interfaceTodo";

type TodoListProps = {
  todos: ITodo[];
  onToggle(id: number): void;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onRemove,
  onToggle,
  onEdit,
}) => {
  if (todos.length === 0) {
    return <p className="center">Пока дел нет!</p>;
  }

  const removeHandler = (id: number) => {
    onRemove(id);
  };

  const editHandler = ( id: number) => {
    onEdit(id);
  };

  return (
    <ul>
      {todos.map((todo) => {
        const classes = ["todo"];
        if (todo.completed) {
          classes.push("completed");
        }
        return (
          <TodoItem 
            todo={todo} 
            onToggle={onToggle.bind(null, todo.id)} 
            editHandler={editHandler.bind(null, todo.id)}
            removeHandler={removeHandler.bind(null, todo.id)}
          />
        )
      })}
    </ul>
  );
};
