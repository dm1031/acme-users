import React from "react";
import Hilite from "./Hilite";

const Pager = ({ data, match }) => {
  const attributes = ["firstName", "lastName", "middleName", "email", "title"];
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Middle Name</th>
          <th>Email</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {data.users
          ? data.users.map(person => (
              <tr key={person.id}>
                {attributes.map(attribute => (
                  <Hilite
                    key={attribute}
                    attribute={person[attribute]}
                    match={match}
                  />
                ))}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default Pager;
