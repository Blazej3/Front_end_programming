import React from "react";

function TodoTable({todos}) {

  const deleteToDo = (index) => {
    const filteredTodos = todos.filter((todo, i) => i !== index);
    setTodos(filteredTodos);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);  
    return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
  }

  return (
    <table>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.desc}</td>
            <td>{formatDate(todo.date)}</td>
            <td>
              <button onClick={() => deleteToDo(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
