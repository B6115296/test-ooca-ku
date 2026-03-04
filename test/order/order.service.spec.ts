import { MenuItem } from '../../src/domain/menu.enum';
import { OrderService } from '../../src/service/order.service';
import { BundlePromotion } from '../../src/promotions/bundle.promotion';
import { MemberPromotion } from '../../src/promotions/member.promotion';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    service = new OrderService(new BundlePromotion(), new MemberPromotion());
  });

  it('should calculate base price correctly', () => {
    const dto = {
      items: [
        { item: MenuItem.RED, quantity: 1 },
        { item: MenuItem.GREEN, quantity: 1 },
      ],
      isMember: false,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(90);
  });

  it('should apply bundle discount', () => {
    const dto = {
      items: [{ item: MenuItem.ORANGE, quantity: 2 }],
      isMember: false,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(228);
  });

  it('should apply member discount', () => {
    const dto = {
      items: [{ item: MenuItem.RED, quantity: 1 }],
      isMember: true,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(45);
  });

  it('should apply bundle + member discount', () => {
    const dto = {
      items: [{ item: MenuItem.ORANGE, quantity: 2 }],
      isMember: true,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(205.2);
  });

  it('should handle multiple items', () => {
    const dto = {
      items: [
        { item: MenuItem.RED, quantity: 2 },
        { item: MenuItem.BLUE, quantity: 1 },
      ],
      isMember: false,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(130);
  });

  it('should calculate price with all menu items and apply all promotions', () => {
    const dto = {
      items: [
        { item: MenuItem.RED, quantity: 1 },
        { item: MenuItem.GREEN, quantity: 2 },
        { item: MenuItem.BLUE, quantity: 1 },
        { item: MenuItem.YELLOW, quantity: 1 },
        { item: MenuItem.PINK, quantity: 2 },
        { item: MenuItem.PURPLE, quantity: 1 },
        { item: MenuItem.ORANGE, quantity: 2 },
      ],
      isMember: true,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(598.5);
  });

  it('should return 0 when order has no items', () => {
    const dto = {
      items: [],
      isMember: false,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(0);
  });

  it('should NOT apply bundle discount when quantity is less than 2', () => {
    const dto = {
      items: [{ item: MenuItem.ORANGE, quantity: 1 }],
      isMember: false,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(120);
  });

  it('should apply bundle before member discount (promotion order)', () => {
    const dto = {
      items: [{ item: MenuItem.ORANGE, quantity: 2 }],
      isMember: true,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(205.2);
  });

  it('should handle large quantities correctly', () => {
    const dto = {
      items: [{ item: MenuItem.GREEN, quantity: 10 }],
      isMember: false,
    };

    const result = service.calculate(dto);

    expect(result.total).toBe(380);
  });
});
