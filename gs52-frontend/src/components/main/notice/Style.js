const { default: styled } = require("styled-components");

const Style = () => {
  styled.div`
    & :disabled {
      background-color: white;
    }
  `;
};
