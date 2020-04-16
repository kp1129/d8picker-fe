import React, {useState} from 'react'
import BotNav from './NavigationComponents/BotNav'
import styled from 'styled-components'
import Dashboard from './Dashboard'

const Mobile = () => {

    const [NavState, setNavState] = useState(0)

    const NavBar = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 83vh;`

    return(
        <div>hello moto
            <Dashboard/>
            <NavBar>
            <BotNav NavState={NavState} setNavState={setNavState}></BotNav>
            </NavBar>
        </div>
    )
}

export default Mobile
