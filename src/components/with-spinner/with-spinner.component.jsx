import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// Wrapped component is any other component that uses this HOC
const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  }
  return Spinner;
};

export default WithSpinner;

