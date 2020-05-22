import styled from "styled-components";
import { Card } from "@material-ui/core";

export const CardCar = styled(Card)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 980px;
  min-width: 300px;
  margin: 0 auto;
  padding: 0 30px;
`;

export const Price = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-left: 1px solid #ccc;
  padding: 10px;
  align-items: center;
`;
