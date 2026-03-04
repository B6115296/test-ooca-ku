import { Injectable } from '@nestjs/common';
import { Promotion } from './promotion.interface';
import { MenuItem } from '../domain/menu.enum';

@Injectable()
export class BundlePromotion implements Promotion {
  private bundleItems = [MenuItem.ORANGE, MenuItem.PINK, MenuItem.GREEN];

  apply(items: Map<MenuItem, number>, total: number): number {
    for (const item of this.bundleItems) {
      const qty = items.get(item) ?? 0;
      if (qty >= 2) {
        return total * 0.95;
      }
    }
    return total;
  }
}
