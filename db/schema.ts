import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').notNull().primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
});

export type Product = typeof products.$inferSelect;
export type ProductSort = 'id' | 'name' | 'price' | '-id' | '-name' | '-price';
export type InsertProduct = typeof products.$inferInsert;
