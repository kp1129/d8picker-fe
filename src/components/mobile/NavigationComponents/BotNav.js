import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import BlueCalendar from './calendar-blue.png'
import GrayCalendar from './calendar-dates@3x.png'
import EventsBlue from './events-blue.png'
import EventsGray from './events-gray.png'
import GroupsGray from './groups-gray.png'
import GroupsBlue from './groups-blue.png'
import styled from 'styled-components'


const BotNav = (props) => {

    // const [NavState, setNavState] = useState(0) this state now lives in the Mobile.js component

    const handleEvents = () =>{
        props.setNavState(1)
    }

    const handleCalendar = () =>{
        props.setNavState(0)
    }

    const handleGroups = () =>{
        props.setNavState(2)
    }

    const Spacing = styled.div`
    margin: 5%
    `


    if(props.NavState === 0){
        return(
            <Box
            pos='relative'
            backgroundColor="brand.lightgray"
            width="100%">
                <Flex align="center" justify="center">
                    <Spacing>
                <img src={BlueCalendar} onClick={handleCalendar} alt="Calendar selected"/>
                    </Spacing>
                    <Spacing>
                <img src={EventsGray} onClick={handleEvents} alt="Events"/>
                    </Spacing>
                    <Spacing>
                <img src={GroupsGray} onClick={handleGroups} alt="Groups"/>
                    </Spacing>
                </Flex>
            </Box>
        )
    } else if(props.NavState === 1){
        return(
            <Box
            pos='relative'
            backgroundColor="brand.lightgray"
            w="100%">
                <Flex align="center" justify="center">
                    <Spacing>
                <img src={GrayCalendar} onClick={handleCalendar} alt="Calendar"/>
                    </Spacing>
                    <Spacing>
                <img src={EventsBlue} onClick={handleEvents} alt="Events selected"/>
                    </Spacing>
                    <Spacing>
                <img src={GroupsGray} onClick={handleGroups} alt="Groups"/>
                    </Spacing>
                </Flex>
            </Box>
        )
    } else if (props.NavState === 2){
        return(
            <Box>
                <Flex align="center" justify="center">
                <Spacing>
                <img src={GrayCalendar} onClick={handleCalendar} alt="Calendar"/>
                </Spacing>
                <Spacing>
                <img src={EventsGray} onClick={handleEvents} alt="Events"/>
                </Spacing>
                <Spacing>
                <img src={GroupsBlue} onClick={handleGroups} alt="Groups selected"/>
                </Spacing>
                </Flex>
            </Box>
        )
    }

}

export default BotNav
