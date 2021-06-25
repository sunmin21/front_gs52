import client from '.././client';

export const SelectReport = async () => {

    const report = await client.get('/report/showReport');
    return report
}