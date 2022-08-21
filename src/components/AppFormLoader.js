import React from "react";
import styled from "styled-components";

const AppFormLoader = () => {
  return (
    <FormBlockAnimation>
      <div>
        <p></p>
        <div></div>
      </div>
      <div>
        <p></p>
        <div></div>
      </div>
    </FormBlockAnimation>
  );
};

const FormBlockAnimation = styled.div`
  display: flex;
  padding: 1px 4px;
  flex-wrap: wrap;

  & > div {
    flex-grow: 1;
    height: 70px;
    display: flex;
    flex-direction: column;
    padding: 6px;
  }

  & > div > p {
    height: 20px;
    width: 30%;
    animation: skeleton-loading 1s linear infinite alternate;
    border-radius: 4px;
    margin: 8px 0px;
    @keyframes skeleton-loading {
      0% {
        background-color: hsl(200, 10%, 80%);
      }
      100% {
        background-color: hsl(200, 20%, 95%);
      }
    }
  }

  & > div > div {
    max-height: 35px;
    border-radius: 4px;
    height: 35px;
    width: 100%;
    animation: skeleton-loading 1s linear infinite alternate;
    @keyframes skeleton-loading {
      0% {
        background-color: hsl(200, 10%, 80%);
      }
      100% {
        background-color: hsl(200, 20%, 95%);
      }
    }
  }
`;

export default AppFormLoader;
