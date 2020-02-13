import React, {useState} from 'react'
import Template from './Template'






//brings up modal for user to generate a new template and add to list of preexisting ones. 
const addTemplate = () => {
  console.log('a modal will pop when the button is clicked')
}


//grabs users list of existing templates, and populated the field. 
const TemplateList = () => {

  //place holder list to be replaced by axios call
  const [list, setList] = useState([
    {
      id:1,
      name:'basketball'
    },
    {
      id:2,
      name:'math class'
    },
    {
      id:3,
      name:'beer drinking'
    }
  ])


  return (
    <div>
      {list.map(temp => {
        return( <Template
          key={temp.id}
          thing={temp.name}
        />)
      })}
      <button onClick={() => addTemplate()}> + New Template </button>
    </div>
  )
}

export default TemplateList
