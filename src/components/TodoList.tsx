import React from "react";
import { ITodo } from "../interfaceTodo";
import { FormattedMessage } from "react-intl";

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
    return <p className="center"><FormattedMessage id='no-task'/></p>;
  }

  const removeHandler = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    onRemove(id);
  };

  const editHandler = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
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
          <li className={classes.join(" ")} key={todo.id}>
            <label>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={onToggle.bind(null, todo.id)}
                />
                <span>{todo.title}</span>
                {}
                <p><FormattedMessage id='time-create'/> {todo.dateCreate}</p>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <i
                    className="material-icons yellow-text"
                    onClick={(event) => editHandler(event, todo.id)}
                  >
                    edit
                  </i>
                  <i
                    className="material-icons red-text"
                    onClick={(event) => removeHandler(event, todo.id)}
                  >
                    delete
                  </i>
                </div>

                <p><FormattedMessage id='time-end'/> {todo.dateDelete}</p>
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
};
