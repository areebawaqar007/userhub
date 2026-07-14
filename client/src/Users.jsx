import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Users() {
  // const [users, setUsers] = useState([
  //   {
  //     name: "Areeba Waqar",
  //     email: "areebawaqar07@gmail.com",
  //     age: 24,
  //   },
  // ]);

  const [users, setUsers] = useState([]);
  const handleDelete = (id) => {
  axios
    .delete(`http://localhost:3000/deleteUser/${id}`)
    .then((result) => {
      console.log(result);

      // Remove the deleted user from the UI
      setUsers(users.filter((user) => user._id !== id));
    })
    .catch((err) => {
      console.log(err);
    });
};

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
   


  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn btn-success">
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
