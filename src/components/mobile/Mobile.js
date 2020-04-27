
import React, {useState, useEffect} from 'react'
import {MobileContext} from '../../contexts/MobileContexts'
import Dashboard from './MobileDashboard'
import MobileEvents from './eventComponents/MobileEvents'
import Nav from './NavigationComponents/Nav'
import Groups from './Groups'

const Mobile = () => {
    // 0 = calendar, 1 = events, 2 = groups
    const [navState, setNavState] = useState(0) 
    const [formOpen, setFormOpen] = useState(false);
    const [templateFormOpen, setTemplateFormOpen] = useState(false);
    const [conStart, setConStart] = useState("");
    const [conEnd, setConEnd] = useState("");
    const [summ, setSumm] = useState("")
    const [toggleNav, setToggleNav] = useState(true);
    const [selected, setSelected] = useState([]);
    const [colors, setColors] = useState(["#BDBDBD", "#BDBDBD", "#BDBDBD"])
    

    //changes the color of the nav icons depending on which components are rendered
    useEffect(()=>{
        let newColors = [...colors];
        newColors[newColors.indexOf("#28807D")] = "#BDBDBD"
        newColors[navState] = "#28807D";
        setColors(newColors)
    },[navState])



    return(
        
        <MobileContext.Provider value={{formOpen, setFormOpen, setTemplateFormOpen, templateFormOpen, conStart, conEnd, summ, selected, setSelected, toggleNav, setToggleNav,setNavState, setConStart, setConEnd, setSumm}}>
            
            {navState===0 && <Dashboard/>}
        
            {navState===1 && <>
                <MobileEvents formOpen={formOpen}></MobileEvents>
            </>}

            {navState===2 && <Groups/>}

            {toggleNav && <Nav navState={navState} setNavState={setNavState} colors={colors} setTemplateFormOpen={setTemplateFormOpen} setFormOpen={setFormOpen} setSelected={setSelected} setToggleNav={setToggleNav}/>}
        </MobileContext.Provider>
    )


    
}

export default Mobile


