import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
// import Navbar from "./Components/Navbar/Navbar";


/* <------- Imported Components -------> */
// import  AddService from './components/AddService/AddService' 
import MapContainer from './components/MapContainer/MapContainer'
import CreateUser from './components/CreateUser/CreateUser'
import Login from './components/Login/Login'
import * as routes from './constants/routes'
import NavbarItem from './components/Navbar/Navbar'
import Layout from './components/Layout/Layout'


import { Col } from 'react-bootstrap'


// import './App.css';

class App extends Component {
  state ={
    currentUser: {},
    logged: false,
    location: ''
  }

  async componentDidMount(){
    const user = await localStorage.getItem('currrent')
    const parsedUser = await JSON.parse(user)
      if(user){
        this.setState({
          currentUser: parsedUser
        })
      }
      console.log(parsedUser)
    }
 

  doSetCurrentUser = (user) =>
    this.setState({
      currentUser: user
    })

  doLoginUser = async (info) => {
    const loginResponse = await fetch('http://localhost:3010/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(info),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    const parsedResponse = await loginResponse.json()
    console.log(parsedResponse.data, '<------- this is the parsedResponse')
    // console.log(loginResponse, '<------- this is the loginResponse')

      if(parsedResponse.success){
        // this.doSetCurrentUser(parsedResponse.data)
        // localStorage.setItem('current', JSON.stringify(parsedResponse.data))
        // this.setState({
        //   logged: true,
        //   currentUser: parsedResponse.data
        // })
        console.log('success true')
      } else{
        console.log('not logged in')
      }
  }

  doLogout = async () =>{
    await fetch('/auth/logout')
      localStorage``.clear()
      this.setState({
        currentUser: {},
        logged:false
      })
      this.props.history.push(routes.LOGIN)
    }



  render(){
    const {currentUser} = this.state
    return(
      <div>
      <Layout> </Layout>
      <NavbarItem />
      <Col></Col>
      <Switch>
        <Route exact path={routes.HOME} render={() =><MapContainer/>}/>
        <Route exact path={routes.LOGIN} render={() =>
          <Login
            isLogged={this.state.log}
            doLoginUser={this.doLoginUser}
            doSetCurrentUser={this.doSetCurrentUser}
            currentUser={currentUser} />}
          /> 

      </Switch>
        
        {/* <Switch>
          <Route exact path={routes.ROOT}/>
          <Route exact path={routes.LOGIN}/>
          <CreateUser />
          <Login />
          </Switch>
          <div className="mapContainer">
          <Route exact path={routes.LOGIN} render={() =>
            <Login
              isLogged={this.state.log}
              doLoginUser={this.doLoginUser}
              doSetCurrentUser={this.doSetCurrentUser}
              currentUser={currentUser}
            />}
          />
          <Route exact path={`${routes.PROFILE}/:id`}/>
        <CreateUser />
        <Login />
        </Switch> */}
       
        {/* <AddService /> */}
      </div>
 

    )
  }
}
export default withRouter(App);
