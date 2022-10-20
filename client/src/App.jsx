import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import SignIn from "./Components/Accounts/SignIn.jsx";
import SignUp from "./Components/Accounts/SignUp.jsx";
import Metrics from "./Components/Metrics/index.jsx";
import CalendarClass from "./Components/Calendar.jsx";
import TodoCreate from './Components/Forms/TodoCreate.jsx';
import CategoryCreate from './Components/Forms/CategoryCreate.jsx';
import DeleteButton from './Components/Forms/DeleteButton.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#app');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      todoID: 104,
      todos: [],
      categories: [
        {key: 'None', value: 0},
        {key: 'Option 1', value: 1},
        {key: 'Option 2', value: 2},
        {key: 'Option 3', value: 3},
        {key: 'Option 4', value: 4},
        {key: 'Option 5', value: 5},
        {key: 'Other', value: 6}
      ],
      currentEvents: [{id: 4, title: 'newEvent', date: '2022-10-17'}]
    };
  }

  componentDidMount() {
    let todos = [];
    let categories = [];
    axios.get('/todos', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => result.data.map((option, i) => {
      return todos.push(option)
    }))
    axios.get('/categories', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => result.data.map((option, i) => {
      return categories.push({key: option.category, value: option.category_id})
    }))
    .then(this.setState({
      todos: todos,
      categories: categories
    }))
  }

  render() {
    return (
      <div>
        <div>Encompass</div>
        <SignIn />
        <SignUp />
        <Metrics />
        <CalendarClass events={this.state.currentEvents} userID={this.state.userID}/>
        <h1>THIS CREATES A TODO ENTRY</h1>
        <TodoCreate userID={this.state.userID} categories={this.state.categories}/>
        <h1>THIS CREATES A CATEGORY</h1>
        <CategoryCreate userID={this.state.userID}/>
        <h1>THIS DELETES SOMETHING</h1>
        <DeleteButton todoID={this.state.todoID}/>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;