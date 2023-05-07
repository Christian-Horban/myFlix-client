import React from "react";
import {useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] =useState("");

    //Validation of user login
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("https://horban-movie-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((Response) => Response.json())
    .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
        } else {
            alert("No such user");
        }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};