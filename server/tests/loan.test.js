import request from 'supertest';
import User from '../src/models/auth_model.js';
import app from '../src/routes/auth_routers.js'; // Your Express app instance



describe('POST /signup', () => {
    beforeEach(async () => {
        const t = await User.find()
        console.log(t)
      await User.deleteMany({});
    }, 50000); 

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('firstName', 'John');
    expect(res.body).toHaveProperty('lastName', 'Doe');
    expect(res.body).toHaveProperty('email', 'johndoe@example.com');
    expect(res.body).not.toHaveProperty('password');
  });

  it('should return a 500 error if an error occurs during user creation', async () => {
    // This test case assumes that the `save` method of the `User` model always throws an error
    jest.spyOn(User.prototype, 'save').mockImplementation(() => {
      throw new Error('An error occurred');
    });

    const res = await request(app)
      .post('/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      })
      .expect(500);

    expect(res.body).toHaveProperty('error', 'An error occurred');
  });
});
