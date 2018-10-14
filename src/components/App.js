import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (newType) => {
    this.setState({
      filters:{type:newType}
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === "all"){
      fetch("/api/pets")
      .then(response => response.json())
      .then(data=> this.setState({
        pets: data
      },()=>{console.log(this.state.pets)}))
    }else{
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(response => response.json())
      .then(data => this.setState({
        pets:data
      }))
    }

  }

  onAdoptPet = (id) =>{
  //  debugger
    let new_pet
    console.log(this.state)
    new_pet = this.state.pets.find((pet)=>{
      return pet.id === id
    })
    let old_pets = this.state.pets
    old_pets.splice(old_pets.indexOf(new_pet),1)
    new_pet.isAdopted = true
    this.setState({
      pets:[...old_pets, new_pet]
    })

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
              onFindPetsClick = {this.onFindPetsClick}
              onChangeType ={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets = {this.state.pets}
              onAdoptPet = {this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
