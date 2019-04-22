import React from "react";
import Hilite from "./Hilite";

const Pager = ({ data, match }) => {
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
                <Hilite attribute={person.firstName} match={match} />
                <Hilite attribute={person.lastName} match={match} />
                <Hilite attribute={person.middleName} match={match} />
                <Hilite attribute={person.email} match={match} />
                <Hilite attribute={person.title} match={match} />
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default Pager;
