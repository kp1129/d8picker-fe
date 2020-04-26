import React, { Fragment } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Calendar from './MobileCalendar';


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
    api={data.api}
    i={index}
    selected={data.selected}
    setSelected={data.setSelected}
    templateFormOpen={data.templateFormOpen}
    setTemplateFormOpen={data.setTemplateFormOpen}
    events={data.events}
    month={data.items[index]}
    eventDatesArr={data.eventDatesArr}
    summaries={data.summaries}
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

export default function NewInfCal({ items, api, selected, setSelected, templateFormOpen, setTemplateFormOpen, events, month, eventDatesArr, summaries}) {

  
  
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
              // style={{border: '1px solid blue'}}
              height={window.innerHeight-115}
              itemCount={50}
              itemSize={817}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={window.innerWidth}
              itemData={{items, api, selected, setSelected, templateFormOpen, setTemplateFormOpen, events, month, eventDatesArr, summaries}}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      </Fragment>
    );
  }