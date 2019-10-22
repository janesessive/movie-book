import React, { useState, useEffect } from "react";
import { validateField } from "./MovieFormValidation";

const MovieForm = props => {
  const [movie, setMovie] = useState({
    _id: null,
    title: "",
    year: "",
    description: ""
  });

  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);

  let [touched, setTouched] = useState({});
  let [errors, setErrors] = useState({});
  let [modal, setModal] = useState({ show: false });

  const onFieldChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newMovie = { ...movie };
    newMovie[name] = value;
    setMovie(newMovie);
    let errorMessage = validateField(name, value);
    errors[name] = errorMessage;
    setErrors({ ...errors });
  };

  const onFieldBlur = e => {
    touched[e.target.name] = true;
    setTouched({ ...touched });
  };

  const onClickSelectGenre = () => {
    let showModal = { ...modal };
    showModal.show = true;
    setModal(showModal);
  };

  let hasErrors = false;
  if (!movie.title || !movie.year || errors.title || errors.year) {
    hasErrors = true;
  }

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
              value={movie.title}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
            <span style={{ color: "red" }}>{errors.title}</span>
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              className="form-control"
              name="year"
              type="number"
              min="1900"
              max="2070"
              value={movie.year}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
            <span style={{ color: "red" }}>{errors.year}</span>
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              className="form-control"
              name="genre"
              type="text"
              onClick={onClickSelectGenre}
            />
          </div>
          <div className="form-group">
            <label htmlFor="actors">Actors</label>
            <input className="form-control" name="actors" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              type="text"
              value={movie.description}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            disabled={hasErrors}
          >
            Submit
          </button>

          <br></br>
        </form>
        
      <pre>{JSON.stringify(modal, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MovieForm;
