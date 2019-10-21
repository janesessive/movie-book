import React, { Component } from "react";
import "./Genres.css";
import GenreForm from "../GenreForm/GenreForm";
import * as dataService from "../../dataService";
import DataTable from '../DataTable/DataTable';

class Genres extends Component {
  state = {
    genres: [],
    isEditMode: false,
    currentGenre: {
      _id: null,
      name: ''
    }
  };
  loadGenres=async()=>{
    const genres = await dataService.getGenres();
    this.setState({ genres });
  }

  componentDidMount = async () => {
    this.loadGenres();
  };
  // async componentDidMount() {
  //   try {
  //     let response = await fetch("http://localhost:4000/api/genres");
  //     if (response.ok) {
  //     let data = await response.json();
  //     console.log(data);
  //     } else {
  //       console.log("network error")
  //     }

  //   } catch (error) {
  //     console.log("no connection");

  //   }

  // }
  onClickEditHandler = genre => {
    this.setState({
      currentGenre: {
        ...genre //do clone itself
      },
      isEditMode: true
    });
  };

  onSelectedRecord = (genre, e) => {
    const index = this.state.genres.findIndex(e => e._id === genre._id);
    if (index !== -1) {
      const genres = [...this.state.genres];
      genres[index] = { ...genre, isSelected: e.target.checked };
      this.setState({ genres });
    }
  };

  onButtonClickMultiDelete = () => {
    const genres = [...this.state.genres];
    const updatedGenres = genres.filter(categ => categ.isSelected !== true);
    this.setState({ genres: updatedGenres });
  };

  deleteRecordHandler = async genreId => {
    await dataService.deleteGenre(genreId);
    await this.loadGenres();
    
  };

  render() {
    return (
      <div>
        <GenreForm />
        <DataTable
              columns={[
                { header: 'Genre', index: 'name' },
              ]}
              records={this.state.genres}
              onMultipleDelete={this.onButtonClickMultiDelete}
              onRecordSelected={this.onSelectedRecord}          
              onRecordEdit={this.onClickEditHandler}
              onRecordDelete={this.deleteRecordHandler}
            />

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
export default Genres;
