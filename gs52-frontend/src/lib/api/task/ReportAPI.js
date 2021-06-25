import client from '../client';

export const SelectReport = async (emp) => {

    const report = await client.post('/report/showReport', {
        report_EMP_INDEX : 1
    });
    return report
}