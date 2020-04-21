import React from 'react'
import { FixedSizeList } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

const AltCalendar = ({ items, moreItemsLoading, loadMore, hasNextPage })=>{
    const Row = ({ index, style }) => {
      console.log('items', items)
      console.log('index', index)
      console.log('items at index', items[items.length-1])
      return (
        <p style={style}>The index is {index}</p>
         );
    }

    //  console.log('loadMore', loadMore())

    //  console.log('items', items[index])
     const itemCount = hasNextPage ? items.length + 5 : items.length;
   
     return (
       <InfiniteLoader
         
         isItemLoaded={index => index < items.length}
         itemCount={itemCount}
         loadMoreItems={loadMore}
       >
         {({ onItemsRendered, ref }) => {
           return (
            <FixedSizeList
              height={500}
              width={500}
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

export default AltCalendar;