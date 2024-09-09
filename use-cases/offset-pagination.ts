import { countProducts, getProductsByOffset } from '../db/queries';
import validSort from '../lib/valid-sort';

export default async function offsetPaginationUseCase(
  offset: string,
  limit: string,
  sort: string,
) {
  const offsetVal = Number.parseInt(offset, 10);
  const limitVal = Number.parseInt(limit, 10);

  if (isNaN(offsetVal) || !isFinite(offsetVal)) {
    throw new Error('Offset is invalid');
  }

  if (isNaN(limitVal) || !isFinite(limitVal)) {
    throw new Error('Limit is invalid');
  }

  if (!validSort(sort)) {
    throw new Error('Sort value is not supported');
  }

  if (offsetVal < 0) {
    throw new Error('Offset should be positive number');
  }

  if (limitVal < 10 || limitVal > 100) {
    throw new Error('Limit should be within range 10..100');
  }

  const [productsWithCursor, total] = await Promise.all([
    getProductsByOffset(offsetVal, limitVal, sort),
    countProducts(),
  ]);

  return {
    items: productsWithCursor,
    total,
  };
}
