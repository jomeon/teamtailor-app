const { getCandidatesWithApplications } = require('../services/teamtailorService');
const { generateCsv } = require('../services/csvService');

const downloadCandidatesCsv = async (req, res) => {
    try {
        
        const data = await getCandidatesWithApplications();

        const csvString = generateCsv(data);
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="candidates_export.csv"');
        
        res.status(200).send(csvString);
    } catch (error) {
        console.error('Error in export controller:', error);
        res.status(500).json({ 
            error: 'There was an error generating the CSV file. Please try again later.' 
        });
    }
};

module.exports = {
    downloadCandidatesCsv
};