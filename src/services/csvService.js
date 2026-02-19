const { Parser } = require('json2csv');

const generateCsv = (data) => {
    const fields = [
        'candidate_id', 
        'first_name', 
        'last_name', 
        'email', 
        'job_application_id', 
        'job_application_created_at'
    ];
    
    try {
        
        const json2csvParser = new Parser({ fields });
        const csvData = json2csvParser.parse(data);
        
        return csvData;
    } catch (error) {
        console.error('Error generating CSV file:', error);
        throw new Error('Could not parse data to CSV');
    }
};

module.exports = {
    generateCsv
};