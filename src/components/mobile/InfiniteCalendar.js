import React, {useState} from 'react'
import { FixedSizeList, areEqual} from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";
import Calendar from './Calendar';
import memoize from 'memoize-one';
import AutoSizer from 'react-virtualized-auto-sizer';


const InfiniteCalendar = ({ isItemLoaded, items, moreItemsLoading, loadMore, hasNextPage, events, selected, setSelected, templateFormOpen, api, setTemplateFormOpen, month, numOfMonths, indexes, setIndexes})=>{

  

    const Row = ({ index, style }) => {
      console.log('index', index)
      console.log('items', items)
      if(items[index]){
        // if(!indexes.includes(index)){
        //   setIndexes([...indexes, index])
        //   console.log('indexes', indexes.sort())
        // } else{
        //   console.log('already in there')
        // }

        console.log('numofmonths', numOfMonths)
        return (
          <div style={style}>
            <p>{items[index].format('MMMM')}</p>
            <h1>PLEASE WORK</h1>
          </div>
            
          // <Calendar 
          //         style={style}
          //         key={index}
          //         // api={api}
          //         i={index}
          //         // selected={selected}
          //         // setSelected={setSelected}
          //         // templateFormOpen={templateFormOpen}
          //         // setTemplateFormOpen={setTemplateFormOpen}
          //         // events={events}
          //         month={items[index]}
          //         // monthList={month}
          //         />

           );
      } else {
        return (<div style={style}>Loading</div>)
      }
    }


     const itemCount = hasNextPage ? items.length + 1 : items.length;

     
   
     return (
       <InfiniteLoader
         
         isItemLoaded={isItemLoaded}
        //  isItemLoaded={index => index < items[index]}
         itemCount={24}
         loadMoreItems={()=>loadMore()}
       >
         {({ onItemsRendered, ref }) => {
           console.log('items length', items.length)
          //  const itemData = memoize((items, toggleItemActive) => ({
          //   items,
          //   toggleItemActive,
          // }));
           return (
            <FixedSizeList
              overscanCount={3}
              height={window.innerHeight-20}
              width={window.innerWidth-10}
              // itemData={itemData}
              itemCount={24}
              itemSize={300}
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


