import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import { ProductBody } from "../src/types/productTypes.js";

const prisma = new PrismaClient();

async function main() {
  let products: ProductBody[] = [];
  for (let i = 0; i < 50; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price()
    })
  }

  await prisma.product.createMany({ data: products });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });