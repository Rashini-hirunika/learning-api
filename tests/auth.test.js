import request from 'supertest';
import app from '../app.js';

describe('Auth API Unit Tests', () => {
  it('should return health check success', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});