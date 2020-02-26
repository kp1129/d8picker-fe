import { useContext } from 'react';
import { StateContext } from '../contexts/Context';

export const useTemplate = () => useContext(StateContext);
