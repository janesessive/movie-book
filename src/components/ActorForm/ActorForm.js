import React, { useState, useEffect } from "react";
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

  let id = props.match && props.match.params ? props.match.params.id : null;
  useEffect(() => {
    let loadData = async()=>{
    if (id) {
      let actor = await dataService.getActor(id);
      setValues(actor);
    }};

    loadData();
  }, [id]);

  const getFormMode = () => {
    return props.match.params.id ? EDIT_MODE : CREATE_MODE;
  };
 

  const onFieldChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newValues = { ...values };
    newValues[name] = value;
    setValues(newValues);
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

          <div className="col-auto">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="1"
                      checked={values.gender === "1"}
                      onChange={onFieldChange}
                    />
                    <label className="form-check-label" htmlFor="male">
                      male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="2"
                      checked={values.gender === "2"}
                      onChange={onFieldChange}
                    />
                    <label className="form-check-label" htmlFor="female">
                      female
                    </label>
                  </div>
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
