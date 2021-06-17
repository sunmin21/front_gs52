import { useDispatch, useSelector } from "react-redux";
import AnnualTable from "src/components/AnnualManage/AnnualTable";
import AnnualModal from "src/components/AnnualManage/AnnualModal";
import ComponentsTest from "../components/Test";
import { Home } from "../lib/api/test";
import { change } from "../modules/test";
const CotainersTest = () => {
  const board = useSelector((state) => state.test.board);
  const dispatch = useDispatch();

  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <AnnualModal></AnnualModal>
        </div>
      </div>
      <div class="row">
        <div class="col w-100">
          <AnnualTable></AnnualTable>
        </div>
      </div>
    </div>
  );
};

export default CotainersTest;
