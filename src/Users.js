import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pager from "./Pager";
import Search from "./Search";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const { index, searchTerm } = this.props.match.params;
    if (index && !searchTerm) {
      this.getPageData(index);
    } else if (searchTerm && index) {
      this.getQueryPageData(searchTerm, index);
    } else {
      this.getQueryData(searchTerm);
    }
  }
  componentDidUpdate(prevProps) {
    const { index, searchTerm } = this.props.match.params;
    if (prevProps.match.params.index !== index) {
      if (index && searchTerm) {
        this.getQueryPageData(searchTerm, index);
      }
      if (index && !searchTerm) {
        this.getPageData(index);
      }
    }
    if (searchTerm && prevProps.match.params.searchTerm !== searchTerm) {
      this.getQueryData(searchTerm);
    }
  }
  getPageData = index => {
    axios
      .get(`https://acme-users-api.herokuapp.com/api/users/${index}`)
      .then(response => response.data)
      .then(data => this.setState({ data }))
      .catch(ex => console.log("inside getPage there was an error: ", ex));
  };
  getQueryData = query => {
    axios
      .get(`https://acme-users-api.herokuapp.com/api/users/search/${query}`)
      .then(response => response.data)
      .then(data => this.setState({ data }))
      .catch(ex => console.log("inside getQuery there was an error: ", ex));
  };
  getQueryPageData = (query, index) => {
    axios
      .get(
        `https://acme-users-api.herokuapp.com/api/users/search/${query}/${index}`
      )
      .then(response => response.data)
      .then(data => this.setState({ data }))
      .catch(ex =>
        console.log("inside getQueryPageData there was an error: ", ex)
      );
  };
  render() {
    const { data } = this.state;
    const { count } = this.state.data;
    const { index, searchTerm } = this.props.match.params;
    const nav = [
      {
        type: "First",
        path: searchTerm ? `/users/search/${searchTerm}/0` : "/users/0",
        class: `btn btn-success ${index === "0" ? "disabled" : ""}`
      },
      {
        type: "Prev",
        path: searchTerm
          ? `/users/search/${searchTerm}/${index * 1 - 1}`
          : `/users/${index * 1 - 1}`,
        class: `btn btn-success ${index === "0" ? "disabled" : ""}`
      },
      {
        type: index * 1 + 1,
        path: null,
        class: "btn btn-primary"
      },
      {
        type: "Next",
        path: searchTerm
          ? `/users/search/${searchTerm}/${index * 1 + 1}`
          : `/users/${index * 1 + 1}`,
        class: `btn btn-success ${
          index * 1 === Math.ceil(count / 50) - 1 ? "disabled" : ""
        }`
      },
      {
        type: "Last",
        path: searchTerm
          ? `/users/search/${searchTerm}/${Math.floor(count / 50)}`
          : "/users/165",
        class: `btn btn-success ${
          index * 1 === Math.ceil(count / 50) - 1 ? "disabled" : ""
        }`
      }
    ];
    return (
      <div>
        <div className="mb-3">
          {count} results. Page {index * 1 + 1} of {Math.ceil(count / 50)}
        </div>
        {nav.map(button => (
          <Link to={button.path} className={button.class}>
            {button.type}
          </Link>
        ))}
        <Search />
        <Pager data={data} match={this.props.match} />
      </div>
    );
  }
}

export default Users;
