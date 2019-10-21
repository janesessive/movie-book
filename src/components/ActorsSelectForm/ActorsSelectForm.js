import React, { useState, useEffect } from "react";
import * as dataService from "../../dataService";


const ActorsSelectForm = props => {
    let [actors, setActors] = useState([]);
    let [selectedActors, setSelectedActors] = useState([]);

    useEffect(() => {
      let loadData = async () => {
          let actors = await dataService.getActors();
          setActors(actors);
        }
  
      loadData();
    },[]);

    const onClickAddActor = (actor) => {
      let selectedNewActors = [...selectedActors];
      selectedNewActors.push(actor);
      setSelectedActors(selectedNewActors);



    }

    return (
        <div>
          <pre>{JSON.stringify(selectedActors, null, 2)}</pre>
          <table className="table table-hover">
        <tbody>
          {actors.map(act=>{
            return <tr><td>{act.firstName + ' ' + act.lastName}</td><td><button onClick={()=>onClickAddActor(act)}>Add</button></td></tr>
          })}
          
        </tbody>
      </table>
            </div>
  );
};

export default ActorsSelectForm;