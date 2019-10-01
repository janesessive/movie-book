import React from 'react';

const GenreForm = (props) => {
  
    return (
      <div>
        <div className="genreForm border">
          <form>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                className="form-control"
                id="genre"
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
  
  export default GenreForm;