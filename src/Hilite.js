import React from "react";

const Hilite = ({ attribute, match }) => {
  const query = match.params.searchTerm;
  const split = attribute.split(query);
  return (
    <td>
      {split.length > 1
        ? split.map((word, idx) => (
            <span key={word}>
              {word}
              {idx !== split.length - 1 ? (
                <span className="bg-warning">{query}</span>
              ) : (
                ""
              )}
            </span>
          ))
        : split[0]}
    </td>
  );
};

export default Hilite;
