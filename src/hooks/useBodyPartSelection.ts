import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

export const useBodyPartSelection = () => {
  const { bodyParts, toggleBodyPart } = useAppContext();
  
  const selectedParts = useMemo(() => 
    bodyParts.filter(part => part.selected), 
    [bodyParts]
  );
  
  return { bodyParts, toggleBodyPart, selectedParts };
};