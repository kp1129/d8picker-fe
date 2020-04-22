import React, { useState, createRef, Fragment, PureComponent } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Calendar from './Calendar';


const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const isItemLoaded = index => !!itemStatusMap[index];
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
    }, 2500)
  );
};



export default function NewInfCal({ items}) {

  
  
    return (
      <Fragment>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={2000}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={window.innerHeight}
              itemCount={2000}
              itemSize={100}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={window.innerWidth}
            >
              {({ index, style }) => {
                let label;
                if (itemStatusMap[index] === LOADED) {
                  return <Calendar 
                  style={style}
                  key={index}
                  // api={api}
                //   i={index}
                  // selected={selected}
                  // setSelected={setSelected}
                  // templateFormOpen={templateFormOpen}
                  // setTemplateFormOpen={setTemplateFormOpen}
                  // events={events}
                  month={items[index]}
                  // monthList={month}
                  />
                } else {
                  label = "Loading...";
                }
                return (
                  <div className="ListItem" style={style}>
                    {label}
                  </div>
                );
              }}
            </List>
          )}
        </InfiniteLoader>
      </Fragment>
    );
  }