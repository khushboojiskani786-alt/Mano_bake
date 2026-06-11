import { Product, Category, Banner, GalleryImage } from './types';
import manoBakesBanner from './assets/images/mano_bakes_banner_1780651161421.png';
import islamicJourneyCake from './assets/images/islamic_journey_cake_1780651658827.png';
import lilacButterflyCake from './assets/images/lilac_butterfly_cake_1780651676549.png';
import blueCarsBirthdayCake from './assets/images/blue_cars_birthday_cake_1780651697324.png';
import lawyerAdvocateCupcakes from './assets/images/lawyer_advocate_cupcakes_1780651716052.png';
import racingCarCake from './assets/images/racing_car_cake_1780651736170.png';
import musicalCoupleCake from './assets/images/musical_couple_cake_1780651761421.png';
import mothersDayCake from './assets/images/mothers_day_cake_1780651785064.png';
import customNameCupcakesBox from './assets/images/custom_name_cupcakes_box_1780651803447.png';
import squareCookieSlabCake from './assets/images/square_cookie_slab_cake_1780651819670.png';


export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat_cakes',
    name: 'Luxury Cakes',
    slug: 'cakes',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600',
    description: 'Decadent, multi-layered cakes handcrafted for weddings, birthdays, and refined gatherings.'
  },
  {
    id: 'cat_cupcakes',
    name: 'Cupcakes',
    slug: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=600',
    description: 'Bite-sized masterpieces piped with premium Swiss meringue buttercream and delicate garnishes.'
  },
  {
    id: 'cat_macarons',
    name: 'French Macarons',
    slug: 'macarons',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=600',
    description: 'Crispy shells with chewy centers, filled with premium white chocolate ganache, pistachio, or salted caramel.'
  },
  {
    id: 'cat_tarts',
    name: 'Tarts & Pastries',
    slug: 'tarts',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    description: 'Crisp butter tart shells loaded with pastry cream, fresh seasonal fruits, or dark chocolate ganache.'
  },
  {
    id: 'cat_cookies',
    name: 'Artisanal Cookies',
    slug: 'cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
    description: 'Gooey-centered, outer-crispt cookies stuffed with premium chocolate chunks, Lotus Biscoff, or Nutella.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_real_1',
    name: 'Pilgrimage Milestone Signpost Cake',
    category: 'cakes',
    price: 6500,
    originalPrice: 7200,
    description: 'A deeply meaningful, elegant 1-tier white fondant cake honoring blessed religious journeys. Decorated with handcrafted gold-inlaid "Jeddah, Makkah, Madina" signposts, an edible black prayer mat, and delicate prayer beads.',
    images: [islamicJourneyCake],
    rating: 5.0,
    reviewsCount: 164,
    flavors: ['Classic Belgian Fudge', 'Mocha Infused Fudge', 'Madagascar Vanilla Bean'],
    sizes: ['2 Lbs (Serves 6-8)', '3 Lbs (Serves 10-12)', '4 Lbs (Serves 14-16)'],
    isBestseller: true,
    inStock: true,
    createdAt: '2026-06-01T12:00:00Z'
  },
  {
    id: 'prod_real_2',
    name: 'Lilac Butterfly Whimsy Birthday Cake',
    category: 'cakes',
    price: 5200,
    originalPrice: 5800,
    description: 'A stunning visual creation of pastel lilac frosting, adorned with a flight of delicate cascading pink and lavender paper butterflies, premium gold-dusted chocolate spheres, and a glowing gold hoop birthday topper.',
    images: [lilacButterflyCake],
    rating: 4.8,
    reviewsCount: 112,
    flavors: ['Madagascar Vanilla Bean', 'Silk Vanilla Buttercream Rosewater', 'Velvet Scarlet Cheese'],
    sizes: ['2.5 Lbs (Serves 8-10)', '3.5 Lbs (Serves 12-14)', '5 Lbs (Serves 16-20)'],
    isBestseller: true,
    inStock: true,
    createdAt: '2026-06-02T12:00:00Z'
  },
  {
    id: 'prod_real_3',
    name: 'Little Racer Blue First Birthday Cake',
    category: 'cakes',
    price: 4800,
    originalPrice: 5400,
    description: 'A highly whimsical sky-blue fondant masterpiece celebrate Zayan’s 1st birthday milestone. Trimmed with delightful red, yellow, and green toy cars on a highway border, fluffy white clouds, and metallic stars on rising wires.',
    images: [blueCarsBirthdayCake],
    rating: 4.9,
    reviewsCount: 95,
    flavors: ['Classic Chocolate Fudge', 'French Vanilla Cream', 'Lotus Speculoos'],
    sizes: ['2 Lbs (Serves 6-8)', '3 Lbs (Serves 10-12)'],
    isSeasonal: false,
    inStock: true,
    createdAt: '2026-05-28T12:00:00Z'
  },
  {
    id: 'prod_real_4',
    name: 'Melodic Duet Figurine Celebration Cake',
    category: 'cakes',
    price: 7500,
    originalPrice: 8200,
    description: 'An elegant white and crimson red two-tier cake. Crowned with precise handcrafted clay figurines of a boy and girl duet holding a musical staff, paired with an elegant gold acrylic "Happy Birthday Sarwan" sign.',
    images: [musicalCoupleCake],
    rating: 5.0,
    reviewsCount: 88,
    flavors: ['Red Velvet Rosewater', 'Classic Belgian Fudge', 'Pistachio Cardamom Saffron'],
    sizes: ['3 Lbs (Two-Tiers)', '4 Lbs (Two-Tiers)', '5 Lbs (Grand Two-Tiers)'],
    isSeasonal: true,
    inStock: true,
    createdAt: '2026-06-03T12:00:00Z'
  },
  {
    id: 'prod_real_5',
    name: 'Scales of Justice Lawyer Cupcakes Giftbox',
    category: 'cupcakes',
    price: 2400,
    originalPrice: 2800,
    description: 'A custom box of 6 black-velvet legal celebration cupcakes. Adorned with gold-dusted mock scales of justice, gavels, leather-bound law books, and custom gold plaques celebrating Ahmed’s entry to the bar.',
    images: [lawyerAdvocateCupcakes],
    rating: 4.9,
    reviewsCount: 74,
    flavors: ['Rich Chocolate Fudge', 'Red Velvet with Cream Cheese'],
    sizes: ['Box of 6 Cupcakes', 'Box of 12 Cupcakes'],
    isBestseller: true,
    inStock: true,
    createdAt: '2026-06-04T12:00:00Z'
  },
  {
    id: 'prod_real_6',
    name: 'Grand Prix Formula-1 Racing Cake',
    category: 'cakes',
    price: 5800,
    originalPrice: 6500,
    description: 'A high-speed birthday creation for Shazil’s 10th milestone event. Wrapped in a neat chequered racing border, decorated with red safety helmets and racing tires, and crowned with a miniature blue Formula sportscar.',
    images: [racingCarCake],
    rating: 4.7,
    reviewsCount: 42,
    flavors: ['Belgian Fudge Sponge', 'Lotus Speculoos Cookie Crumble'],
    sizes: ['2.5 Lbs (Serves 8-10)', '3.5 Lbs (Serves 12-14)'],
    inStock: true,
    createdAt: '2026-05-30T12:00:00Z'
  },
  {
    id: 'prod_real_7',
    name: 'Abundant Devotion Mother’s Day Cake',
    category: 'cakes',
    price: 4200,
    originalPrice: 4800,
    description: 'A heartwarming double-layer cake to celebrate motherly devotion. Outlined with soft vanilla rosettes and dainty yellow daisy flowers, highlighted by a gorgeous food-safe painted centerpiece of a mother hugging her child.',
    images: [mothersDayCake],
    rating: 4.9,
    reviewsCount: 56,
    flavors: ['French Vanilla Cream', 'Red Velvet Cheese', 'Pistachio Cardamom'],
    sizes: ['2 Lbs (Serves 6-8)', '3 Lbs (Serves 10-12)'],
    isSeasonal: true,
    inStock: true,
    createdAt: '2026-05-12T12:00:00Z'
  },
  {
    id: 'prod_real_8',
    name: 'Signature Cocoa Tiramisu Dessert Tins',
    category: 'cakes',
    price: 1950,
    originalPrice: 2200,
    description: 'Two luxury round cans of our artisanal Italian Tiramisu. Espresso-soaked ladyfinger sponge cake layered with dense, velvety whipped cream and custard, heavily hand-dusted with Belgian dark cocoa powder.',
    images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=1000'],
    rating: 5.0,
    reviewsCount: 135,
    flavors: ['Classic Espresso (Mocktail style)', 'Salted Caramel Hazelnut'],
    sizes: ['Set of 2 Dessert Tins', 'Set of 4 Dessert Tins'],
    isBestseller: true,
    inStock: true,
    createdAt: '2026-05-24T12:00:00Z'
  },
  {
    id: 'prod_real_9',
    name: 'Custom Name Tag Chocolate Cupcakes Giftbox',
    category: 'cupcakes',
    price: 2200,
    originalPrice: 2600,
    description: 'An ultra-premium chocolate cupcake giftbox with customized yellow flags for names. Piped with deep dark chocolate fudge ganache, topped with whole Ferrero Rocher, KitKat fingers, and sprinkles.',
    images: [customNameCupcakesBox],
    rating: 4.8,
    reviewsCount: 49,
    flavors: ['Double Belgian Chocolate Fudge', 'Peanut Butter Chocolate Core'],
    sizes: ['Box of 6 Cupcakes', 'Box of 12 Cupcakes'],
    inStock: true,
    createdAt: '2026-05-18T12:00:00Z'
  },
  {
    id: 'prod_real_10',
    name: 'Oreo & KitKat Slab Square Birthday Cake',
    category: 'cakes',
    price: 4500,
    originalPrice: 5000,
    description: 'A luxurious square birthday cake beautifully framed by vanilla buttercream rosettes, bordered with whole Oreo cookies and KitKat bars, with an elegant central dark chocolate script plaque saying "HAPPY BIRTHDAY".',
    images: [squareCookieSlabCake],
    rating: 4.9,
    reviewsCount: 61,
    flavors: ['Double Chocolate Cookie Fudge', 'Cookies and Cream Velvet'],
    sizes: ['2.5 Lbs (Serves 8-10)', '3.5 Lbs (Serves 12-14)'],
    inStock: true,
    createdAt: '2026-05-20T12:00:00Z'
  },
  {
    id: 'prod_real_11',
    name: 'Belgain Chocolate Assorted Cupcake Box',
    category: 'cupcakes',
    price: 1800,
    originalPrice: 2000,
    description: 'An assorted deluxe box of chocolate cupcakes topped with premium milk chocolate fudge swirls, KitKat fingers, Oreos, chocolate chips, and sweet caramel drizzle drips.',
    images: ['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.7,
    reviewsCount: 38,
    flavors: ['Assorted Chocolate Fudge & Caramel Swirls'],
    sizes: ['Box of 6 Cupcakes', 'Box of 12 Cupcakes'],
    inStock: true,
    createdAt: '2026-05-15T12:00:00Z'
  },
  {
    id: 'prod_real_12',
    name: 'Double Jubilee Dual-Cake Exhibition Set',
    category: 'cakes',
    price: 8500,
    originalPrice: 9500,
    description: 'A spectacular party set featuring two complementary cakes: a decadent dark chocolate drip cake loaded with KitKat chunks and chocolate chips, coupled with a festive white vanilla cake heavily dusted with rainbow sprinkles.',
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000'],
    rating: 5.0,
    reviewsCount: 29,
    flavors: ['Chocolate Fudge & Holiday Vanilla Bean Mix'],
    sizes: ['Set of 2 Cakes (1.5 Lbs each)', 'Set of 2 Cakes (2.5 Lbs each)'],
    isSeasonal: false,
    inStock: true,
    createdAt: '2026-05-26T12:00:00Z'
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner_1',
    image: '/hero1.jpg',
    mobileImage: '/hero1.jpg', // Add this
    title: 'Cakes & Treats',
    subtitle: 'HAND-CRAFTED WONDERS FOR EVERY CELEBRATION',
    active: true,
    link: 'cakes'
  },
  {
    id: 'banner_2',
    image: '/hero2.jpg',
    mobileImage: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Celebrate with Love',
    subtitle: 'CUSTOM THEME CAKES FOR MEMORABLE MOMENTS',
    active: true,
    link: 'cakes'
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  { id: 'gal_1', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=500', caption: 'Wedding details' },
  { id: 'gal_2', image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=500', caption: 'Fresh cupcakes daily' },
  { id: 'gal_3', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=500', caption: 'French macarons packaging' },
  { id: 'gal_4', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=500', caption: 'Strawberry tarts in context' },
  { id: 'gal_5', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=500', caption: 'Cookies straight from the oven' },
  { id: 'gal_6', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=500', caption: 'Luxury piping detail' }
];
