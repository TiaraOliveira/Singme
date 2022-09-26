import { prisma } from '../../database'
import supertest from 'supertest';
import app from '../../app';



beforeEach(async () => {
  await prisma.$queryRaw`TRUNCATE TABLE recommendations`;
});

describe('Test randon recomendations Routes',  () => {
 

  it('Deve retornar 404 caso não encontrem recomendação', async () => {

      
    const result = await supertest(app).get('/recommendations/random').send();
  
    expect(result.status).toBe(404);
    
  });

  

});

afterAll(async () => {
  await prisma.$disconnect();
});
