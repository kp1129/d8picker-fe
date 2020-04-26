
import React, {useState, useEffect} from 'react'
import TopNav from './NavigationComponents/TopNav'
import Dashboard from './Dashboard'
import MobileEvents from './eventComponents/MobileEvents'
import Nav from './NavigationComponents/Nav'
import Groups from './Groups'

const Mobile = () => {
    // 0 = calendar, 1 = events, 2 = groups
    const [navState, setNavState] = useState(2) 
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
        <>
            {navState===0 && <Dashboard formOpen={formOpen} setFormOpen={setFormOpen} setTemplateFormOpen={setTemplateFormOpen} templateFormOpen={templateFormOpen} conStart={conStart} conEnd={conEnd} summ={summ} selected={selected} setSelected={setSelected} toggleNav={toggleNav} setToggleNav={setToggleNav} setNavState={setNavState}/>}
        
            {navState===1 && <>
                <TopNav/>
                <MobileEvents setNavState={setNavState} formOpen={formOpen} setFormOpen={setFormOpen} setTemplateFormOpen={setTemplateFormOpen} templateFormOpen={templateFormOpen} setToggleNav={setToggleNav} toggleNav={toggleNav} conStart={conStart} setConStart={setConStart} conEnd={conEnd} setConEnd={setConEnd} summ={summ} setSumm={setSumm} selected={selected} setSelected={setSelected}></MobileEvents>
            </>}

            {navState===2 && <Groups/>}

            <Nav navState={navState} setNavState={setNavState} colors={colors} setTemplateFormOpen={setTemplateFormOpen} setFormOpen={setFormOpen} setSelected={setSelected} setToggleNav={setToggleNav}/>
        </>
    )


    
}

export default Mobile


