import { MenuItem } from '../types';

export const MENU_CATEGORIES = [
  { id: 'all', name: 'ALL CREATIONS' },
  { id: 'coffee', name: 'COFFEE' },
  { id: 'tea', name: 'TEA' },
  { id: 'cold-drinks', name: 'COLD DRINKS' },
  { id: 'pizzas', name: 'PIZZAS' },
  { id: 'burgers', name: 'BURGERS' },
  { id: 'pasta', name: 'PASTA' },
  { id: 'snacks', name: 'SNACKS' },
  { id: 'signatures', name: 'SIGNATURES' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE
  {
    id: 'c1',
    creativeName: 'THE FIRST DRAFT',
    normalName: 'CAPPUCCINO',
    price: '$5.50',
    category: 'coffee',
    description: 'Double espresso poured over velvety micro-foamed milk with a dusting of single-origin dark cocoa.',
    dietary: ['popular'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c2',
    creativeName: 'THE COMEBACK',
    normalName: 'COLD BREW & OAT MILK',
    price: '$6.00',
    category: 'coffee',
    description: '24-hour slow steeped Ethiopian Yirgacheffe cold brew over carved ice with creamed oat milk.',
    dietary: ['vegan', 'popular'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c3',
    creativeName: 'THE UNSPUN STORY',
    normalName: 'ESPRESSO TONIC & BOTANICALS',
    price: '$6.50',
    category: 'coffee',
    description: 'Double shot espresso floating over crisp artisanal elderflower tonic and dehydrated orange slice.',
    dietary: ['chef-choice', 'vegan'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c4',
    creativeName: 'MIDNIGHT THINKER',
    normalName: 'FLAT WHITE',
    price: '$5.25',
    category: 'coffee',
    description: 'Ristretto double shot with glossy textured steamed milk, rich and full-bodied.',
    dietary: ['popular'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop'
  },

  // TEA
  {
    id: 't1',
    creativeName: 'THE COMFORT CHAPTER',
    normalName: 'MASALA CHAI',
    price: '$5.00',
    category: 'tea',
    description: 'Traditional Assam black tea slow-simmered with crushed green cardamom, ginger, cinnamon, and whole milk.',
    dietary: ['popular'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 't2',
    creativeName: 'SILENT WHISPERS',
    normalName: 'JASMINE DRAGON PEARL GREEN TEA',
    price: '$5.50',
    category: 'tea',
    description: 'Hand-rolled spring tea leaves infused seven times with fresh night-blooming jasmine flowers.',
    dietary: ['vegan', 'gf'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800&auto=format&fit=crop'
  },

  // COLD DRINKS
  {
    id: 'd1',
    creativeName: 'THE HAPPY ENDING',
    normalName: 'CHOCOLATE & HAZELNUT SHAKE',
    price: '$7.50',
    category: 'cold-drinks',
    description: 'Single-origin Valrhona dark chocolate gelato blended with roasted hazelnuts and whipped cream.',
    dietary: ['popular', 'chef-choice'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd2',
    creativeName: 'THE BLANK CANVAS LEMONADE',
    normalName: 'HIBISCUS & MINT SPARKLER',
    price: '$6.00',
    category: 'cold-drinks',
    description: 'Wild Egyptian hibiscus tea, pressed key lime juice, and fresh garden mint over crushed ice.',
    dietary: ['vegan', 'gf'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop'
  },

  // PIZZAS
  {
    id: 'p1',
    creativeName: 'THE BLANK CANVAS',
    normalName: 'MARGHERITA WOOD-FIRED PIZZA',
    price: '$16.00',
    category: 'pizzas',
    description: '72-hour fermented sourdough, San Marzano tomato reduction, fresh fior di latte mozzarella, and torn basil.',
    dietary: ['popular', 'chef-choice'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p2',
    creativeName: 'THE UNWRITTEN RULE',
    normalName: 'TRUFFLE & WILD MUSHROOM PIZZA',
    price: '$18.50',
    category: 'pizzas',
    description: 'Garlic cream base, sautéed chanterelles and cremini mushrooms, fontina cheese, and black truffle drizzle.',
    dietary: ['chef-choice'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop'
  },

  // BURGERS
  {
    id: 'b1',
    creativeName: 'THE FRESH START',
    normalName: 'GOURMET VEG BURGER',
    price: '$14.50',
    category: 'burgers',
    description: 'Crispy sweet potato & quinoa patty, aged cheddar, avocado mash, house pickles on warm brioche.',
    dietary: ['popular'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'b2',
    creativeName: 'THE RE-INVENTION',
    normalName: 'SMOKED HALLOUMI & PESTO BURGER',
    price: '$15.50',
    category: 'burgers',
    description: 'Grilled halloumi cheese slab, walnut basil pesto, sun-dried tomato spread, arugula on toasted sourdough bun.',
    dietary: ['chef-choice'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop'
  },

  // PASTA
  {
    id: 'pa1',
    creativeName: 'THE PLOT TWIST',
    normalName: 'ITALIAN TRUFFLE TORTELLINI',
    price: '$17.00',
    category: 'pasta',
    description: 'Handmade pasta stuffed with ricotta and spinach, tossed in sage brown butter and shaved parmesan.',
    dietary: ['popular', 'chef-choice'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop'
  },

  // SNACKS
  {
    id: 's1',
    creativeName: 'THE BIG IDEA',
    normalName: 'LOADED POTATO BOATS',
    price: '$11.00',
    category: 'snacks',
    description: 'Twice-baked Yukon gold skins filled with smoked Gouda, caramelized shallots, chives, and truffle aioli.',
    dietary: ['popular'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's2',
    creativeName: 'THE MORNING NOTE',
    normalName: 'WARM ARTISAN CROISSANT',
    price: '$4.50',
    category: 'snacks',
    description: 'Flaky 81-layer French butter croissant baked fresh every morning with house raspberry preserve.',
    dietary: ['popular'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop'
  },

  // SIGNATURES
  {
    id: 'sig1',
    creativeName: 'THE VIVEVONS TASTING FLIGHT',
    normalName: '3-ORIGIN ESPRESSO & PAIRING',
    price: '$12.00',
    category: 'signatures',
    description: 'Curated flight of 3 single-origin espresso shots paired with artisanal dark chocolate, citrus peel, and sparkling water.',
    dietary: ['chef-choice', 'gf'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sig2',
    creativeName: 'THE SECOND CHANCE ELIXIR',
    normalName: 'HONEY & SMOKED CARDAMOM LATTE',
    price: '$7.00',
    category: 'signatures',
    description: 'Signature espresso layered with raw wildflower honey, toasted cardamom infusion, and oat milk dust.',
    dietary: ['chef-choice', 'popular'],
    availability: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop'
  }
];
