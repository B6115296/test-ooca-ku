import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderService } from '../service/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('calculate')
  calculate(@Body() dto: CreateOrderDto) {
    return this.orderService.calculate(dto);
  }
}
