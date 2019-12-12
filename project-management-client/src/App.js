import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import SkillList from './components/skills/SkillList';
import EditUser from './components/auth/edit-user/EditUser'
import Navbar from './components/navbar/Navbar';
import SkillDetails from './components/skills/SkillDetails';
import Signup from './components/auth/signup/Signup';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/login/Login';
import ProtectedRoute from './components/auth/protected-route';
import Home from './components/home/Home';
import Dashboard from './components/auth/dashboard/Dashboard';
import AddSkill from './components/skills/AddSkill';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}  />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/dashboard' component={Dashboard} />
            <ProtectedRoute user={this.state.loggedInUser} path='/login' component={Dashboard} />
            <ProtectedRoute user={this.state.loggedInUser} path='/skills/:id' component={SkillDetails} />
            <ProtectedRoute exact user={this.state.loggedInUser} path='/new/skill' component={AddSkill} />
            <ProtectedRoute user={this.state.loggedInUser} path='/skills' component={SkillList} />
            <ProtectedRoute user={this.state.loggedInUser} getUser={this.getTheUser} path='/:id' component={EditUser} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}  />
          <Switch>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />} />
            <Route exact path='/' render={() => <Home />} />
            {/* <ProtectedRoute user={this.state.loggedInUser} path='/skills/:id' component={SkillDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/skills' component={SkillList} />
            <ProtectedRoute userInSession={this.state.loggedInUser} path='/:id' component={EditUser} /> */}
          </Switch>
        </div>
      );
    }
  }
}

export default App;
