import { Test, TestingModule } from '@nestjs/testing';
import { TimelineResolver } from './timeline.resolver';

describe('TimelineResolver', () => {
  let resolver: TimelineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelineResolver],
    }).compile();

    resolver = module.get<TimelineResolver>(TimelineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
