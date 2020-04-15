import React, {useState} from 'react'
import BotNav from './NavigationComponents/BotNav'
import styled from 'styled-components'

const Mobile = () => {

    const [NavState, setNavState] = useState(0)

    const NavBar = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 83vh;`

    return(
        <div>hello im mobile
            <NavBar>
            <BotNav NavState={NavState} setNavState={setNavState}></BotNav>
            </NavBar>
        </div>
    )
}

export default Mobile
