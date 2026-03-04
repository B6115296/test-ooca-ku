import { MemberPromotion } from './../../src/promotions/member.promotion';
import { MenuItem } from 'src/domain/menu.enum';

describe('MemberPromotion', () => {
  let promotion: MemberPromotion;

  beforeEach(() => {
    promotion = new MemberPromotion();
  });

  it('should apply 10% discount for member', () => {
    const items = new Map<MenuItem, number>();
    const total = 100;
    const result = promotion.setMember(true).apply(items, total);

    expect(result).toBe(90);
  });

  it('should not apply discount for non-member', () => {
    const items = new Map<MenuItem, number>();
    const total = 100;
    const result = promotion.setMember(false).apply(items, total);

    expect(result).toBe(100);
  });
});
