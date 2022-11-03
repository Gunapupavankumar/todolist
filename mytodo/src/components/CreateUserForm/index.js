import { Component } from "react";

import { v4 as uuidv4 } from "uuid";

import TodoTask from "../TodoTask";

import "./index.css";

const todoList = [
  {
    username: "pavan",
    uniqueId: uuidv4(),
    userDetails: [
      { id: uuidv4(), text: "HMTL", hide: false },
      { id: uuidv4(), text: "css", hide: false },
      { id: uuidv4(), text: "Javascript", hide: false },
    ],
  },
  {
    username: "anil",
    uniqueId: uuidv4(),
    userDetails: [
      { id: uuidv4(), text: "HMTL", hide: false },
      { id: uuidv4(), text: "css", hide: false },
      { id: uuidv4(), text: "Javascript", hide: false },
    ],
  },
  {
    username: "kumar",
    uniqueId: uuidv4(),
    userDetails: [
      { id: uuidv4(), text: "HMTL", hide: false },
      { id: uuidv4(), text: "css", hide: false },
      { id: uuidv4(), text: "Javascript", hide: false },
    ],
  },
];

class CreateUserForm extends Component {
  state = {
    userNameInput: "",
    showUserNameError: false,
    isFormSubmitted: false,
    username: "",
    userTaskInput: "",
  };

  onBlurUserName = () => {
    const isValidUserName = this.validateUserName();

    this.setState({ showUserNameError: !isValidUserName });
  };

  onChangeUserName = (event) => {
    const { target } = event;
    const { value } = target;

    this.setState({
      userNameInput: value,
    });
  };

  onChangeUserTask = (event) => {
    const { target } = event;
    const { value } = target;

    this.setState({
      userTaskInput: value,
    });
  };

  validateUserName = () => {
    const { userNameInput } = this.state;

    return userNameInput !== "";
  };

  validateUserTask = () => {
    const { userTaskInput } = this.state;

    return userTaskInput !== "";
  };

  renderUserNameField = () => {
    const { userNameInput, showUserNameError } = this.state;
    const className = showUserNameError
      ? "name-input-field error-field"
      : "name-input-field";

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          USERNAME
        </label>
        <input
          type="text"
          id="firstName"
          className={className}
          value={userNameInput}
          placeholder="username"
          onChange={this.onChangeUserName}
          onBlur={this.onBlurUserName}
        />
      </div>
    );
  };

  onAddTodo = () => {
    const { userTaskInput, username } = this.state;

    const userItem = username.userDetails.findIndex((eachItem) => {
      if (eachItem.text === userTaskInput && userTaskInput !== "") {
        return true;
      }
      return false;
    });

    if (userItem === -1) {
      const newTodo = {
        id: uuidv4(),
        text: userTaskInput,
        hide: false,
      };
      const userList = username.userDetails;
      userList.push(newTodo);
      this.setState({
        username: {
          username: username.username,
          id: username.uniqueId,
          userDetails: userList,
        },
        userTaskInput: "",
      });
    } else {
      alert("already existed");
      this.setState({ userTaskInput: "" });
    }
  };

  onClickCheckbox = (id) => {
    const { username } = this.state;
    const userItem = username.userDetails.findIndex((eachItem) => {
      if (eachItem.id === id) {
        return true;
      }
      return false;
    });

    const userCheckArray = username.userDetails[userItem];
    userCheckArray.hide = true;

    this.setState({
      username: {
        username: username.username,
        id: username.uniqueId,
        userDetails: username.userDetails,
      },
    });
  };

  onClickShow = () => {
    const { username } = this.state;
    const userItem = username.userDetails.findIndex((eachItem) => {
      if (eachItem.hide === true) {
        return true;
      }
      return false;
    });

    const userCheckArray = username.userDetails[userItem];
    userCheckArray.hide = false;

    this.setState({
      username: {
        username: username.username,
        uniqueId: username.uniqueId,
        userDetails: username.userDetails,
      },
    });
  };

  deleteUser = (id) => {
    const { username } = this.state;
    const filteredUserName = username.userDetails.filter(
      (each) => each.id !== id
    );
    console.log(filteredUserName);
    this.setState({
      username: {
        username: username.username,
        id: username.uniqueId,
        userDetails: filteredUserName,
      },
    });
  };

  onChangeSortby = (event) => {
    console.log(event.target.value);

    this.setState({ username: todoList[event.target.value] });
    const userItem = todoList.findIndex((eachItem) => {
      if (eachItem.uniqueId === event.target.value) {
        return true;
      }
      return false;
    });

    this.setState({ username: todoList[userItem] });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const isValidUserName = this.validateUserName();

    if (isValidUserName) {
      this.setState({ isFormSubmitted: true });
    } else {
      this.setState({
        showUserNameError: !isValidUserName,
        isFormSubmitted: false,
      });
    }

    const { userNameInput } = this.state;

    const userItem = todoList.findIndex((eachItem) => {
      if (eachItem.username === userNameInput) {
        return true;
      }
      return false;
    });

    if (userItem === -1) {
      const newUser = {
        username: userNameInput,
        uniqueId: uuidv4(),
        userDetails: [],
      };

      todoList.push(newUser);
      const usersItem = todoList.findIndex((eachItem) => {
        if (eachItem.username === userNameInput) {
          return true;
        }
        return false;
      });

      this.setState({ username: todoList[usersItem] });
    } else {
      this.setState({ username: todoList[userItem] });
    }
  };

  renderUserForm = () => {
    const { showUserNameError } = this.state;

    return (
      <form className="view-container" onSubmit={this.onSubmitForm}>
        {this.renderUserNameField()}
        {showUserNameError && <p className="error-message">required</p>}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    );
  };

  onClickLogout = () => {
    this.setState((prevState) => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      userNameInput: "",
    }));
  };

  renderSubmissionSuccessView = () => {
    const { username, userTaskInput } = this.state;
    console.log(username);
    return (
      <div className="success-container">
        <div className="row-success">
          <h1 className="user-heading">{username.username}</h1>
          <div className="sort-by-container">
            <h1 className="sort-by">Sort by</h1>
            <select className="sort-by-select" onChange={this.onChangeSortby}>
              {todoList.map((each) => (
                <option
                  key={each.uniqueId}
                  value={each.uniqueId}
                  className="select-option"
                >
                  {each.username}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="button-show"
              onClick={this.onClickShow}
            >
              Show all
            </button>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="create task"
            value={userTaskInput}
            className="create-input"
            onChange={this.onChangeUserTask}
            onBlur={this.onBlurTask}
          />

          <button type="button" onClick={this.onAddTodo} className="button-add">
            Add
          </button>
        </div>
        <ul>
          {username.userDetails.map((each) => (
            <TodoTask
              key={each.id}
              userDetails={each}
              deleteUser={this.deleteUser}
              checkUser={this.onClickCheckbox}
            />
          ))}
        </ul>

        <div>
          <button
            type="button"
            className="submit-button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { isFormSubmitted } = this.state;
    const headName = isFormSubmitted ? "title" : "from-little-container";
    const context = "TODOLIST";

    return (
      <div className="registration-form-container">
        <h1 className={headName}>{context}</h1>
        <div>
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderUserForm()}
        </div>
      </div>
    );
  }
}
export default CreateUserForm;
