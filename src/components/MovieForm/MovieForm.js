
import React from 'react';

const MovieForm = (props) => {
  
    return (
      <div>
        <div className="movieForm border">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                id="title"
                type="text"
              />
              </div>
              <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                className="form-control"
                id="year"
                type="number"
              />
              </div>
              
              <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
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