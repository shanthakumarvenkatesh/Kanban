import styled from 'styled-components';

export const BadgeContainer = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 5px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4px;

  p {
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    padding: 4px 2px;
  }
`;
