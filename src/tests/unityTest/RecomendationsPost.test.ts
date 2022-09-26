import { jest } from '@jest/globals';
import {recommendationRepository} from '../../repositories/recommendationRepository'
import postRecomendations from '../factories/postRecomendations'
import {recommendationService } from '../../services/recommendationsService'
import recomendationspost from '../factories/post';
import post from '../factories/post';
import emptymusicFactory from '../factories/empty';

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('Testes unitários do voucher service', () => {
  it('Deve inserir uma musica', async () => {
    const post =  await postRecomendations()


    jest
      .spyOn(recommendationRepository, 'findByName')
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, 'create')
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(post);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });



  it('Não deve criar um nome duplicado', async () => {
    const post =  await postRecomendations()

  
    jest
      .spyOn(recommendationRepository, 'findByName')
      .mockImplementationOnce((): any => {
        return {
          post
        };
      });

    const promise = recommendationService.insert(
     post
    );

    expect(promise).rejects.toEqual({
      type: 'conflict',
      message: "Recommendations names must be unique"
    });

    expect(recommendationRepository.create).not.toBeCalled();
  });

 const id = 1

  it('Must upvote a recommendations', async () => {
   
    jest
    .spyOn(recommendationRepository, 'find')
    .mockImplementationOnce((): any => {
      return{
        id:1
      }
    });

  
    jest
      .spyOn(recommendationRepository, 'updateScore')
      .mockImplementationOnce((): any => {});

   
    await recommendationService.upvote(id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    
  });

  it('Must throw a error if not found id', async () => {
   
    jest
    .spyOn(recommendationRepository, 'find')
    .mockResolvedValueOnce(null);

  
    const promise = await recommendationService.getById(id);

    expect(promise).rejects.toEqual({
      type: 'not_found"'
    });
    
  });

  it('Must downvote a recommendations', async () => {
   
    jest
    .spyOn(recommendationRepository, 'find')
    .mockImplementationOnce((): any => {
      return{
        id:1
      }
    });

  
    jest
      .spyOn(recommendationRepository, 'updateScore')
      .mockImplementationOnce((): any => {return {
        score: 10
      };});

      jest
      .spyOn(recommendationRepository, 'remove')
      .mockImplementationOnce((): any => {return {
       
      };}); 

    await recommendationService.downvote(id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).not.toBeCalled();
    
  });

  it('Must remove a recommendations', async () => {
   
    jest
    .spyOn(recommendationRepository, 'find')
    .mockImplementationOnce((): any => {
      return{
        id:1
      }
    });

  
    jest
      .spyOn(recommendationRepository, 'updateScore')
      .mockImplementationOnce((): any => {return {
        score: -6
      };});

      jest
      .spyOn(recommendationRepository, 'remove')
      .mockImplementationOnce((): any => {return {
       
      };});

   
    await recommendationService.downvote(id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });

  it('Must list a music with most ponts', async () => {
   
   const amount = 10  
    jest
      .spyOn(recommendationRepository, 'getAmountByScore')
      .mockImplementationOnce((): any => {});
   
    await recommendationService.getTop(amount);

    expect(recommendationRepository.getAmountByScore).toBeCalled();
        
  });

  it('Must catch a random recomendations', async () => {
  
    const musics = await recomendationspost()
  
     jest
       .spyOn(recommendationRepository, 'findAll')
       .mockResolvedValueOnce(musics).mockResolvedValueOnce(musics);
 
    
     await recommendationService.getRandom();
 
     expect(recommendationRepository.findAll).toBeCalled();
         
   });

   it('Must show all musics', async () => {
  
    const allmusics = post()
  
    jest
    .spyOn(recommendationRepository, 'findAll')
    .mockImplementationOnce((): any => {
      return{
        allmusics
      }
    });
    
     await recommendationService.get();
 
     expect(recommendationRepository.findAll).toBeCalled();
         
   });

   it('Must throw a error if retuns is null', async () => {
  
   
  
    jest
       .spyOn(recommendationRepository, 'findAll')
       .mockResolvedValueOnce(null);
 
    
    const promise = await recommendationService.getRandom();
 
      

     expect(promise).rejects.toEqual({
       type: 'not_found"'
     });
         
   });
});

