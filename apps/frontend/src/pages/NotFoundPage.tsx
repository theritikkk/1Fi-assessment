import React from 'react';
import { ErrorState } from '../components/ErrorState.js';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-16">
      <ErrorState
        isNotFound={true}
        title="Page Not Found"
        message="The page or product you are looking for does not exist."
      />
    </div>
  );
};
