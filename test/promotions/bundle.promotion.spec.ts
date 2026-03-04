import { BundlePromotion } from '../../src/promotions/bundle.promotion';
import { MenuItem } from '../../src/domain/menu.enum';

describe('BundlePromotion', () => {
  let promotion: BundlePromotion;

  beforeEach(() => {
    promotion = new BundlePromotion();
  });

  it('should apply 5% discount when Orange >= 2', () => {
    const items = new Map<MenuItem, number>([[MenuItem.ORANGE, 2]]);
    const total = 240;
    const result = promotion.apply(items, total);

    expect(result).toBe(228);
  });

  it('should apply discount when Pink >= 2', () => {
    const items = new Map<MenuItem, number>([[MenuItem.PINK, 2]]);
    const total = 160;
    const result = promotion.apply(items, total);

    expect(result).toBe(152);
  });

  it('should not apply discount when quantity < 2', () => {
    const items = new Map<MenuItem, number>([[MenuItem.GREEN, 1]]);
    const total = 40;
    const result = promotion.apply(items, total);

    expect(result).toBe(40);
  });
});
