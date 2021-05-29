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
      if(this.state.query !== ""){
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query.toLocaleLowerCase()}`)
        const data = await res.json();
        // console.log(res);
        console.log('data',data);
        this.setState({
          pokemon:data,
          err:null
        })
      }else{this.setState({err : "empty"})}
    }catch(err){
      this.setState({
        pokemon:null,
        err
      })
      console.log('error',err)
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
    let{query, pokemon, err} = this.state;
    console.log('query',this.state.query,query)

    return (
          <>
          <div className="main-div">
            <form onSubmit={this.handleSubmit}>
              <h3>Search Pokemon</h3>
              <input type="text" onChange={this.handleChange} value={query} />
              <input type="submit" value="Search" />
            </form>    
            {pokemon && !err ? (
            <div className="pokemon-pic">
            <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
            <h2 className="pokemon-name-title">{pokemon.name}</h2>
            <ul>
            <li>Type : {pokemon.types[0]['type'].name}</li>
            <li>Weight : {pokemon.weight}   Height: {pokemon.height} </li>
            <li>Ability 1 : {pokemon.abilities[0].ability.name}</li>
            <li>Ability 2 : {pokemon.abilities[1].ability.name}</li>
            </ul>
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


