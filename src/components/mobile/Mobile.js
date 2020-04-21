import React, {useState} from 'react'
import BotNav from './NavigationComponents/BotNav'
import MobileEvents from './eventComponents/MobileEvents'
import styled from 'styled-components'
import Dashboard from './Dashboard'

const Mobile = () => {

    const [NavState, setNavState] = useState(0) // 0 = calendar, 1 = events, 2 = groups

    const[formOpen, setFormOpen] = useState(false);
    const [templateFormOpen, setTemplateFormOpen] = useState(false);

    const NavBar = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 83vh;`
    if(NavState === 0){
    return(

        <div>hello moto
            <Dashboard formOpen={formOpen} setFormOpen={setFormOpen} setTemplateFormOpen={setTemplateFormOpen} templateFormOpen={templateFormOpen}/>
            <NavBar>
            <BotNav NavState={NavState} setNavState={setNavState}></BotNav>
            </NavBar>
        </div>
    )
    } else if(NavState === 1){
        return(
        <div>hello im events
            <MobileEvents setNavState={setNavState} formOpen={formOpen} setFormOpen={setFormOpen}setTemplateFormOpen={setTemplateFormOpen} templateFormOpen={templateFormOpen}></MobileEvents>
            <NavBar>
            <BotNav NavState={NavState} setNavState={setNavState}></BotNav>
            </NavBar>
        </div>
        )
    } else if(NavState === 2){
        return(
            <div>hello im groups
            <NavBar>
            <BotNav NavState={NavState} setNavState={setNavState}></BotNav>
            </NavBar>
        </div>
        )
    }
}

export default Mobile
