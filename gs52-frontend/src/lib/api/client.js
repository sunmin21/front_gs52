import axios from "axios";
// axios.defaults.baseURL = "http://localhost:8081";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const client = axios.create();
console.log("axios");
/*
글로벌 설정 예시

//API 주소를 다른 곳으로 사용함
client.defaults.baseURL = 'https://external-api-server.com/'

//헤더 설정
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

//인터셉터 설정
axios.intercepter.response.use({
response=>{
    //요청 성공시 특정 작업 수행
    return response;
},
error =>{
    //요청 실패시 특정 작업 수행
    return Promise.reject(error);
}
})

*/

export default client;
