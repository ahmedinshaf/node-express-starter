const request = require('supertest');
const app = require('./app/index.js');

describe('Todo API', () => {
  let server;
  let testTodo = { text: 'Test todo' };
  let testTodo2 = { text: 'Test todo 2' };
  let testTodo3 = { text: 'Test todo 3' };
  let testTodo4 = { text: 'Test todo 4' };
  let testTodo5 = { text: 'Test todo 5' };

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should pass', () => {
    expect(true).toEqual(true);
  });

  it('should create a new todo', async () => {
    const res = await request(server).post('/todos').send(testTodo);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.text).toEqual(testTodo.text);
  });

  it('should get all todos', async () => {
    const res = await request(server).get('/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].text).toEqual(testTodo.text);
  });

  it('should get a single todo', async () => {
    const res = await request(server).get('/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].text).toEqual(testTodo.text);
    const res2 = await request(server).get(`/todos/${res.body[0]._id}`);
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.text).toEqual(testTodo.text);
  });

  it('should update a todo', async () => {
    const res = await request(server).get('/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].text).toEqual(testTodo.text);
    const res2 = await request(server)
      .put(`/todos/${res.body[0]._id}`)
      .send(testTodo2);
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.text).toEqual(testTodo2.text);
  });

  it('should delete a todo', async () => {
    const res = await request(server).get('/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].text).toEqual(testTodo2.text);
    const res2 = await request(server).delete(`/todos/${res.body[0]._id}`);
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.text).toEqual(testTodo2.text);
    const res3 = await request(server).get('/todos');
    expect(res3.statusCode).toEqual(200);
    expect(res3.body.length).toEqual(0);
  });

  it('should create multiple todos', async () => {
    const res = await request(server).post('/todos').send(testTodo3);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.text).toEqual(testTodo3.text);
    const res2 = await request(server).post('/todos').send(testTodo4);
    expect(res2.statusCode).toEqual(201);
    expect(res2.body).toHaveProperty('_id');
    expect(res2.body.text).toEqual(testTodo4.text);
    const res3 = await request(server).post('/todos').send(testTodo5);
    expect(res3.statusCode).toEqual(201);
    expect(res3.body).toHaveProperty('_id');
    expect(res3.body.text).toEqual(testTodo5.text);
  });
});
