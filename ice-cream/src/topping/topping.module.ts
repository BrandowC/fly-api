import { Module } from '@nestjs/common';
import { ToppingsController } from './topping.controller';
import { ToppingsService } from './topping.service';
import { ToppingsRepository } from './topping.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ToppingsController],
  providers: [ToppingsService, ToppingsRepository, PrismaService],
  exports: [ToppingsService],
})
export class ToppingsModule {}
