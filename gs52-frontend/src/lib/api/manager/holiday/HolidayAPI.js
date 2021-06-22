import client from '../../client';

export const SelectHoliday = async () => {
    console.log("test");

    const holiday = await client.get('/holiday/showHoliday');
    console.log(holiday.data);
};

export const InsertHoliday = async (title, date) => {
    console.log("Holiday API Insert !!");
    console.log("title : " + title + " date : " + date);

    const holiday = await client.post('/holiday/showHoliday/AddHoliday', { holiday_title: title, holiday_date: date })
    .then(function (response) {
    
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // 항상 실행되는 부분
    });
}