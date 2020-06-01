// import React from 'react'
// import { FixedSizeList } from 'react-window';
// import InfiniteLoader from "react-window-infinite-loader";


// //THIS COMPONENT CAN BE DELETED, IT IS NOT BEING USED BUT KEEPS POPPING UP NONETHELESS
// const InfiniteCalendar = ({ isItemLoaded, items, moreItemsLoading, loadMore, hasNextPage, events, selected, setSelected, templateFormOpen, api, setTemplateFormOpen, month, numOfMonths, indexes, setIndexes})=>{

  

//     const Row = ({ index, style }) => {
      
//       if(items[index]){

//         return (
//           <div style={style}>
//             <p>{items[index].format('MMMM')}</p>
//           </div>
            

//            );
//       } else {
//         return (<div style={style}>Loading</div>)
//       }
//     }
   
//      return (
//        <InfiniteLoader
         
//          isItemLoaded={isItemLoaded}
//          itemCount={24}
//          loadMoreItems={()=>loadMore()}
//        >
//          {({ onItemsRendered, ref }) => {

//            return (
//             <FixedSizeList
//               overscanCount={3}
//               height={window.innerHeight-20}
//               width={window.innerWidth-10}
//               itemCount={24}
//               itemSize={300}
//               onItemsRendered={onItemsRendered}
//               ref={ref}
//               >
              
//               {Row}
//             </FixedSizeList>
//           )
//          }}
//      </InfiniteLoader>
//      )
// }

// export default InfiniteCalendar;


