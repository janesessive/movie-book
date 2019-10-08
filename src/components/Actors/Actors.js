import React, { Component } from "react";
import "./Actors.css";
import ActorForm from "../ActorForm/ActorForm";
import  * as dataService  from '../../dataService';


class Actors extends Component {

  componentDidMount = async() => {
    const actors = await dataService.getActors();
    this.setState({ actors });
 };

       render() {
       return (
         <div>
           <ActorForm/>
           <pre>{JSON.stringify(this.state, null, 2)}</pre>
         </div>
       );
  
       }
      }
      
export default Actors;
