import { Injectable } from '@nestjs/common';
import { Promotion } from './promotion.interface';
import { MenuItem } from '../domain/menu.enum';

@Injectable()
export class MemberPromotion implements Promotion {
  private isMember = false;

  setMember(isMember: boolean): Promotion {
    this.isMember = isMember;
    return this;
  }

  apply(items: Map<MenuItem, number>, total: number): number {
    if (this.isMember) {
      return total * 0.9;
    }
    return total;
  }
}
