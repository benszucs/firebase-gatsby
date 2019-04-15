import React, { Component } from "react"

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
}

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    const { email, password, error } = this.state
    const isInvalid = password === "" || email === ""

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.handleChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.handleChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default SignInForm
