import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // ES6

import * as dataService from '../../dataService';

const ActorsSelectForm = ({ onActorSelected }) => {
  let [actors, setActors] = useState([]);
  
  let [viewActors, setViewActors] = useState([]);

  useEffect(() => {
    let loadData = async () => {
      let actorsData = await dataService.getActors();
      setActors(actorsData);
      setViewActors(actorsData);
    };

    loadData();
  }, []);

  const onClickAddActor = actor => {
    onActorSelected(actor);
    
  };

  const onChangeSearchField = e => {
    let valueSearch = e.target.value;

    if (valueSearch) {
      valueSearch = valueSearch.toLowerCase();
    }
    if (!valueSearch) {
      setViewActors(actors);
    } else {
      const foundActors = actors.filter(a => {
        return (
          a.firstName.toLowerCase().includes(valueSearch) ||
          a.lastName.toLowerCase().includes(valueSearch)
        );
      });
      setViewActors(foundActors);
    }
  };

  return (
    <div>
      
      <table className="table table-hover">
        <tbody>
          <tr>
            <td colSpan="2">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  onChange={onChangeSearchField}
                />
                <div className="input-group-append">
                  <span className="input-group-text">search</span>
                </div>
              </div>
            </td>
          </tr>
          {viewActors.map(act => {
            return (
              <tr>
                <td>{act.firstName + ' ' + act.lastName}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onClickAddActor(act)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ActorsSelectForm.propTypes = {
  onActorSelected: PropTypes.func.isRequired
};
export default ActorsSelectForm;
