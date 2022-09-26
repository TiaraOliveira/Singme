import { prisma } from '../../database'
import supertest from 'supertest';
import app from '../../app';



beforeEach(async () => {
  await prisma.$queryRaw`TRUNCATE TABLE recommendations`;
});

describe('Test recomendations get Routes',  () => {
 

  it('Deve adicionar uma recomendação e retornar status 201', async () => {

      
    const result = await supertest(app).get('/recommendations').send();
  
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  

});

afterAll(async () => {
  await prisma.$disconnect();
});
