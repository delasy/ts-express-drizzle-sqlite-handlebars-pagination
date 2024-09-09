import { type InsertProduct, products } from './schema';
import { db } from '.';

export async function createProducts(data: InsertProduct[]) {
  await db.insert(products)
    .values(data)
    .returning();
}
