import React from 'react';
import {StatusBar} from 'react-native';

import {Container} from './styles';

const Layout = ({children}) => {
  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {children}
    </Container>
  );
};

export default Layout;
