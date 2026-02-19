const axios = require('axios');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCandidatesWithApplications = async () => {
    try {
        let url = 'https://api.teamtailor.com/v1/candidates?include=job-applications';
        let allCandidates = [];
        let allIncluded = [];

        while (url) {
            console.log(`I am downloading data from: ${url}`);
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Token token=${process.env.TEAMTAILOR_API_KEY}`,
                    'X-Api-Version': '20240404',
                    'Accept': 'application/vnd.api+json'
                }
            });

            allCandidates = allCandidates.concat(response.data.data);
            if (response.data.included) {
                allIncluded = allIncluded.concat(response.data.included);
            }

            url = response.data.links && response.data.links.next ? response.data.links.next : null;

            if (url) {
                await delay(200); 
            }
        }

        console.log(`Total downloads ${allCandidates.length} of candidates.`);

        const applicationsMap = {};
        allIncluded.forEach(item => {
            if (item.type === 'job-applications') {
                applicationsMap[item.id] = item;
            }
        });

        const flatData = [];

        allCandidates.forEach(candidate => {
            const candidateId = candidate.id;
            const firstName = candidate.attributes['first-name'] || '';
            const lastName = candidate.attributes['last-name'] || '';
            const email = candidate.attributes.email || '';

            const jobAppRelationships = candidate.relationships?.['job-applications']?.data || [];

            if (jobAppRelationships.length === 0) {
                flatData.push({
                    candidate_id: candidateId,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    job_application_id: 'N/A',
                    job_application_created_at: 'N/A'
                });
            } else {
                jobAppRelationships.forEach(rel => {
                    const appData = applicationsMap[rel.id];
                    flatData.push({
                        candidate_id: candidateId,
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        job_application_id: rel.id,
                        job_application_created_at: appData ? appData.attributes['created-at'] : 'N/A'
                    });
                });
            }
        });

        return flatData;
    } catch (error) {
        console.error('Error while retrieving data from Teamtailor:', error.response?.data || error.message);
        throw new Error('Failed to fetch data from API');
    }
};

module.exports = {
    getCandidatesWithApplications
};