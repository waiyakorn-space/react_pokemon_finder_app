import React, { Component } from 'react'
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query:"eevee",
      pokemon:"",
      err:""
    }
  }
  componentDidMount(){
    this.getPokemon(this.state.query)
  }
  getPokemon = async () => {
    try{
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query.toLocaleLowerCase()}`)
      const data = await res.json();
      // console.log(res);
      console.log('data',data);
      this.setState({
        pokemon:data,
        err:null
      })

    }catch(err){
      this.setState({
        pokemon:null,
        err
      })
      console.log(err)
      
    }
  }

  handleChange = e => {
    this.setState({query: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.getPokemon(e.target.value)
  }

  render() {
    console.log(this.state.query)
    return (
          <>
          <div className="main-div">
            <form onSubmit={this.handleSubmit}>
              <h3>Search Pokemon</h3>
              <input type="text" onChange={this.handleChange} value={this.state.query} />
              <input type="submit" value="Search" />
            </form>    
            {this.state.pokemon && !this.state.err ? (
            <div className="pokemon-pic">
            <img src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.pokemon.id}.png`} alt={this.state.pokemon.name} />
            <h2 className="pokemon-name-title">{this.state.pokemon.name}</h2>
            </div>
            ) : (            
            <div className="error">
            <img className="img-error" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nuvola_apps_error.svg/1200px-Nuvola_apps_error.svg.png" alt="" />
            <h2>Whoops! couldn't find that pokemon</h2>
            </div>)}
          </div>
          </ >
    )
  }
}


