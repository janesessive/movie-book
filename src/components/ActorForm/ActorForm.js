import React, { Component } from "react";
import { validateField } from './ActorFormValidation';


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

  setError = (name, errorMessage)=>{
    let errors = {...this.state.errors};    
    errors[name] = errorMessage;    
    this.setState({errors});
  };

    onFieldChange = e => {
    let values = { ...this.state.values };
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    values[name] = value;
    this.setState({ values }, ()=>{
      let errorMessage = validateField(name, value);
      this.setError(name, errorMessage);
    });
  };

  onFieldBlur = e => {
    let touched = { ...this.state.touched };
    touched[e.target.name] = true;
    this.setState({ touched });
  };

  onSubmitHandler=()=> {
    console.log('submitted');
  }

  

  render() {
    let errors = false;
    if (!this.state.values.firstName || 
        !this.state.values.lastName|| 
         this.state.errors.firstName ||
         this.state.errors.lastName) {
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
                onChange={this.onFieldChange}
                onBlur={this.onFieldBlur}
              />
              <span style={{color: 'red'}}>{this.state.errors.firstName}</span>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                name="lastName"
                type="text"
                onChange={this.onFieldChange}
                onBlur={this.onFieldBlur}
                
              />
              <span style={{color: 'red'}}>{this.state.errors.lastName}</span>
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
