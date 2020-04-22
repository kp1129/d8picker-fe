import React, {useState, useEffect} from 'react'
import NewEventForm from './NewEventForm'
import MobileTemplateContainer from './MobileTemplateContainer.js'
import styled from 'styled-components'

import { Flex, Box, Grid } from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../../contexts/auth';


const getTemplateList = async ({ googleId }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${googleId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };


const MobileEvents = ({setNavState, setFormOpen, formOpen, setTemplateFormOpen, templateFormOpen, setToggleNav, toggleNav, conStart,setConStart, conEnd, setConEnd, summ, setSumm, selected, setSelected}) => {

  

    const { googleApi, api } = useAuth();

    const [templateList, setTemplateList] = useState([]);
    // const [templateFormOpen, setTemplateFormOpen] = useState(false);
    // const [formOpen, setFormOpen] = useState(false);
    // const [selected, setSelected] = useState([]);
    const [shadow, setShadow] = useState("");
    const { currentUser, handleSignOut } = googleApi;
    console.log(templateList)
    console.log('formOpen', formOpen);


    useEffect(() => {
        (async () => {
          const templates = await getTemplateList(currentUser);
          setTemplateList(templates);
        })();
      }, [currentUser, formOpen]);


      const [events, setEvents] = useState(null);

      // get events from api and set to state
      useEffect(() => {
        (async () => {
          try {
            const data = await api.listEvents();
            setEvents(data);
          } catch (error) {
            console.log(error);
          }
        })();
      }, [api]);


  

    const FixedMobile = styled.div`
    border: 5px black;
    `

    return(
          <FixedMobile>
            <MobileTemplateContainer
            setSelected={setSelected}
            selected={selected}
            templateFormOpen={templateFormOpen}
            setTemplateFormOpen={setTemplateFormOpen}
            setNavState={setNavState}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            setTemplateList={setTemplateList}
            currentUser={currentUser}
            templateList={templateList}
            setToggleNav={setToggleNav} 
            toggleNav={toggleNav}
            conStart={conStart} 
            setConStart={setConStart} 
            conEnd={conEnd} 
            setConEnd={setConEnd} 
            summ={summ} 
            setSumm={setSumm}
          />
            </FixedMobile>

    )

    
}

export default MobileEvents




// import Calendar from './calendarComponents/Calendar.js';
// import ProfileInfo from './ProfileInfo'





// const Dashboard = ({ setUserState }) => {
//   const { googleApi, api } = useAuth();

//   const [templateList, setTemplateList] = useState([]);
//   const [templateFormOpen, setTemplateFormOpen] = useState(false);
//   const [formOpen, setFormOpen] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const [shadow, setShadow] = useState("");
//   const { currentUser, handleSignOut } = googleApi;
//   console.log(templateList)
//   console.log('formOpen', formOpen);

//   useEffect(() => {
//     (async () => {
//       const templates = await getTemplateList(currentUser);
//       setTemplateList(templates);
//     })();
//   }, [currentUser, formOpen]);

//   //highlights calendar based on whether choose dates button is active or not
//   useEffect(() => {
//     if (templateFormOpen) {
//       setShadow("0px 0px 19px 7px rgba(99,179,237,1)")
//     } else {
//       setShadow("");
//     }
//   }, [templateFormOpen])



//   // state to show users events
//   const [events, setEvents] = useState(null);

//   // get events from api and set to state
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await api.listEvents();
//         setEvents(data);
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, [api]);




//   return (
//     <Box
//       pos="relative"
//       backgroundColor="brand.lightgray"
//       p={[4, 16]}
//       minHeight="100vh"
//     >
//       <Grid
//         width="100%"
//         gap={4}
//         templateColumns={['1fr', '250px 1fr']}
//         gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
//       >
//         <Flex
//           className="sidebar"
//           gridArea="sidebar"
//           direction="column"
//           align="center"
//         >
//           <ProfileInfo currentUser={currentUser} handleSignOut={handleSignOut} setUserState={setUserState} />
        //   <TemplateContainer
        //     setSelected={setSelected}
        //     selected={selected}
        //     templateFormOpen={templateFormOpen}
        //     setTemplateFormOpen={setTemplateFormOpen}

        //     formOpen={formOpen}
        //     setFormOpen={setFormOpen}
        //     setTemplateList={setTemplateList}
        //     currentUser={currentUser}
        //     templateList={templateList}
        //   />
//         </Flex>
//         <Box className="calendarArea" gridArea="main" style={{ boxShadow: shadow }}>
//           <Calendar
//             api={api}
//             selected={selected}
//             setSelected={setSelected}
//             templateFormOpen={templateFormOpen}
//             setTemplateFormOpen={setTemplateFormOpen}
//             events={events}
//           />
//         </Box>
//       </Grid>
//     </Box>
//   );
// };
