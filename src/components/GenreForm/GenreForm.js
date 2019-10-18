import React, { Component } from "react";
import { validateField } from "./GenreFormValidation";
import * as dataService from "../../dataService";
const EDIT_MODE = "edit";
const CREATE_MODE = "create";

class GenreForm extends Component {
  state = {
    touched: {},
    errors: {},
    genre: {
      _id: null,
      name: ""
    }
  };

  getFormMode = () => {
    return this.props.match && this.props.match.params.id ? EDIT_MODE : CREATE_MODE;
  };

  componentDidMount = async () => {
    let id =
      this.props.match && this.props.match.params
        ? this.props.match.params.id
        : null;

    if (id) {
      let genre = await dataService.getGenre(id);
      this.setState({ genre });
    }
  };

  setError = (name, errorMessage) => {
    let errors = { ...this.state.errors };
    errors[name] = errorMessage;
    this.setState({ errors });
  };

  onFieldChange = e => {
    let genre = { ...this.state.genre };
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    genre[name] = value;
    this.setState({ genre }, () => {
      let errorMessage = validateField(name, value);
      this.setError(name, errorMessage);
    });
  };

  onFieldBlur = e => {
    let touched = { ...this.state.touched };
    touched[e.target.name] = true;
    this.setState({ touched });
  };

  onSubmitHandler = () => {
    const formMode = this.getFormMode();
    if (formMode === CREATE_MODE) {
      dataService.addGenre(this.state.genre);
    } else {
      dataService.editGenre(this.state.genre);
    }
  };

  render() {
    let errors = false;
    if (
      !this.state.genre.name ||
      this.state.errors.name
    ) {
      errors = true;
    }
  
    return (
      <div>
        <span>Actor</span>
        <div className="genreForm border">
          <form>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                className="form-control"
                name="name"
                type="text"
                value={this.state.genre.name}
                onChange={this.onFieldChange}
                onBlur={this.onFieldBlur}
              />
              <span style={{ color: "red" }}>
                {this.state.errors.name}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSubmitHandler}
              disabled={errors}
            >
              Submit
              </button>
              <br></br>
          </form>
        </div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
  
  export default GenreForm;