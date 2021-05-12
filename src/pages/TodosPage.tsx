import React, { useState, useEffect } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { ITodo } from "../interfaceTodo";
import { FormattedMessage } from "react-intl";

declare var confirm: (question: string) => boolean;
declare var prompt: (text: string) => string;

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]") as ITodo[];
    setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false,
      dateCreate:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      dateDelete: "",
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleHandler = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          if (todo.completed === true) {
            todo.dateDelete =
              new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString();
          } else {
            todo.dateDelete = "";
          }
        }
        return todo;
      })
    );
  };

  const removeHandler = (id: number) => {
    const shoudRemove = confirm("Вы уверены, что хотите удалить элемент?");
    if (shoudRemove) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const editHandler = (id: number) => {
    console.log(todos);
    const text = prompt("Измените текущее задание!");

    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id && text !== null) {
          console.log(1232);

          todo.title = text;
        }
        return todo;
      })
    );
  };

  return (
    <React.Fragment>
      <TodoForm onAdd={addHandler} />

      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
        onEdit={editHandler}
      />
    </React.Fragment>
  );
};
