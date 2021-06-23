import { useDispatch, useSelector } from "react-redux";
import AnnualTable from "src/components/attendance/AnnualManagement/AnnualTable";
import AnnualModal from "src/components/attendance/AnnualManagement/AnnualModal";
import ComponentsTest from "../../components/Test";
import { Home } from "../../lib/api/test";
import { change } from "../../modules/test";
import Test from "../Test";
const AnnualManageMent = () => {
  const board = useSelector((state) => state.test.board);
  const dispatch = useDispatch();

  return (
    <div class="container">
      <div class="row">
        <div class="col w-100">
          <AnnualTable></AnnualTable>
        </div>
      </div>
    </div>
  );
};

export default AnnualManageMent;
