import React from 'react';
import { IonSpinner } from '@ionic/react';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="loading-indicator">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  return null; 
};

export default LoadingSpinner;