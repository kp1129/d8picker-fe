import React, {useState, useEffect} from 'react'
import MobileTemplateContainer from './MobileTemplateContainer.js'
import styled from 'styled-components'

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
    const { currentUser, handleSignOut } = googleApi;



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