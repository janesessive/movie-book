import React, { Component } from "react";
import "./Genres.css";
import GenreForm from "../GenreForm/GenreForm";
import * as dataService from "../../dataService";

class Genres extends Component {
  componentDidMount = async () => {
    const genres = await dataService.getGenres();
    this.setState({ genres });
  };
  // async componentDidMount() {
  //   try {
  //     let response = await fetch("http://localhost:4000/api/genres");
  //     if (response.ok) {
  //     let data = await response.json();
  //     console.log(data);
  //     } else {
  //       console.log("network error")
  //     }

  //   } catch (error) {
  //     console.log("no connection");

  //   }

  // }
  render() {
    return (
      <div>
        <GenreForm />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
export default Genres;
