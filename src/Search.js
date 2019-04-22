import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };
  }
  render() {
    return (
      <form className="input-group">
        <input
          type="text"
          value={this.state.query}
          onChange={ev => this.setState({ query: ev.target.value })}
          placeholder="Search Results"
          className="form-control mx-2 mt-2"
        />
        <span>
          <Link
            to={`/users/search/${this.state.query}/0`}
            className={
              this.state.query === ""
                ? "input-group-btn btn btn-success my-2 disabled"
                : "input-group-btn btn btn-success my-2"
            }
          >
            Go
          </Link>
        </span>
        <span>
          <Link to="/users/0" className="input-group-btn btn btn-success my-2">
            Clear
          </Link>
        </span>
      </form>
    );
  }
}

export default Search;
