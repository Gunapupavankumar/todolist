import { FaTrashAlt } from "react-icons/fa";

import "./index.css";

const TodoTask = (props) => {
  const { userDetails, deleteUser, checkUser } = props;
  const { text, id, hide } = userDetails;

  const userHide = hide ? "todo-item-hide-container" : "todo-item-container";

  const onCheck = () => {
    checkUser(id);
  };

  const onDelete = () => {
    alert("Are u sure to delete this task");

    deleteUser(id);
  };

  return (
    <li className={userHide}>
      <input
        id={id}
        type="checkbox"
        className="checkbox-input"
        onClick={onCheck}
      />
      <div className="label-container">
        <label className="checkbox-label" htmlFor={id}>
          {text}
        </label>
        <div className="delete-icon-container">
          <FaTrashAlt onClick={onDelete} />
        </div>
      </div>
    </li>
  );
};

export default TodoTask;
