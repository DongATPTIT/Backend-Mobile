import { Test, TestingModule } from '@nestjs/testing';
import { ApoimentController } from './module/apoiment/apoiment.controller';
import { ApoimentService } from './module/apoiment/apoiment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apoiment } from './databases/entity/apoiment.entity';
import { User } from './databases/entity/user.entity';

describe('ApoimentController', () => {
  let apoimentController: ApoimentController;
  let apoimentService: ApoimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApoimentController],
      providers: [
        ApoimentService,
        {
          provide: getRepositoryToken(Apoiment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    apoimentService = module.get<ApoimentService>(ApoimentService);
    apoimentController = module.get<ApoimentController>(ApoimentController);
  });

  describe('findAll', () => {
    it('should return an array of apoiments', async () => {
      const result: Apoiment[] = [];
      jest.spyOn(apoimentService, 'getAllApoiment').mockImplementation(async () => result);

      expect(await apoimentController.getAllApoiment()).toBe(result);
    });
  });
});
