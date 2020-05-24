import styled from "styled-components";

export const TitlePhotos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ContainerPhotos = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-bottom: 100px;
`;

export const PhotoItem = styled.div`
  width: 250px;
  height: 150px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;

  img {
    width: 250px;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 15px 5px 5px rgba(0, 0, 0, 0.1);
  }
`;
