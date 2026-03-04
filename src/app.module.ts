import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { BundlePromotion } from './promotions/bundle.promotion';
import { MemberPromotion } from './promotions/member.promotion';

@Module({
  imports: [],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService, BundlePromotion, MemberPromotion],
})
export class AppModule {}
