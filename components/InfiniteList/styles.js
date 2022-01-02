import styled from 'styled-components';

export const ListContainer = styled.div`
  display: grid;
  gap: 3em;
  -webkit-box-align: center;
  align-items: center;
  grid-template-columns: repeat(1, 1.2fr);
  grid-template-rows: 240px;
  grid-auto-rows: 240px;
  justify-content: center;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    grid-auto-rows: 240px;
    grid-template-rows: 240px;
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(4, 0.6fr);
    grid-template-rows: 320px;
    grid-auto-rows: 320px;
  }
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
`;
