import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { MenuItem } from '../domain/menu.enum';

class OrderItemDto {
  @Expose()
  @IsDefined()
  @IsEnum(MenuItem)
  item!: MenuItem;

  @Expose()
  @IsDefined()
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[] = [];

  @Expose()
  @IsOptional()
  @IsBoolean()
  isMember: boolean = false;
}
