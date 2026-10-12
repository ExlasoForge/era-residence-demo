import { Amenity, PinItem } from '../types';

export const HERO_PINS: PinItem[] = [
  {
    id: 'crafted-to-endure',
    title: 'Crafted to Endure',
    description: 'Natural stone façades were selected for their timeless appearance, durability and ease of maintenance over time.',
    top: '62.5%',
    left: '57.5%',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a150affaf1d8cc969d57dd0_img_cam_02.webp'
  },
  {
    id: 'light-flow',
    title: 'Light & Flow',
    description: 'Terraces, rooftop solariums and expansive openings maximize natural light while creating a seamless indoor-outdoor transition.',
    top: '58.3%',
    left: '26.9%',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a150bbc2a39862be04f2cd5_era-residence-terrace.webp'
  },
  {
    id: 'your-private-sanctuary',
    title: 'Your Private Sanctuary',
    description: 'Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard residential complex.',
    top: '73.2%',
    left: '76.6%',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a150cc2f810e37eec2ea963_era-residence-garden.webp'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'gated-community',
    title: 'Gated community',
    subtitle: 'Privacy & Community',
    description: 'Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard residential complex.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1512e5b24991c76981118b_era-residence-gated-community.webp',
    features: ['24/7 Monitored Gated Access', 'Walking Paths instead of Corridors', 'Low-Density 25 Residences', 'Private Garden Settings']
  },
  {
    id: 'swimming-pool',
    title: 'Swimming Pool',
    subtitle: 'Saltwater Oasis',
    description: 'Saltwater swimming pool with dedicated children pool, sunbathing deck, and serene cabana spaces framed by blooming bougainvillea and palm trees.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a151264dc1dcca76fda17d9_era-residence-pool.webp',
    features: ['Saltwater Ecological System', 'Separate Children Pool Basin', 'Spacious Sunbathing Terraces', 'Outdoor Showers & Changing Rooms']
  },
  {
    id: 'parking-area',
    title: 'Parking area',
    subtitle: 'Convenience & Security',
    description: 'Underground secure car park with wide turning radius, storage units for every residence, and pre-installation for electric vehicle (EV) charging stations.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1573fc640c344ee0705819_era-residence-parking.webp',
    features: ['Pre-installed EV Charging Points', 'Dedicated Private Storage Rooms', 'Direct Elevator Access to All Floors', 'Automatic Remote & Plate Recognition']
  },
  {
    id: 'spa-gym',
    title: 'Spa & gym',
    subtitle: 'Wellness at Home',
    description: 'Dedicated wellness sanctuary featuring Finnish sauna, hydromassage jacuzzi, sensory shower experience, and a fitness space fitted with state-of-the-art equipment.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1575f46655e8c4e795ec64_era-residence-landscaping.webp',
    features: ['Finnish Sauna with Natural Cedar', 'Hydromassage Jacuzzi Bath', 'Cardio & Strength Training Zone', 'Invigorating Experience Showers']
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    subtitle: 'Botanical Harmony',
    description: 'Designed around indigenous flora, fragrant jasmine, ancient olive trees and curated stone pathways that create an atmosphere of effortless tranquility.',
    image: 'https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2.webp',
    features: ['Indigenous Mediterranean Flora', 'Water-Efficient Drip Irrigation', 'Sculptural Specimen Olive Trees', 'Subtle Evening Ambient Lighting']
  }
];

export const TYPOLOGIES = [
  {
    id: 'ground-floor-basement',
    name: 'Ground floor + basement',
    bedrooms: '3 Bedrooms',
    area: 'Area up to 178 — 202 m²',
    description: 'Private basement, direct outdoor access and a dedicated lower level for recreation, office or guest accommodation.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1514d7c27920c70252da1f_era-residence-ground-floor-basement.webp'
  },
  {
    id: 'ground-floor',
    name: 'Ground Floor',
    bedrooms: '2 Bedrooms',
    area: 'Area up to 75 — 104 m²',
    description: 'Harmonious single-level living with floor-to-ceiling sliding glass doors opening directly onto lush landscaped terraces.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1575f46655e8c4e795ec64_era-residence-landscaping.webp'
  },
  {
    id: 'penthouse-duplex',
    name: 'Penthouse duplex',
    bedrooms: '2 — 3 Bedrooms',
    area: 'Area up to 89 — 244 m²',
    description: 'Expansive duplex layout with private rooftop solarium offering panoramic sea views over the Mediterranean coastline.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a15153b797c328a9f2f5964_era-residence-terrace.webp'
  }
];

export const REASONS = [
  {
    number: '00',
    title: 'Real-Life Location',
    description: 'Nestled between pristine beaches, world-class golf courses and exclusive wellness clubs, Era Residence offers a rare balance of seclusion and seamless access to Marbella and Estepona.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a150affaf1d8cc969d57dd0_img_cam_02.webp'
  },
  {
    number: '01',
    title: 'Built to stay',
    description: 'Natural stone, warm tactile plaster, floor-to-ceiling minimalist glazing and durable Mediterranean materials selected to age gracefully under the Andalusian sun.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a150bbc2a39862be04f2cd5_era-residence-terrace.webp'
  },
  {
    number: '02',
    title: 'Boutique concept',
    description: 'A low-density community of only 25 homes designed for true peace of mind, high acoustic insulation, independent entries, and private resort-style amenities.',
    image: 'https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a150cc2f810e37eec2ea963_era-residence-garden.webp'
  }
];

export const SPECS = [
  {
    category: 'Architecture & Finishes',
    items: [
      'Natural local stone façade cladding and lime-render accents',
      'Floor-to-ceiling thermal-break aluminum profile joinery',
      'Large format Porcelanosa porcelain tiling inside and on terraces',
      'Flush motorized blinds and concealed curtain recesses'
    ]
  },
  {
    category: 'Comfort & Climate',
    items: [
      'High-efficiency Aerothermal system for heating and domestic hot water',
      'Zoned underfloor water heating throughout all living quarters',
      'Independent digital thermostats in every room',
      'Continuous micro-ventilation with heat recovery'
    ]
  },
  {
    category: 'Kitchen & Bathrooms',
    items: [
      'Custom kitchen with Silestone quartz countertops and flush cabinetry',
      'Integrated Siemens / Bosch induction hob, oven, microwave and dishwasher',
      'Wall-hung Rimless sanitary ware with soft-close mechanisms',
      'Bespoke thermostatic shower columns and integrated vanity niches'
    ]
  },
  {
    category: 'Optional Custom Upgrades',
    items: [
      'Private jacuzzi installation on rooftop solariums or ground terraces',
      'Dedicated high-capacity EV vehicle charging point installation',
      'Photovoltaic solar panels for supplementary electrical self-consumption',
      'Smart home domotic control package with remote smartphone app'
    ]
  }
];
