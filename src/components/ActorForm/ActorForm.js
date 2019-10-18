import React, { Component } from "react";
import { validateField } from "./ActorFormValidation";
import * as dataService from "../../dataService";
const EDIT_MODE = "edit";
const CREATE_MODE = "create";

class ActorForm extends Component {
  state = {
    touched: {},
    errors: {},
    values: {
      _id: null,
      firstName: "",
      lastName: "",
      gender: ""
    }
  };

  getFormMode = () => {
    return this.props.match.params.id ? EDIT_MODE : CREATE_MODE;
  };
  componentDidMount = async () => {
    let id =
      this.props.match && this.props.match.params
        ? this.props.match.params.id
        : null;

    if (id) {
      let actor = await dataService.getActor(id);
      this.setState({ values: actor });
    }
  };

  setError = (name, errorMessage) => {
    let errors = { ...this.state.errors };
    errors[name] = errorMessage;
    this.setState({ errors });
  };

  onFieldChange = e => {
    let values = { ...this.state.values };
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    values[name] = value;
    this.setState({ values }, () => {
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
      dataService.addActor(this.state.values);
    } else {
      dataService.editActor(this.state.values);
    }
    this.setState({
      touched: {},
      errors: {},
      values: {
        _id: null,
        firstName: "",
        lastName: "",
        gender: ""
      }
    });
  };

  render() {
    let errors = false;
    if (
      !this.state.values.firstName ||
      !this.state.values.lastName ||
      this.state.errors.firstName ||
      this.state.errors.lastName
    ) {
      errors = true;
    }
    return (
      <div>
        <span>Actor</span>
        <div className="actorForm border">
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                className="form-control"
                name="firstName"
                type="text"
                value={this.state.values.firstName}
                onChange={this.onFieldChange}
                onBlur={this.onFieldBlur}
              />
              <span style={{ color: "red" }}>
                {this.state.errors.firstName}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                name="lastName"
                type="text"
                value={this.state.values.lastName}
                onChange={this.onFieldChange}
                onBlur={this.onFieldBlur}
              />
              <span style={{ color: "red" }}>{this.state.errors.lastName}</span>
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

export default ActorForm;
