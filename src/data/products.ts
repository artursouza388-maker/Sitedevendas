import { faker } from '@faker-js/faker';
import { Product } from '../types';

const categories = ['aneis', 'colares', 'brincos', 'pulseiras'] as const;
const materials = ['Ouro 18k', 'Prata 925', 'Ouro Branco', 'Ouro Rose', 'Platina'];

const generateProduct = (id: number): Product => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const material = materials[Math.floor(Math.random() * materials.length)];
  const price = faker.number.float({ min: 150, max: 2500, fractionDigits: 2 });
  const originalPrice = Math.random() > 0.7 ? price * 1.3 : undefined;

  const categoryNames = {
    aneis: ['Anel', 'Aliança', 'Anel Solitário', 'Anel de Noivado'],
    colares: ['Colar', 'Corrente', 'Gargantilha', 'Pingente'],
    brincos: ['Brinco', 'Argola', 'Brinco Gota', 'Brinco Ear Cuff'],
    pulseiras: ['Pulseira', 'Bracelete', 'Pulseira Charm', 'Pulseira Tênis']
  };

  const names = categoryNames[category];
  const baseName = names[Math.floor(Math.random() * names.length)];
  
  return {
    id: `prod-${id}`,
    name: `${baseName} ${faker.lorem.words(2)}`,
    price: Number(price.toFixed(2)),
    originalPrice: originalPrice ? Number(originalPrice.toFixed(2)) : undefined,
    image: `https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/8B5CF6/FFFFFF/png?text=${category}`,
    category,
    description: faker.lorem.sentences(2),
    material,
    inStock: Math.random() > 0.1,
    featured: Math.random() > 0.8
  };
};

export const products: Product[] = Array.from({ length: 24 }, (_, i) => generateProduct(i + 1));

export const featuredProducts = products.filter(p => p.featured).slice(0, 4);
