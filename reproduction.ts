import { cafeQuerySchema } from './schemas/cafes.dto'; const result = cafeQuerySchema.safeParse({ priceRange: 'LOW,MEDIUM' }); console.log(JSON.stringify(result, null, 2));
