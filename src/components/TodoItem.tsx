import React from 'react';
import { ITodo } from "../interfaceTodo";

type TodoItemProps = {
    todo: ITodo,
    onToggle: () => void,
    editHandler: () => void,
    removeHandler: () => void,
}

export const TodoItem: React.FC<TodoItemProps> = ({todo, onToggle, editHandler, removeHandler}) => {
    const classes = ["todo"];
        if (todo.completed) {
          classes.push("completed");
        }
    return (
          <li className={classes.join(" ")} key={todo.id}>
            <label>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={onToggle}
                />
                <span>{todo.title}</span>
                <p>Время создания: {todo.dateCreate}</p>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <i
                    className="material-icons yellow-text"
                    onClick={editHandler}
                  >
                    edit
                  </i>
                  <i
                    className="material-icons red-text"
                    onClick={removeHandler}
                  >
                    delete
                  </i>
                </div>

                <p>{todo.dateDelete}</p>
              </div>
            </label>
          </li>
        );
}