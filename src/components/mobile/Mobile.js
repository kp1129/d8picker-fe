
import React, {useState, useEffect} from 'react'
import TopNav from './NavigationComponents/TopNav'
import Dashboard from './Dashboard'
import MobileEvents from './eventComponents/MobileEvents'
import Nav from './NavigationComponents/Nav'

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
    


    if(NavState === 0){
    return(



    return(
        <>
            {navState===0 && <Dashboard formOpen={formOpen} setFormOpen={setFormOpen} setTemplateFormOpen={setTemplateFormOpen} templateFormOpen={templateFormOpen} conStart={conStart} conEnd={conEnd} summ={summ} selected={selected} setSelected={setSelected} toggleNav={toggleNav} setToggleNav={setToggleNav}/>}
        
            {navState===1 && <>
                <TopNav/>
                <MobileEvents setNavState={setNavState} formOpen={formOpen} setFormOpen={setFormOpen}setTemplateFormOpen={setTemplateFormOpen} templateFormOpen={templateFormOpen} setToggleNav={setToggleNav} toggleNav={toggleNav} conStart={conStart} setConStart={setConStart} conEnd={conEnd} setConEnd={setConEnd} summ={summ} setSumm={setSumm} selected={selected} setSelected={setSelected}></MobileEvents>
            </>}

            {navState===2 && <div>My Groups</div>}

            <Nav navState={navState} setNavState={setNavState} colors={colors}/>
        </>
    )


    
}

export default Mobile

const NavBar = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 83vh;`
