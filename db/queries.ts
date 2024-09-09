import { asc, count, desc, gt } from 'drizzle-orm';
import { type Product, type ProductSort, products } from './schema';
import { db } from '.';

function convertOrderBy(sort: ProductSort) {
  switch (sort) {
    case 'id': return asc(products.id);
    case 'name': return asc(products.id);
    case 'price': return asc(products.id);
    case '-id': return desc(products.id);
    case '-name': return desc(products.id);
    case '-price': return desc(products.id);
  }
}

export async function countProducts(): Promise<number> {
  const [record] = await db.select({ value: count() }).from(products);
  return record?.value ?? 0;
}

export async function getLastProduct(): Promise<Product | null> {
  const [record] = await db.select()
    .from(products)
    .orderBy(desc(products.id))
    .limit(1);

  return record ?? null;
}

export async function getProductsByCursor(
  limit: number,
  lastId: number | null = null,
): Promise<Product[]> {
  return db.select()
    .from(products)
    .orderBy(asc(products.id))
    .where(lastId === null ? undefined : gt(products.id, lastId))
    .limit(limit);
}

export async function getProductsByOffset(
  offset: number,
  limit: number,
  sort: ProductSort,
): Promise<Product[]> {
  return db.select()
    .from(products)
    .orderBy(convertOrderBy(sort))
    .offset(offset)
    .limit(limit);
}
