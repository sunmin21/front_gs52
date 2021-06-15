import { useDispatch, useSelector } from "react-redux";
import ComponentsTest from "../components/Test";
import { Home } from "../lib/api/test";
import { change } from "../modules/test";
const CotainersTest = () => {
  const board = useSelector((state) => state.test.board);
  const dispatch = useDispatch();
  console.log(board);
  console.log("@@@@");

  return (
    <>
      <ComponentsTest
        board={board}
        onClick={Home}
        onClick2={() => {
          dispatch(change());
        }}
      />
    </>
  );
};

export default CotainersTest;
