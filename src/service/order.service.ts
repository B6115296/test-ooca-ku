import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { MENU_PRICE } from '../domain/menu-price';
import { MenuItem } from '../domain/menu.enum';
import { Promotion } from '../promotions/promotion.interface';
import { MemberPromotion } from '../promotions/member.promotion';
import { BundlePromotion } from '../promotions/bundle.promotion';

@Injectable()
export class OrderService {
  constructor(
    private readonly bundlePromotion: BundlePromotion,
    private readonly memberPromotion: MemberPromotion,
  ) {}

  calculate(dto: CreateOrderDto) {
    const itemsMap = new Map<MenuItem, number>();

    dto.items.forEach((i) => {
      itemsMap.set(i.item, i.quantity);
    });

    let total = this.calculateBasePrice(itemsMap);

    const promotions: Promotion[] = [
      this.bundlePromotion,
      this.memberPromotion.setMember(dto.isMember),
    ];

    promotions.forEach((promo) => {
      total = promo.apply(itemsMap, total);
    });

    return {
      total: Number(total.toFixed(2)),
    };
  }

  private calculateBasePrice(items: Map<MenuItem, number>): number {
    let total = 0;

    items.forEach((qty, item) => {
      total += MENU_PRICE[item] * qty;
    });

    return total;
  }
}
