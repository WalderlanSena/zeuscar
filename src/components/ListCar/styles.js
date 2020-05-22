import styled from "styled-components";
import { Card } from "@material-ui/core";

export const CardCar = styled(Card)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const Detail = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 10px;
`;

export const ModelText = styled.p`
  color: #787878;
  font-size: 16px;
`;

export const Price = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-left: 1px solid #ccc;
  padding: 10px;
  align-items: center;
`;

export const ButtonBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
