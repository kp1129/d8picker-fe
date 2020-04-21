import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid } from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import Calendar from './Calendar';
import dayjs from 'dayjs';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";
import AltCalendar from './AltCalendar'

//gets event templates from backend
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

const Dashboard = ({ setUserState }) => {

  //google OAuth2
  const { googleApi, api } = useAuth();
  const { currentUser, handleSignOut } = googleApi;

  const [templateList, setTemplateList] = useState([]);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  
  // state to show users events
  const [events, setEvents] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  //dates selected to add template to
  const [selected, setSelected] = useState([]);
  //shadow to indicate select date mode is enabled
  const [shadow, setShadow] = useState("");
  
  //sets initial number of months to display
  const [numOfMonths, setNumOfMonths] = useState(8);

  //array which will hold all of the months on the DOM
  const [months, setMonths] = useState([])

  



  //gets event templates assigned to user from backend
  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  //highlights calendar based on whether choose dates button is active or not
  useEffect(() => {
    if (templateFormOpen) {
      setShadow("0px 0px 19px 7px rgba(99,179,237,1)")
    } else {
      setShadow("");
    }
  }, [templateFormOpen])
  

  //dynamically sets the state of months based on the state numOfMonths
  useEffect(()=>{
    setMonths(nextMonth(numOfMonths));
    console.log('months', nextMonth(numOfMonths))
  },[numOfMonths])
  
  //helper function to loop create months in the future based on numOfMonths
  const nextMonth = (numOfMonths) => {
    let arr = [];
    for(let i=0; i<numOfMonths; i++){
      arr.push(dayjs().add(i,'month'));
    }
    return arr;
  }



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


 //infinite loading stuff
const [items, setItems] = useState(nextMonth(2));
const [moreItemsLoading, setMoreItemsLoading] = useState(false);
const [hasNextPage, setHasNextPage] = useState(true);

useEffect(()=>{
  console.log('items has changed')
},[items])

const loadMore = () => {
  console.log('loading more');
  setItems([...items, nextMonth(numOfMonths+ 12)])
}

 //end infinite loading stuff

  
  return (
    <Box
      pos="relative"
      backgroundColor="brand.lightgray"
      p={[4, 16]}
      minHeight="100vh"
    >
      <Grid
        width="100%"
        gap={4}
        templateColumns={['1fr', '250px 1fr']}
        gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
      >
        <Box className="calendarArea" gridArea="main" style={{ boxShadow: shadow }}>
        {months.length > 0 && 
  //       <InfiniteLoader
  //           isItemLoaded={index => index < numOfMonths}
  //           itemCount={itemCount}
  //           loadMoreItems={loadMore}
  //       >
  //         <List
  //           className="List"
  //           height={window.innerHeight}
  //           itemCount={itemCount}
  //           itemSize={1000}
  //           width={window.innerWidth}
  //           months={months}
  //         >
  //           {({index, style}) => {
              
  //             return  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
  //             {console.log('numofmonths', numOfMonths)}
  //             {/* <Calendar 
  //               key={index}
  //               api={api}
  //               i={index}
  //               selected={selected}
  //               setSelected={setSelected}
  //               templateFormOpen={templateFormOpen}
  //               setTemplateFormOpen={setTemplateFormOpen}
  //               events={events}
  //               month={months[index]}
  //               monthList={months}
  //             /> */}
  //             <AltCalendar/>
  //           </div>
  //           }}
  //         </List>
  //     )}
  // </InfiniteLoader>
        <AltCalendar
          items={items}
          moreItemsLoading={moreItemsLoading}
          loadMore={loadMore}
          hasNextPage={hasNextPage}
        />
        
        }
          
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;

