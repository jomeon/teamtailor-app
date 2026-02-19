const request = require('supertest');
const app = require('../src/app');
const axios = require('axios');

jest.mock('axios');

describe('GET /api/export', () => {
    it('should return status 200 and a file in text/csv format', async () => {
        axios.get.mockResolvedValue({ data: { data: [], included: [] } });

        const response = await request(app).get('/api/export');
        
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('text/csv');
        expect(response.headers['content-disposition']).toContain('attachment');
    });
});