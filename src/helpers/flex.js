import styled from 'styled-components';
import React, { Component } from 'react';

export const Item = styled.div`
  flex: ${props => props.flex || 1};
`;

const Flex = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

export const Column = styled(Flex)`
  flex-direction: column;
`
export const Row = styled(Flex)`
  align-items: center;
`

