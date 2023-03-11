import { Product } from "@prisma/client";

export interface ProductBody extends Omit<Product, "id"> {};