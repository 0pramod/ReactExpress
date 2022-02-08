import React from "react";

export default function Home() {
  return (
    <div>
      <form action="http://localhost:5000/add" method="post">
        <div>
          <label for="name">
            <b>Name</b>
          </label>
          <input id="name" type="text" placeholder="Enter Name" name="name" />

          <label for="phone">
            <b>Phone Number</b>
          </label>
          <input type="number" placeholder="Phone Number" name="phone" />

          <label for="email">
            <b>Email</b>
          </label>
          <input type="email" placeholder="Enter Email" name="email" />

          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
