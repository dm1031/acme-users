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
    return (
      <div>
        <div className="mb-3">
          {count} results. Page {index * 1 + 1} of {Math.ceil(count / 50)}
        </div>
        <div>
          <Link
            to={searchTerm ? `/users/search/${searchTerm}/0` : "/users/0"}
            className={
              index === "0" ? "btn btn-success disabled" : "btn btn-success"
            }
          >
            First
          </Link>
          <Link
            to={
              searchTerm
                ? `/users/search/${searchTerm}/${index * 1 - 1}`
                : `/users/${index * 1 - 1}`
            }
            className={
              index === "0" ? "btn btn-success disabled" : "btn btn-success"
            }
          >
            Prev
          </Link>
          <button className={"btn btn-primary"}>{index * 1 + 1}</button>
          <Link
            to={
              searchTerm
                ? `/users/search/${searchTerm}/${index * 1 + 1}`
                : `/users/${index * 1 + 1}`
            }
            className={
              index * 1 === Math.ceil(count / 50) - 1
                ? "btn btn-success disabled"
                : "btn btn-success"
            }
          >
            Next
          </Link>
          <Link
            to={
              searchTerm
                ? `/users/search/${searchTerm}/${Math.floor(count / 50)}`
                : "/users/165"
            }
            className={
              index * 1 === Math.ceil(count / 50) - 1
                ? "btn btn-success disabled"
                : "btn btn-success"
            }
          >
            Last
          </Link>
        </div>
        <Search />
        <Pager data={data} match={this.props.match} />
      </div>
    );
  }
}

export default Users;
