import React, { Component } from "react";

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

  onFieldChange = e => {
    let values = { ...this.state.values };
    values[e.target.name] = e.target.value;
    this.setState({ values });
  };

  onFieldBlur = e => {
    let touched = { ...this.state.touched };
    touched[e.target.name] = true;
    this.setState({ touched });
  };

  onSubmitHandler = () => {
    let newActor = { ...this.state.values };
    let actors = [...this.state.actors];
    actors = actors.push(newActor);

    this.setState({ actors: actors });
  };

  render() {
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
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={e => this.onSubmitHandler(e)}
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
