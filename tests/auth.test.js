
import request from 'supertest';
import app from '../app.js';

describe('Auth API Unit Tests', () => {
  // Test health check endpoint
  it('should return health check success', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('API is running');
  });

  // Test registration with missing fields validation
  it('should fail registration when fields are missing', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        name: '',
        email: '',
        password: '',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  // Test login with missing credentials validation
  it('should fail login when credentials are missing', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: '',
        password: '',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
});