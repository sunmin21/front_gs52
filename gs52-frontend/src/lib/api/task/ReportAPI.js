import client from '../client';

export const SelectReport = async ({ emp, weekStart, weekEnd }) => {
    
    console.log("emp : " + emp + " weekstart : " + weekStart + " weekend : " + weekEnd);

    const report = await client.post('/report/showReport', {
        report_EMP_INDEX: emp , weekstart: weekStart, weekend: weekEnd
    });

    return report
}