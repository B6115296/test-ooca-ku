import { MenuItem } from '../domain/menu.enum';

export interface Promotion {
  apply(items: Map<MenuItem, number>, total: number): number;
}
