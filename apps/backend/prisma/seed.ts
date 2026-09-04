import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for 1Fi Assessment...');

  // Clean existing data
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // 1. Apple iPhone 17 Pro
  const iphone = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'Apple iPhone 17 Pro',
      brand: 'Apple',
      tagline: 'Engineered with Aerospace-grade Titanium and A19 Pro Bionic Architecture.',
      description:
        'iPhone 17 Pro features a lightweight titanium design with sculpted edges, a customizable Action button, powerful camera upgrades including a 48MP Pro Fusion camera with 5x Telephoto, and next-generation A19 Pro silicon for unmatched efficiency.',
      baseMrp: 134900,
      basePrice: 127400,
      badge: 'New Launch',
      rating: 4.9,
      reviewCount: 3420,
      highlights: [
        'A19 Pro chip with 6-core GPU and hardware ray tracing',
        '48MP Pro Fusion camera system with 5x optical Telephoto',
        'Super Retina XDR display with ProMotion 120Hz & Always-On',
        'All-day battery life with Qi2 fast wireless charging',
        'Action Button with customizable shortcuts & tactile haptics'
      ],
      variants: {
        create: [
          {
            sku: 'IP17P-256-DESERT',
            colorName: 'Desert Titanium',
            colorHex: '#C5B49F',
            storage: '256GB',
            mrp: 134900,
            price: 127400,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: true,
            inStock: true
          },
          {
            sku: 'IP17P-256-ORANGE',
            colorName: 'Cosmic Coral',
            colorHex: '#E06B43',
            storage: '256GB',
            mrp: 134900,
            price: 127400,
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          },
          {
            sku: 'IP17P-256-SILVER',
            colorName: 'Natural Silver',
            colorHex: '#E2E4E5',
            storage: '256GB',
            mrp: 134900,
            price: 127400,
            imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          },
          {
            sku: 'IP17P-512-DESERT',
            colorName: 'Desert Titanium',
            colorHex: '#C5B49F',
            storage: '512GB',
            mrp: 154900,
            price: 147400,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          },
          {
            sku: 'IP17P-512-SILVER',
            colorName: 'Natural Silver',
            colorHex: '#E2E4E5',
            storage: '512GB',
            mrp: 154900,
            price: 147400,
            imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          }
        ]
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 3,
            interestRate: 0,
            monthlyPayment: 42467,
            cashback: 7500,
            isRecommended: false,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹2,100'
          },
          {
            tenureMonths: 6,
            interestRate: 0,
            monthlyPayment: 21233,
            cashback: 7500,
            isRecommended: true,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹4,250'
          },
          {
            tenureMonths: 9,
            interestRate: 0,
            monthlyPayment: 14156,
            cashback: 7500,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹6,400'
          },
          {
            tenureMonths: 12,
            interestRate: 0,
            monthlyPayment: 10617,
            cashback: 7500,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹8,600'
          },
          {
            tenureMonths: 24,
            interestRate: 8.5,
            monthlyPayment: 5840,
            cashback: 5000,
            planType: 'LOW_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹17,900'
          }
        ]
      }
    }
  });

  // 2. Samsung Galaxy S24 Ultra
  const samsung = await prisma.product.create({
    data: {
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      tagline: 'Galaxy AI is here. Epic titanium shield with built-in S Pen.',
      description:
        'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8-inch flat display. It is an absolute design marvel powered by Galaxy AI and a pro-grade 200MP camera.',
      baseMrp: 129999,
      basePrice: 119999,
      badge: 'Galaxy AI Bestseller',
      rating: 4.8,
      reviewCount: 2890,
      highlights: [
        'Snapdragon 8 Gen 3 for Galaxy with ray-tracing boost',
        '200MP Quad Telephoto camera with AI ProVisual engine',
        'Built-in S-Pen for sketching, notes & Circle to Search',
        'Corning Gorilla Armor glass reducing 75% surface reflections',
        '7 years of major Android OS and security upgrades'
      ],
      variants: {
        create: [
          {
            sku: 'S24U-256-GRAY',
            colorName: 'Titanium Gray',
            colorHex: '#676664',
            storage: '256GB',
            mrp: 129999,
            price: 119999,
            imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: true,
            inStock: true
          },
          {
            sku: 'S24U-256-BLACK',
            colorName: 'Titanium Black',
            colorHex: '#2B2A29',
            storage: '256GB',
            mrp: 129999,
            price: 119999,
            imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          },
          {
            sku: 'S24U-256-VIOLET',
            colorName: 'Titanium Violet',
            colorHex: '#4B4453',
            storage: '256GB',
            mrp: 129999,
            price: 119999,
            imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          },
          {
            sku: 'S24U-512-GRAY',
            colorName: 'Titanium Gray',
            colorHex: '#676664',
            storage: '512GB',
            mrp: 139999,
            price: 131999,
            imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          }
        ]
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 3,
            interestRate: 0,
            monthlyPayment: 39999,
            cashback: 8000,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹2,000'
          },
          {
            tenureMonths: 6,
            interestRate: 0,
            monthlyPayment: 20000,
            cashback: 8000,
            isRecommended: true,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹4,000'
          },
          {
            tenureMonths: 12,
            interestRate: 0,
            monthlyPayment: 10000,
            cashback: 8000,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹8,100'
          },
          {
            tenureMonths: 18,
            interestRate: 7.9,
            monthlyPayment: 7215,
            cashback: 6000,
            planType: 'LOW_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹12,800'
          }
        ]
      }
    }
  });

  // 3. Google Pixel 9 Pro
  const pixel = await prisma.product.create({
    data: {
      slug: 'google-pixel-9-pro',
      name: 'Google Pixel 9 Pro',
      brand: 'Google',
      tagline: 'The most powerful Pixel yet with Google Tensor G4 and Gemini Nano built-in.',
      description:
        'Pixel 9 Pro has an iconic, elevated design with a polished metal frame and matte back glass. Engineered with Google Tensor G4 and 16GB RAM, it delivers cutting-edge Gemini AI features and studio-quality cameras.',
      baseMrp: 109999,
      basePrice: 97999,
      badge: 'Pro Camera AI',
      rating: 4.7,
      reviewCount: 1940,
      highlights: [
        'Google Tensor G4 chip engineered for on-device Gemini AI',
        '16GB RAM for smooth multitasking and Pro photography',
        'Pro triple rear camera system with 30x Super Res Zoom',
        'Super Actua display - bright and vivid in direct sunlight',
        '7 years of guaranteed Pixel Feature Drops & OS updates'
      ],
      variants: {
        create: [
          {
            sku: 'PX9P-128-OBSIDIAN',
            colorName: 'Obsidian',
            colorHex: '#2E3033',
            storage: '128GB',
            mrp: 109999,
            price: 97999,
            imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: true,
            inStock: true
          },
          {
            sku: 'PX9P-256-PORCELAIN',
            colorName: 'Porcelain',
            colorHex: '#F4F0EA',
            storage: '256GB',
            mrp: 119999,
            price: 106999,
            imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          },
          {
            sku: 'PX9P-256-HAZEL',
            colorName: 'Hazel',
            colorHex: '#8D948D',
            storage: '256GB',
            mrp: 119999,
            price: 106999,
            imageUrl: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          },
          {
            sku: 'PX9P-256-ROSE',
            colorName: 'Rose Quartz',
            colorHex: '#E9D2CD',
            storage: '256GB',
            mrp: 119999,
            price: 106999,
            imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          }
        ]
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 3,
            interestRate: 0,
            monthlyPayment: 32666,
            cashback: 6000,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹1,650'
          },
          {
            tenureMonths: 6,
            interestRate: 0,
            monthlyPayment: 16333,
            cashback: 6000,
            isRecommended: true,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹3,300'
          },
          {
            tenureMonths: 12,
            interestRate: 0,
            monthlyPayment: 8166,
            cashback: 6000,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹6,600'
          },
          {
            tenureMonths: 24,
            interestRate: 8.25,
            monthlyPayment: 4480,
            cashback: 4500,
            planType: 'LOW_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹13,800'
          }
        ]
      }
    }
  });

  // 4. MacBook Pro 14 M4
  const macbook = await prisma.product.create({
    data: {
      slug: 'macbook-pro-14-m4',
      name: 'Apple MacBook Pro 14" (M4)',
      brand: 'Apple',
      tagline: 'M4 chip brings blazing speed, incredible display and up to 24 hours of battery life.',
      description:
        'The 14-inch MacBook Pro with M4 takes speed and capability to new heights. With phenomenal battery life, a breathtaking Liquid Retina XDR display with up to 1,600 nits peak HDR brightness, and advanced ports.',
      baseMrp: 169900,
      basePrice: 159900,
      badge: 'Pro Workstation',
      rating: 4.9,
      reviewCount: 1580,
      highlights: [
        'Apple M4 chip with 10-core CPU and 10-core GPU',
        'Liquid Retina XDR display with Nano-texture glass option',
        'Up to 24 hours battery life for uninterrupted pro workflows',
        'Center Stage 12MP camera with Desk View support',
        'Thunderbolt 4, HDMI port, SDXC card slot, MagSafe 3'
      ],
      variants: {
        create: [
          {
            sku: 'MBP14-512-BLACK',
            colorName: 'Space Black',
            colorHex: '#2E3033',
            storage: '512GB',
            mrp: 169900,
            price: 159900,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: true,
            inStock: true
          },
          {
            sku: 'MBP14-512-SILVER',
            colorName: 'Silver',
            colorHex: '#E2E4E5',
            storage: '512GB',
            mrp: 169900,
            price: 159900,
            imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          },
          {
            sku: 'MBP14-1TB-BLACK',
            colorName: 'Space Black',
            colorHex: '#2E3033',
            storage: '1TB',
            mrp: 189900,
            price: 179900,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
            galleryImages: [
              'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
            ],
            isDefault: false,
            inStock: true
          }
        ]
      },
      emiPlans: {
        create: [
          {
            tenureMonths: 6,
            interestRate: 0,
            monthlyPayment: 26650,
            cashback: 10000,
            isRecommended: true,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹5,300'
          },
          {
            tenureMonths: 12,
            interestRate: 0,
            monthlyPayment: 13325,
            cashback: 10000,
            planType: 'NO_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹10,800'
          },
          {
            tenureMonths: 24,
            interestRate: 8.5,
            monthlyPayment: 7330,
            cashback: 7500,
            planType: 'LOW_COST',
            mfReturnBenefit: 'Est. MF Growth during tenure: ₹22,500'
          }
        ]
      }
    }
  });

  console.log('✅ Seeding completed successfully!');
  console.log(`- Created Product: ${iphone.name} (${iphone.slug})`);
  console.log(`- Created Product: ${samsung.name} (${samsung.slug})`);
  console.log(`- Created Product: ${pixel.name} (${pixel.slug})`);
  console.log(`- Created Product: ${macbook.name} (${macbook.slug})`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
