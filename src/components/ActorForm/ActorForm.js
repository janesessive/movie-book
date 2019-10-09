import React, { Component, useState } from "react";
import { validateField } from "./ActorFormValidation";
import * as dataService from "../../dataService";
const EDIT_MODE = "edit";
const CREATE_MODE = "create";

const ActorForm = props => {
  let [values, setValues] = useState({
    _id: null,
    firstName: "",
    lastName: "",
    gender: ""
  });

  let [touched, setTouched] = useState({});
  let [errors, setErrors] = useState({});

  const getFormMode = () => {
    return props.match.params.id ? EDIT_MODE : CREATE_MODE;
  };
  const loadData = async () => {
    let id = props.match && props.match.params ? props.match.params.id : null;

    if (id) {
      let actor = await dataService.getActor(id);
      setValues(actor);
    }
  };

 
  const onFieldChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newValues = {...values};    
    newValues[name] = value;
    setValues(newValues);
    let errorMessage = validateField(name, value);
    errors[name] = errorMessage;
    setErrors({...errors});
  };

  const onFieldBlur = e => {
    touched[e.target.name] = true;
    setTouched({...touched});
  };

  const onSubmitHandler = () => {
    const formMode = getFormMode();
    if (formMode === CREATE_MODE) {
      dataService.addActor(values);
    } else {
      dataService.editActor(values);
    }
  };

  let hasErrors = false;
  if (
    !values.firstName ||
    !values.lastName ||
    errors.firstName ||
    errors.lastName
  ) {
    hasErrors = true;
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
              value={values.firstName}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
            <span style={{ color: "red" }}>{errors.firstName}</span>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="form-control"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
            <span style={{ color: "red" }}>{errors.lastName}</span>
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
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{JSON.stringify(touched, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </div>
  );
};

export default ActorForm;
