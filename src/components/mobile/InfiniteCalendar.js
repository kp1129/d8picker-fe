import React from 'react'
import { FixedSizeList } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

import Calendar from './Calendar';


const InfiniteCalendar = ({ items, moreItemsLoading, loadMore, hasNextPage, events, selected, setSelected, templateFormOpen, api, setTemplateFormOpen, month})=>{

    const Row = ({ index, style }) => {
      if(items[index]){
        console.log('items at index', items[index])
        return (
          <Calendar 
                  style={style}
                  key={index}
                  api={api}
                  i={index}
                  selected={selected}
                  setSelected={setSelected}
                  templateFormOpen={templateFormOpen}
                  setTemplateFormOpen={setTemplateFormOpen}
                  events={events}
                  month={items[index]}
                  monthList={month}
                />
           );
      } else {
        return (<div>Loading</div>)
      }
    }


     const itemCount = hasNextPage ? items.length + 3 : items.length;
   
     return (
       <InfiniteLoader
         
         isItemLoaded={index => index < items.length}
         itemCount={itemCount}
         loadMoreItems={loadMore}
       >
         {({ onItemsRendered, ref }) => {
           return (
            <FixedSizeList
              overscanCount={6}
              height={window.innerHeight}
              width={window.innerWidth-30}
              itemCount={itemCount}
              itemSize={160}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {Row}
            </FixedSizeList>
          )
         }}
     </InfiniteLoader>
     )
}

export default InfiniteCalendar;


