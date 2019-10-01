import React, { Component } from "react";
import "./Genres.css";
import GenreForm from "../GenreForm/GenreForm";

class Genres extends Component {
  async componentDidMount() {
    try {
      let response = await fetch("http://localhost:4000/api/genres");
      if (response.ok) {
      let data = await response.json();
      console.log(data);
      } else {
        console.log("network error")
      }
      
    } catch (error) {
      console.log("no connection");
      
    }
   
  }
  render() {
    return (
      <div>
        <GenreForm />
      </div>
    );
  }
}
export default Genres;
