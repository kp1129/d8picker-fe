import React from 'react';
import { Box } from '@chakra-ui/core';
import Cell from './Cell';


const DisabledDays = ({ days }) => {
  return (
    <>
      {[...Array(days).keys()].map(i => (
        <Cell
          className="calendar-days-item faded"
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          key={i}
        >
          <Box backgroundColor="gray.100" h="100%" />
        </Cell>
      ))}
    </>
  );
};

export default DisabledDays;