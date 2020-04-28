import React, { Fragment, useContext} from "react";
import {MobileContext} from '../../contexts/MobileContexts';
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Calendar from './MobileCalendar';
import AddEventButton from './AddEventButton'


const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

// const isItemLoaded = index => !!itemStatusMap[index];
const isItemLoaded = index => itemStatusMap[index] === 2;
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 10)
  );
};

const Row = ({ data, index, style }) => {
  let label;
  if (itemStatusMap[index] === LOADED) {
    label = <Calendar 
    style={style}
    key={index}
    i={index}
    month={data.items[index]}
    />
  
  } else {
    label = "Loading...";
  }
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
}

export default function NewInfCal({items}) {

  const {templateFormOpen} = useContext(MobileContext);
  
    return (
      <Fragment>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={50}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={window.innerHeight-130}
              itemCount={50}
              itemSize={817}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={window.innerWidth}
              itemData={{items}}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
          {!templateFormOpen && <AddEventButton/>}
      </Fragment>
    );
  }

