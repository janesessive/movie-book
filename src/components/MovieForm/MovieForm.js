
import React, { useState, useEffect } from "react";
import { validateField } from "./MovieFormValidation";


const MovieForm = (props) => {
  const [movie, setMovie] = useState({
    _id: null,
    title: "",
    year: "",
    description:""

  });

  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);

  let [touched, setTouched] = useState({});
  let [errors, setErrors] = useState({});

  
    return (
      <div>
        <div className="movieForm border">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                name="title"
                type="text"
                // value={movie.title}
                // onChange={onFieldChange}
                // onBlur={onFieldBlur}
              />
              </div>
              <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                className="form-control"
                name="year"
                type="number"
              />
              </div>
              <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                className="form-control"
                name="genre"
                type="text"
              />
              </div>
              <div className="form-group">
              <label htmlFor="actors">Actors</label>
              <input
                className="form-control"
                name="actors"
                type="text"
              />
              </div>
              
              <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                type="text"
              />
              </div>
            
  
            <button

              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
            <br></br>
          </form>
        </div>
      </div>
    );
  };
  
  export default MovieForm;