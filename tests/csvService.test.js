const { generateCsv } = require('../src/services/csvService');

describe('CSV Service', () => {
    it('should correctly convert the object array to CSV format', () => {
        const mockData = [
            { 
                candidate_id: '1', 
                first_name: 'Jan', 
                last_name: 'Kowalski', 
                email: 'jan@test.com', 
                job_application_id: '100', 
                job_application_created_at: '2023-01-01' 
            }
        ];
        
        const result = generateCsv(mockData);
        
        expect(result).toContain('"candidate_id"');
        expect(result).toContain('"Jan"');
        expect(result).toContain('"100"');
    });
});