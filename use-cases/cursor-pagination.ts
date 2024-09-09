import { decode, encode } from '../lib/cursor';
import { getLastProduct, getProductsByCursor } from '../db/queries';

const COLLECTION_NAME = 'Product';

export default async function cursorPaginationUseCase(cursor: string, limit: string) {
  const limitVal = Number.parseInt(limit, 10);

  if (isNaN(limitVal) || !isFinite(limitVal)) {
    throw new Error('Limit is invalid');
  }

  if (limitVal < 10 || limitVal > 100) {
    throw new Error('Limit should be within range 10..100');
  }

  let cursorId: number | null = null;

  if (cursor !== '') {
    const cursorObj = decode(COLLECTION_NAME, cursor);

    if (cursorObj === null) {
      throw new Error('Cursor is invalid');
    }

    cursorId = cursorObj.id;
  }

  const [products, lastProduct] = await Promise.all([
    getProductsByCursor(limitVal, cursorId),
    getLastProduct(),
  ]);

  const productsWithCursor = products.map((item) => {
    return {
      ...item,
      cursor: encode(COLLECTION_NAME, item.id),
    };
  });

  const endCursor = productsWithCursor.at(-1)?.cursor ?? null;

  if (endCursor === null || lastProduct === null) {
    return {
      items: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
    };
  }

  const lastCursor = encode(COLLECTION_NAME, lastProduct.id);

  return {
    items: productsWithCursor,
    pageInfo: {
      endCursor,
      hasNextPage: lastCursor !== endCursor,
    },
  };
}
