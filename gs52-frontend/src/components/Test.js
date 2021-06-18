const ComponentsTest = ({ board, onClick, onClick2 }) => {
    return (
      <>
        <button onClick={onClick}>서버에서 값 호출하기</button>;
        <button onClick={onClick2}>{board}</button>;
      </>
    );
  };
  
  export default ComponentsTest;