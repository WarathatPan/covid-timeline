import { Test, TestingModule } from '@nestjs/testing';
import { CovidResolver } from './covid.resolver';

describe('CovidResolver', () => {
  let resolver: CovidResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CovidResolver],
    }).compile();

    resolver = module.get<CovidResolver>(CovidResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
