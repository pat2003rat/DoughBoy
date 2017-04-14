var React = require('react');
var $ = require('jquery');
var User = require('../models/Ingredients.js').User;
//
var Signup = React.createClass({
  getInitialState: function(){
    return{
      username: '',
      password: ''
    };
  },
  handleUsernameInput: function(e){
    this.setState({username: e.target.value})
  },

  handlePasswordInput: function(e){
    this.setState({password: e.target.value})
  },

  handleSignUp: function(e){
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;

    this.props.signUp(username, password);
  },

  render: function(){
    return(
      <div className="col-xs-12 col-md-12 text-center">
        <h1>Sign Up!</h1>
        <form onSubmit={this.handleSignUp} id="signup">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input onChange={this.handleUsernameInput} value={this.state.username} className="form-control" name="email" id="email" type="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handlePasswordInput} value={this.state.password} className="form-control" name="password" id="password" type="password" placeholder="Password" />
          </div>
          <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
        </form>
      </div>
    )
  }
});

var SignIn = React.createClass({
  getInitialState: function(){
    return{
      username: '',
      password: ''
    };
  },
  handleUsernameInput: function(e){
    this.setState({username: e.target.value})
  },
  handlePasswordInput: function(e){
    this.setState({password: e.target.value})
  },
  handleSignIn: function(e){
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;

    this.props.signIn(username, password);
  },
  render: function(){
    return(
        <div className="col-xs-12 col-md-12 text-center">
          <h1>Please Login</h1>
          <form onSubmit={this.handleSignIn} id="login">
            <div className="form-group">
              <label htmlFor="email-login">Email address</label>
              <input onChange={this.handleUsernameInput} value={this.state.username} className="form-control" name="username" id="email-login" type="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password-login">Password</label>
              <input onChange={this.handlePasswordInput} value={this.state.password} className="form-control" name="password" id="password-login" type="password" placeholder="Password" />
            </div>
            <input className="btn btn-primary" type="submit" value="Let's Go!" />
          </form>
        </div>
    )
  }
});

var LoginSignUpContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new User()
    }
  },
  signUp: function(username, password){
    this.state.user.set({username: username, password: password});
    this.state.user.signUp()
  },
  signIn: function(username, password){
    this.state.user.set({username: username, password: password});
    this.state.user.signIn(username, password)
  },
  render: function(){
    return(
      <div className="container titlescreen text-center">
        <h1 className="titleproject"> DOUGHBOY Batch Maker</h1>
        <div className="row">
          <div className ="col-xs-12 col-md-4 signingup" >
            <SignIn signIn={this.signIn} />
          </div>
            <div className = "col-md-4">
              <img className="doughboy" src="./images/doughboy.jpg"></img>
            </div>
          <div className ="col-xs-12 col-md-4 signingin" >
            <Signup signUp={this.signUp} />
          </div>
          </div>
        </div>
    )
  }
});

module.exports = {
  LoginSignUpContainer: LoginSignUpContainer
}
