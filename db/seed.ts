import 'dotenv/config';

import { type InsertProduct } from './schema';
import { client } from '.';
import { createProducts } from './mutations';

async function main() {
  const data: InsertProduct[] = [];

  for (let i = 0; i < 200; i++) {
    data.push({
      name: `Product ${i + 1}`,
      description: `Lorem ipsum dolor sit amet`,
      price: Math.floor(Math.random() * 9_990) + 100,
    });
  }

  await createProducts(data);
  client.close();
}

void main();

process.on('SIGINT', () => {
  client.close();
});
