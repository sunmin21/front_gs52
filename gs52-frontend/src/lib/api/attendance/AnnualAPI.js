import client from "../client";

export const SelectVacation = async () => {
  const annual = await client.post("/annual/select", {
    //사원의 연차정보 전부 가져옴
    vacation_EMP_INDEX: 5,
  });

  return annual;
};

export const SelectEmpVacation = async () => {
  const empvacation = await client.post("/annual/select2", {
    //개인 사원의 잔여 연차 수를 가져옴
    vacation_EMP_INDEX: 5,
  });
  console.log("@@@@");
  console.log(empvacation);

  return empvacation;
};

export const InsertConf = async (floor, room, date) => {
  console.log("Conf API inserrrrrr");
  console.log("floor" + floor);
  console.log("room" + room);
  console.log("date" + date);

  const conf = await client
    .post("/schedule/confRoom/insert", {
      room_BOOK_TITLE: floor,
      room_BOOK_INDEX: room,
      room_BOOK_DATE: date,
    })
    .then(function (response) {
      //response
    })
    .catch(function (error) {
      //오류발생 시
      console.log(error);
    })
    .then(function () {
      //항상실행
    });
};

// post로 값넘기기

// const login = ({ username, password }) =>
//   client.post('/api/auth/login', { username, password });
