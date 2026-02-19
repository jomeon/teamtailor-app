const axios = require('axios');
const { getCandidatesWithApplications } = require('../src/services/teamtailorService');

jest.mock('axios');

describe('Teamtailor Service', () => {
    it('should correctly map the data of candidates and their applications', async () => {
        const mockApiResponse = {
            data: {
                data: [{
                    id: '1',
                    attributes: { 'first-name': 'Anna', 'last-name': 'Nowak', email: 'anna@example.com' },
                    relationships: { 'job-applications': { data: [{ id: 'app1' }] } }
                }],
                included: [{
                    id: 'app1',
                    type: 'job-applications',
                    attributes: { 'created-at': '2024-01-01T10:00:00Z' }
                }]
            }
        };
        
        axios.get.mockResolvedValue(mockApiResponse);
        
        const result = await getCandidatesWithApplications();
        
        expect(result).toHaveLength(1);
        expect(result[0].first_name).toBe('Anna');
        expect(result[0].job_application_id).toBe('app1');
        expect(result[0].job_application_created_at).toBe('2024-01-01T10:00:00Z');
    });
});