import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Signup from "./components/Signup"



class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} clearUser={this.setUser} />
        <h1>Hei</h1>

        <Route
          exact
          path="/signup"
         
          render={props => <Signup {...props} setUser={this.setUser} />}
          />

      </div>
    )

  }


}


export default App