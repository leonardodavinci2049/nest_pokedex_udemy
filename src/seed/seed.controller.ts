import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('v1/seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
