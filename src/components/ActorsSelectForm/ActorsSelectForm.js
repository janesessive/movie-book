import React, { useState, useEffect } from "react";
import * as dataService from "../../dataService";

const ActorsSelectForm = props => {
  let [actors, setActors] = useState([]);
  let [selectedActors, setSelectedActors] = useState([]);
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
    let selectedNewActors = [...selectedActors];
    selectedNewActors.push(actor);
    setSelectedActors(selectedNewActors);
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
      <pre>{JSON.stringify(selectedActors, null, 2)}</pre>
      <table className="table table-hover">
        <tbody>
          <tr>
            <td colSpan="2">
              <input
                type="text"
                style={{ width: "100%" }}
                onChange={onChangeSearchField}
              />
            </td>
          </tr>
          {viewActors.map(act => {
            return (
              <tr>
                <td>{act.firstName + " " + act.lastName}</td>
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

export default ActorsSelectForm;
