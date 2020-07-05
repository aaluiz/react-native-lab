import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Container, Description, StatCount, Stat, Stats, Name} from './styles';

const Repository = ({data}) => {
  return (
    <Container>
      <Name>{data.name}</Name>
      <Description>{data.description}</Description>
      <Stats>
        <Stat>
          <Icon name="star" size={16} color="#333" />
          <StatCount>{data.stars}</StatCount>
        </Stat>
        <Stat>
          <Icon name="code-fork" size={16} color="#333" />
          <StatCount>{data.forks}</StatCount>
        </Stat>
      </Stats>
    </Container>
  );
};

export default Repository;
