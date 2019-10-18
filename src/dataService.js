import axios from 'axios';


export const getGenres = async() => {
    const response = await axios.get('genres');
    const genres = response.data;
    
    return genres;

};
export const getActors = async() => {
  const response = await axios.get('actors');
  const actors = response.data;
  
  return actors;

};

export const getActor = async(id) => {
  const response = await axios.get('actors/'+ id);
  const actors = response.data;
  
  return actors;

};
export const getGenre = async(id) => {
  const response = await axios.get('genres/'+ id);
  const genres = response.data;
  
  return genres;

};
// export const getExpenses = async(filter) => {
   

//   const response = await axios.get('expenses', {params:filter});
//   return response.data;

// };


export const addGenre=async(genre)=>{
  const response = await axios.post('genres', genre);
  return response;
};
export const addActor=async(actor)=>{
  const response = await axios.post('actors', actor);
  return response;
};
// export const addExpense=async(expense)=>{
//   const response = await axios.post('expenses', expense);
//   return response;
// };



export const editGenre=async(genre)=>{
  const url = `genres/${genre._id}`;
  const response = await axios.put(url, genre);
 
  return response;
};
export const editActor=async(actor)=>{
  const url = `actors/${actor._id}`;
  const response = await axios.put(url, actor);
 
  return response;
};
// export const editExpense=async(expense)=>{
//   const url = `expenses/${expense._id}`;
//   const response = await axios.put(url, expense);
//   return response;
// };



export const deleteGenre=async(genreId)=>{
const url = `genres/${genreId}`;
  const response = await axios.delete(url);
  return response;
}
export const deleteActor=async(actorId)=>{
  const url = `actors/${actorId}`;
    const response = await axios.delete(url);
    return response;
  }
// export const deleteExpense=async(expenseId)=>{
//   const url = `expenses/${expenseId}`;
//     const response = await axios.delete(url);
//     return response;
//   }
