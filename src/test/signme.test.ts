import { prisma } from '@prisma/client';
import supertest from 'supertest';
import app from '../app';
import postRecomendations from './factories/postRecomendations';


beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe('Test recomendations Routes',  () => {
 

  it('Deve adicionar uma recomendação e retornar status 201', async () => {

    const user =  await postRecomendations()
    
    const result = await supertest(app).post('/recommendations').send(user);

    expect(result.status).toBe(201);
  
  });

  it('Deve adicionar um titulo repetido e retornar status 409', async () => {

    const user =  await postRecomendations()

    await supertest(app).post('/recommendations').send(user);
    const result = await supertest(app).post('/recommendations').send(user);

    expect(result.status).toBe(201);
  
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});
