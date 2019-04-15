import React, { Component } from "react"

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: 0,
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCheckBox = event => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.handleChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.handleChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.handleChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.handleChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label htmlFor="isAdmin">Admin</label>
        <input 
          name="isAdmin"
          value={isAdmin}
          onChange={this.handleCheckBox}
          type="checkbox"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default SignUpForm
