import { type ProductSort } from '../db/schema';

export default function validSort(val: string): val is ProductSort {
  return ['id', 'name', 'price', '-id', '-name', '-price'].includes(val);
}
