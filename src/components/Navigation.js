import React from "react"
import { Link } from "gatsby"

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/private">Private</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/sign-in">Sign In</Link>
      </li>
      <li>
        <Link to="/sign-up">Sign Up</Link>
      </li>
      <li>
        <button>Sign Out</button>
      </li>
    </ul>
  )
}

export default Navigation
