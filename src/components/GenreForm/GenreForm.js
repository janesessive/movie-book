import React, { useState, useEffect } from "react";
import { validateField } from "./GenreFormValidation";
import * as dataService from "../../dataService";
const EDIT_MODE = "edit";
const CREATE_MODE = "create";

const GenreForm = props => {
  let [genre, setGenre] = useState({
    _id: null,
    name: ""
  });

  let [touched, setTouched] = useState({});
  let [errors, setErrors] = useState({});

  let id = props.match && props.match.params ? props.match.params.id : null;
  useEffect(() => {
    let loadData = async () => {
      if (id) {
        let genre = await dataService.getGenre(id);
        setGenre(genre);
      }
    };

    loadData();
  }, [id]);

  const getFormMode = () => {
    return props.match && props.match.params.id ? EDIT_MODE : CREATE_MODE;
  };

  const onFieldChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newGenre = { ...genre };
    newGenre[name] = value;
    setGenre(newGenre);
    let errorMessage = validateField(name, value);
    errors[name] = errorMessage;
    setErrors({ ...errors });
  };

  const onFieldBlur = e => {
    touched[e.target.name] = true;
    setTouched({ ...touched });
  };

  const onSubmitHandler = () => {
    const formMode = getFormMode();
    if (formMode === CREATE_MODE) {
      dataService.addGenre(genre);
    } else {
      dataService.editGenre(genre);
    }
    setGenre({ _id: null, name: "" });
    setTouched({});
    setErrors({});
  };

  let hasErrors = false;
  if (!genre.name || errors.name) {
    hasErrors = true;
  }

  return (
    <div>
      <div className="genreForm border">
        <form>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={genre.name}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
            <span style={{ color: "red" }}>{errors.name}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmitHandler}
            disabled={hasErrors}
          >
            Submit
          </button>
          <br></br>
        </form>
      </div>
      <pre>{JSON.stringify(genre, null, 2)}</pre>
      <pre>{JSON.stringify(touched, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </div>
  );
};

export default GenreForm;
