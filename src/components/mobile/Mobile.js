import Nav from './Nav';
import React, {useState} from 'react'
import BotNav from './NavigationComponents/BotNav'
import MobileEvents from './eventComponents/MobileEvents'
import styled from 'styled-components'
import Dashboard from './Dashboard'
import NewEventButton from './NavigationComponents/NewEventButton'
import NewEventForm from './eventComponents/NewEventForm'

const Mobile = () => {

    const [NavState, setNavState] = useState(0) // 0 = calendar, 1 = events, 2 = groups

    const[formOpen, setFormOpen] = useState(false);
    const [templateFormOpen, setTemplateFormOpen] = useState(false);
    const [conStart, setConStart] = useState("");
    const [conEnd, setConEnd] = useState("");
    const [summ, setSumm] = useState("")
    const [toggleNav, setToggleNav] = useState(true);
    const [selected, setSelected] = useState([]);

    const NavBar = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 83vh;`
    if(NavState === 0){
    return(


        <div >
            
            <Dashboard formOpen={formOpen} setFormOpen={setFormOpen} setTemplateFormOpen={setTemplateFormOpen} templateFormOpen={templateFormOpen} conStart={conStart} conEnd={conEnd} summ={summ} selected={selected} setSelected={setSelected} toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <NewEventButton setNavState={setNavState} />
            <NavBar>
            {toggleNav && <BotNav NavState={NavState} setNavState={setNavState}></BotNav>}
            </NavBar>
        </div>
    )
    } else if(NavState === 1){
        return(
        <div>hello im events

            <MobileEvents setNavState={setNavState} formOpen={formOpen} setFormOpen={setFormOpen}setTemplateFormOpen={setTemplateFormOpen} templateFormOpen={templateFormOpen} setToggleNav={setToggleNav} toggleNav={toggleNav} conStart={conStart} setConStart={setConStart} conEnd={conEnd} setConEnd={setConEnd} summ={summ} setSumm={setSumm} selected={selected} setSelected={setSelected}></MobileEvents>
            <NavBar>
            <BotNav NavState={NavState} setNavState={setNavState}></BotNav>
            </NavBar>
        </div>
        )
    } else if(NavState === 2){
        return(
            <div>hello im groups
            <Nav NavState={NavState} setNavState={setNavState} />
        </div>
        )
    } else if(NavState === 3){
        return(
            <div>hello im new event form
            <NewEventForm />
        </div>
        )
    }
}

export default Mobile
