import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {


    return (
    <div className="ui cards">
      {this.props.pets.map((petObj)=>{
        return <Pet
        isAdopted = {petObj.isAdopted}
        onAdoptPet = {this.props.onAdoptPet}
        pet={{...petObj}}/>
      })}
    </div>
  )
  }
}

export default PetBrowser
