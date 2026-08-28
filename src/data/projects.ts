import { DollarSign, Zap, Leaf, Users, Briefcase } from 'lucide-react';

export interface PortfolioItem {
  id: string;
  name: string;
  sector: string;
  sectorColor: string;
  location: string;
  status: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    icon: any;
  }[];
  sdgs: {
    id: number;
    color: string;
    label: string;
  }[];
  image: string;
  caseStudy?: {
    overview: string[];
    challenge: {
      text: string[];
      quote: string;
    };
    solution: string[];
    impactMetrics: {
      label: string;
      value: string;
      icon: any;
      description: string;
      image: string;
      sdg: { id: number; color: string; label: string; };
    }[];
    galleryImages: string[];
  };
}

export const portfolioData: PortfolioItem[] = [
  {
    id: '01',
    name: 'SwapStation Mobility',
    sector: 'E-MOBILITY',
    sectorColor: '#00A3E0',
    location: 'Nigeria',
    status: 'Active',
    description: 'An e-mobility company deploying e-2Ws, e-3Ws, swap stations, and logistics solutions for farm-to-market and last-mile delivery.',
    metrics: [
      { label: 'Operational EVs', value: '150', icon: Zap },
      { label: 'CO2 avoided', value: '8,454', icon: Leaf },
      { label: 'Job Created', value: '10', icon: Users },
      { label: 'SMEs Supported', value: '3', icon: Briefcase },
    ],
    sdgs: [
      { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' },
      { id: 13, color: '#3F7E44', label: 'Climate Action' },
      { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' },
    ],
    image: 'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-01-image.jpg',
    caseStudy: {
      overview: [
        "SwapStation Mobility is revolutionizing the e-mobility sector in Nigeria by deploying a comprehensive network of electric 2-wheelers (e-2Ws), 3-wheelers (e-3Ws), and innovative battery swap stations.",
        "This project specifically targets the logistics and transportation challenges faced in farm-to-market routes and last-mile delivery, providing a sustainable, cost-effective, and reliable alternative to traditional fossil-fuel-powered vehicles."
      ],
      challenge: {
        text: [
          "Nigeria's transportation sector is heavily reliant on fossil fuels, leading to significant greenhouse gas emissions, air pollution, and high operational costs for drivers and logistics companies.",
          "In rural and peri-urban areas, the lack of reliable and affordable transportation hinders the efficient movement of agricultural produce to markets, resulting in post-harvest losses and reduced income for farmers. Furthermore, the high upfront cost of electric vehicles and the lack of charging infrastructure have been major barriers to the adoption of e-mobility solutions."
        ],
        quote: "The transition to e-mobility is not just about reducing emissions; it's about empowering local economies and creating sustainable livelihoods."
      },
      solution: [
        "To address these challenges, SwapStation Mobility introduced a Battery-as-a-Service (BaaS) model, which significantly lowers the barrier to entry for drivers by decoupling the cost of the battery from the vehicle.",
        "The company deployed a network of strategically located battery swap stations, allowing drivers to exchange depleted batteries for fully charged ones in minutes, eliminating range anxiety and minimizing downtime.",
        "The project also included the rollout of robust, purpose-built e-2Ws and e-3Ws designed to handle the demanding conditions of farm-to-market routes and urban last-mile delivery. We integrated a smart digital platform to track battery health, optimize swap station locations, and provide seamless payment solutions for drivers, ensuring a highly efficient and scalable operational model."
      ],
      impactMetrics: [
        {
          label: 'CO2 Avoided',
          value: '8,454',
          icon: Leaf,
          description: 'Significant reduction in greenhouse gas emissions through the displacement of fossil-fuel vehicles.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 13, color: '#3F7E44', label: 'Climate Action' }
        },
        {
          label: 'Operational EVs',
          value: '150',
          icon: Zap,
          description: 'Energy savings achieved through the high efficiency of electric drivetrains compared to internal combustion engines.',
          image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' }
        },
        {
          label: 'Job Created',
          value: '10',
          icon: Users,
          description: 'Direct jobs created in station operations, vehicle maintenance, and logistics management.',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' }
        }
      ],
      galleryImages: [
        'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-01-gallery-1.jpg',
        'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-01-gallery-2.jpg',
        'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-01-gallery-3.jpg'
      ]
    }
  },
  {
    id: '02',
    name: 'Electify MicroGrid',
    sector: 'MINI GRID',
    sectorColor: '#8CC63F',
    location: 'Nigeria',
    status: 'Active',
    description: 'A renewable energy company, focusing on accelerating rural electrification through the development of mini-grid systems.',
    metrics: [
      { label: 'New Connection', value: '6,000+', icon: Zap },
      { label: 'CO2 avoided', value: '352+', icon: Leaf },
      { label: 'Job Created', value: '5+', icon: Users },
      { label: 'SMEs Supported', value: '6+', icon: Briefcase },
    ],
    sdgs: [
      { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' },
      { id: 13, color: '#3F7E44', label: 'Climate Action' },
      { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' },
    ],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    caseStudy: {
      overview: [
        "Electify MicroGrid is dedicated to accelerating rural electrification across Nigeria through the development and deployment of advanced mini-grid systems.",
        "By leveraging renewable energy sources, primarily solar, Electify provides reliable, clean, and affordable electricity to off-grid and underserved communities, fostering economic development and improving quality of life."
      ],
      challenge: {
        text: [
          "Millions of people in rural Nigeria lack access to reliable electricity, relying instead on expensive and polluting alternatives like kerosene lamps and diesel generators.",
          "This energy poverty stifles economic growth, limits educational opportunities, and poses significant health risks. Extending the national grid to these remote areas is often economically unfeasible due to high infrastructure costs and low population density."
        ],
        quote: "Access to reliable electricity is a fundamental catalyst for rural development, transforming communities and unlocking their economic potential."
      },
      solution: [
        "Electify MicroGrid addresses this challenge by designing, building, and operating decentralized solar hybrid mini-grids tailored to the specific needs of rural communities.",
        "These systems combine solar panels, battery storage, and smart metering technology to ensure a continuous and reliable power supply.",
        "The project also involves community engagement and capacity building to ensure local ownership and long-term sustainability of the mini-grid infrastructure. We implemented a tiered tariff structure to ensure affordability for the lowest-income households while maintaining commercial viability for the project."
      ],
      impactMetrics: [
        {
          label: 'CO2 Avoided',
          value: '352+',
          icon: Leaf,
          description: 'Reduction in carbon emissions by replacing diesel generators and kerosene lamps with clean solar energy.',
          image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 13, color: '#3F7E44', label: 'Climate Action' }
        },
        {
          label: 'New Connection',
          value: '6,000+',
          icon: Zap,
          description: 'Providing first-time access to reliable electricity for homes and small businesses.',
          image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' }
        },
        {
          label: 'Job Created',
          value: '5+',
          icon: Users,
          description: 'Local employment created in the construction, operation, and maintenance of the mini-grids.',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' }
        }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  },
  {
    id: '03',
    name: 'HotSpot Network',
    sector: 'TELEPHONY NETWORK',
    sectorColor: '#E31837',
    location: 'Nigeria',
    status: 'Active',
    description: 'Manages and rent tower infrastructure sites to Mobile Network Operators and Internet Service Providers.',
    metrics: [
      { label: 'Telecom Connections', value: '500,000+', icon: Zap },
      { label: 'CO2 avoided', value: '6,694+', icon: Leaf },
      { label: 'Job Created', value: '200+', icon: Users },
      { label: 'SMEs Supported', value: '200+', icon: Briefcase },
    ],
    sdgs: [
      { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' },
      { id: 13, color: '#3F7E44', label: 'Climate Action' },
      { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' },
    ],
    image: 'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-03-image.jpg',
    caseStudy: {
      overview: [
        "HotSpot Network is a leading telecommunications infrastructure provider in Nigeria, specializing in the management and leasing of tower sites to Mobile Network Operators (MNOs) and Internet Service Providers (ISPs).",
        "The company is committed to reducing the carbon footprint of the telecom sector by transitioning its tower sites from diesel generators to hybrid renewable energy solutions."
      ],
      challenge: {
        text: [
          "The telecommunications industry in Nigeria relies heavily on diesel generators to power off-grid and bad-grid tower sites, resulting in massive CO2 emissions and high operational expenses.",
          "The logistical challenges and costs associated with diesel supply, coupled with the environmental impact, make the current model unsustainable and hinder the expansion of network coverage in rural areas."
        ],
        quote: "Greening telecom infrastructure is essential for sustainable connectivity and reducing the environmental impact of the digital economy."
      },
      solution: [
        "HotSpot Network implements Energy-as-a-Service (EaaS) solutions, retrofitting existing tower sites with solar PV systems and advanced battery storage.",
        "This hybrid approach significantly reduces diesel consumption, lowers operating costs for MNOs, and ensures higher network uptime and reliability.",
        "The project also includes the deployment of smart monitoring systems to optimize energy usage and predict maintenance needs. By shifting to a renewable-first power architecture, HotSpot provides a blueprint for sustainable telecom expansion across the continent."
      ],
      impactMetrics: [
        {
          label: 'CO2 Avoided',
          value: '6,694+',
          icon: Leaf,
          description: 'Substantial decrease in carbon emissions by replacing diesel power with solar energy at telecom sites.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 13, color: '#3F7E44', label: 'Climate Action' }
        },
        {
          label: 'Telecom Connections',
          value: '500,000+',
          icon: Zap,
          description: 'Improved network reliability and expanded coverage, connecting more people to digital services.',
          image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' }
        },
        {
          label: 'Job Created',
          value: '200+',
          icon: Users,
          description: 'Jobs created in the installation, maintenance, and security of the upgraded tower sites.',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' }
        }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  },
  {
    id: '04',
    name: 'GroSolar',
    sector: 'SOLAR HOMES SYSTEMS',
    sectorColor: '#F7931D',
    location: 'Nigeria',
    status: 'Active',
    description: "A solar asset holding platform that invests in and owns solar equipment's installed and operated by renewable energy service companies.",
    metrics: [
      { label: 'New Connection', value: '44+', icon: Zap },
      { label: 'CO2 avoided', value: '2,174', icon: Leaf },
      { label: 'Job Created', value: '6', icon: Users },
      { label: 'SMEs Supported', value: '3', icon: Briefcase },
    ],
    sdgs: [
      { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' },
      { id: 13, color: '#3F7E44', label: 'Climate Action' },
      { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' },
    ],
    image: 'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-04-image.jpg',
    caseStudy: {
      overview: [
        "GroSolar is an innovative solar asset holding platform that facilitates the deployment of Solar Home Systems (SHS) across Nigeria.",
        "By investing in and owning the solar equipment, GroSolar enables Renewable Energy Service Companies (RESCOs) to scale their operations and reach more households without the burden of heavy upfront capital expenditures."
      ],
      challenge: {
        text: [
          "Many households in Nigeria lack access to the grid and rely on expensive, polluting energy sources. While Solar Home Systems offer a clean alternative, the high upfront cost is a major barrier for consumers.",
          "RESCOs struggle to scale their Pay-As-You-Go (PAYG) models because they require significant capital to purchase the solar assets before they can generate revenue from customers."
        ],
        quote: "Unlocking capital for solar assets is the key to accelerating the adoption of clean energy in off-grid communities."
      },
      solution: [
        "GroSolar addresses this financing bottleneck by acting as an asset company (AssetCo). It purchases the solar equipment and leases it to operating companies (OpCos) or RESCOs.",
        "This model allows RESCOs to focus on customer acquisition, installation, and service delivery, while GroSolar manages the asset financing.",
        "The project also leverages digital platforms for efficient asset tracking and payment collection, ensuring a scalable and sustainable business model. We established a robust risk-mitigation framework that protects investor capital while providing flexible terms to the operating companies."
      ],
      impactMetrics: [
        {
          label: 'CO2 Avoided',
          value: '2,174',
          icon: Leaf,
          description: 'Emissions avoided by replacing kerosene and diesel with clean solar energy in households.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 13, color: '#3F7E44', label: 'Climate Action' }
        },
        {
          label: 'New Connection',
          value: '44+',
          icon: Zap,
          description: 'Households newly electrified with reliable Solar Home Systems.',
          image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' }
        },
        {
          label: 'Job Created',
          value: '6',
          icon: Users,
          description: 'Jobs created in sales, installation, and customer support for the solar systems.',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' }
        }
      ],
      galleryImages: [
        'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-04-gallery-1.jpg',
        'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-04-gallery-2.jpg',
        'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-04-gallery-3.jpg',
        'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-04-gallery-4.jpg',
        'https://res.cloudinary.com/diqfojkri/image/upload/CEF/seed-media/portfolio-page/project-04-gallery-5.jpg'
      ]
    }
  },
  {
    id: '05',
    name: 'Pirano',
    sector: 'C&I SOLAR',
    sectorColor: '#0054A6',
    location: 'Nigeria',
    status: 'Active',
    description: 'Commercial and Industrial solar solutions providing reliable and clean energy to businesses, reducing operational costs and carbon footprint.',
    metrics: [
      { label: 'New Connection', value: '7', icon: Zap },
      { label: 'CO2 avoided', value: '3,523', icon: Leaf },
      { label: 'Job Created', value: '5', icon: Users },
      { label: 'SMEs Supported', value: '5', icon: Briefcase },
    ],
    sdgs: [
      { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' },
      { id: 13, color: '#3F7E44', label: 'Climate Action' },
      { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' },
    ],
    image: 'https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=800&auto=format&fit=crop',
    caseStudy: {
      overview: [
        "Pirano specializes in delivering tailored Commercial and Industrial (C&I) solar solutions to businesses across Nigeria, helping them transition to reliable, clean energy.",
        "By replacing expensive and polluting diesel generators with robust solar PV and battery storage systems, Pirano empowers enterprises to significantly reduce their operational expenditures and carbon footprint."
      ],
      challenge: {
        text: [
          "Businesses in Nigeria face severe challenges due to an unreliable national grid, forcing them to depend heavily on diesel generators for their daily operations.",
          "The escalating cost of diesel fuel and maintenance not only eats into profit margins but also contributes to significant environmental pollution, making it difficult for SMEs to remain competitive and sustainable."
        ],
        quote: "Empowering businesses with reliable, clean energy is crucial for driving economic resilience and industrial growth in the region."
      },
      solution: [
        "Pirano provides end-to-end solar solutions, from initial energy audits and system design to installation, financing, and ongoing maintenance.",
        "Through innovative Power Purchase Agreements (PPAs) and lease-to-own models, Pirano removes the barrier of high upfront capital costs, allowing businesses to pay for the energy they consume at a lower rate than diesel.",
        "The integration of advanced energy management software allows clients to monitor their energy consumption in real-time, optimize usage, and ensure maximum system efficiency."
      ],
      impactMetrics: [
        {
          label: 'CO2 Avoided',
          value: '3,523',
          icon: Leaf,
          description: 'Substantial reduction in industrial carbon emissions by displacing diesel generation.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 13, color: '#3F7E44', label: 'Climate Action' }
        },
        {
          label: 'New Connection',
          value: '7',
          icon: Zap,
          description: 'Large-scale commercial facilities successfully transitioned to solar power.',
          image: 'https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' }
        },
        {
          label: 'Job Created',
          value: '5',
          icon: Users,
          description: 'High-skilled jobs created in solar engineering, project management, and maintenance.',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' }
        }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  },
  {
    id: '06',
    name: 'SunRun Africa',
    sector: 'SOLAR HOMES SYSTEMS',
    sectorColor: '#F7931D',
    location: 'Kenya',
    status: 'Active',
    description: 'Providing affordable Pay-As-You-Go solar home systems to off-grid communities in East Africa.',
    metrics: [
      { label: 'New Connection', value: '12,000', icon: Zap },
      { label: 'CO2 avoided', value: '15,400', icon: Leaf },
      { label: 'Job Created', value: '45', icon: Users },
      { label: 'SMEs Supported', value: '120', icon: Briefcase },
    ],
    sdgs: [
      { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' },
      { id: 13, color: '#3F7E44', label: 'Climate Action' },
      { id: 1, color: '#E5243B', label: 'No Poverty' },
    ],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    caseStudy: {
      overview: [
        "SunRun Africa is expanding access to clean energy in rural Kenya through affordable Pay-As-You-Go (PAYG) solar home systems.",
        "The initiative targets households currently relying on kerosene and single-use batteries, offering them a cleaner, safer, and more cost-effective energy solution."
      ],
      challenge: {
        text: [
          "Off-grid communities in East Africa face significant challenges in accessing reliable electricity. The reliance on kerosene lamps not only poses severe health and safety risks but also consumes a disproportionate amount of household income.",
          "Traditional solar systems are often too expensive for these households to purchase upfront."
        ],
        quote: "Affordable energy access is the first step towards economic empowerment for off-grid communities."
      },
      solution: [
        "SunRun Africa utilizes a PAYG model, allowing customers to pay for their solar systems in small, manageable installments via mobile money.",
        "The systems include solar panels, battery storage, LED lighting, and phone charging capabilities, significantly improving the quality of life and enabling extended study and working hours.",
        "We also established a network of local agents to facilitate sales, installation, and after-sales support, creating employment opportunities within the communities."
      ],
      impactMetrics: [
        {
          label: 'CO2 Avoided',
          value: '15,400',
          icon: Leaf,
          description: 'Reduction in emissions from replacing kerosene lamps with solar lighting.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 13, color: '#3F7E44', label: 'Climate Action' }
        },
        {
          label: 'New Connection',
          value: '12,000',
          icon: Zap,
          description: 'Households gaining access to electricity for the first time.',
          image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' }
        },
        {
          label: 'Job Created',
          value: '45',
          icon: Users,
          description: 'Local jobs created for sales agents and technicians.',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' }
        }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  },
  {
    id: '07',
    name: 'EcoTransit',
    sector: 'E-MOBILITY',
    sectorColor: '#00A3E0',
    location: 'Rwanda',
    status: 'Active',
    description: 'Electrifying public transportation with a fleet of electric buses and a network of fast-charging stations in Kigali.',
    metrics: [
      { label: 'New Connection', value: '50', icon: Zap },
      { label: 'CO2 avoided', value: '12,500', icon: Leaf },
      { label: 'Job Created', value: '80', icon: Users },
      { label: 'SMEs Supported', value: '15', icon: Briefcase },
    ],
    sdgs: [
      { id: 11, color: '#FD9D24', label: 'Sustainable Cities and Communities' },
      { id: 13, color: '#3F7E44', label: 'Climate Action' },
      { id: 9, color: '#FD6925', label: 'Industry, Innovation and Infrastructure' },
    ],
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop',
    caseStudy: {
      overview: [
        "EcoTransit is leading the transition to sustainable public transportation in Kigali, Rwanda, by introducing a fleet of modern electric buses.",
        "The project aims to reduce urban air pollution, lower operational costs for transit operators, and provide a cleaner, quieter commuting experience for residents."
      ],
      challenge: {
        text: [
          "Rapid urbanization in Kigali has led to increased traffic congestion and reliance on aging, diesel-powered public buses, contributing significantly to air pollution and greenhouse gas emissions.",
          "The high cost of imported fossil fuels also places a heavy financial burden on transit operators and the local economy."
        ],
        quote: "Sustainable urban mobility is critical for creating livable, healthy, and economically vibrant cities."
      },
      solution: [
        "EcoTransit deployed a fleet of high-capacity electric buses along key transit routes in Kigali, supported by a strategically located network of fast-charging stations.",
        "The initiative includes comprehensive training programs for drivers and maintenance staff to ensure the efficient operation of the new technology.",
        "We also partnered with local authorities to integrate the electric buses into the city's existing public transport network, ensuring seamless connectivity and improved service reliability."
      ],
      impactMetrics: [
        {
          label: 'CO2 Avoided',
          value: '12,500',
          icon: Leaf,
          description: 'Significant reduction in urban emissions by replacing diesel buses with electric alternatives.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 13, color: '#3F7E44', label: 'Climate Action' }
        },
        {
          label: 'New Connection',
          value: '50',
          icon: Zap,
          description: 'Electric buses deployed and operational in the city transit network.',
          image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 11, color: '#FD9D24', label: 'Sustainable Cities and Communities' }
        },
        {
          label: 'Job Created',
          value: '80',
          icon: Users,
          description: 'Jobs created in driving, charging station operations, and specialized EV maintenance.',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' }
        }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  },
  {
    id: '08',
    name: 'GridConnect',
    sector: 'MINI GRID',
    sectorColor: '#8CC63F',
    location: 'Senegal',
    status: 'Active',
    description: 'Developing interconnected solar mini-grids to power agricultural processing hubs and surrounding communities.',
    metrics: [
      { label: 'New Connection', value: '2,500', icon: Zap },
      { label: 'CO2 avoided', value: '4,200', icon: Leaf },
      { label: 'Job Created', value: '30', icon: Users },
      { label: 'SMEs Supported', value: '45', icon: Briefcase },
    ],
    sdgs: [
      { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' },
      { id: 13, color: '#3F7E44', label: 'Climate Action' },
      { id: 2, color: '#DDA63A', label: 'Zero Hunger' },
    ],
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
    caseStudy: {
      overview: [
        "GridConnect focuses on the productive use of energy by developing solar mini-grids centered around agricultural processing hubs in rural Senegal.",
        "This approach not only provides electricity to households but also powers machinery for milling, cooling, and processing crops, thereby increasing agricultural value and farmer incomes."
      ],
      challenge: {
        text: [
          "In rural Senegal, the lack of electricity limits agricultural productivity. Farmers are unable to process or store their crops effectively, leading to high post-harvest losses and lower market prices.",
          "Standalone solar home systems are insufficient to power heavy agricultural machinery, necessitating larger, more robust energy solutions."
        ],
        quote: "Linking energy access directly to productive uses is the most effective way to drive rural economic growth."
      },
      solution: [
        "GridConnect designs and builds solar hybrid mini-grids with a primary focus on serving 'anchor loads'—such as agricultural processing facilities or cold storage units.",
        "Once the anchor load is secured, the grid is extended to serve surrounding households and small businesses, ensuring the financial viability of the project.",
        "We also provide financing and training for local entrepreneurs to purchase and operate electrical appliances, further stimulating local economic activity."
      ],
      impactMetrics: [
        {
          label: 'CO2 Avoided',
          value: '4,200',
          icon: Leaf,
          description: 'Emissions reduced by replacing diesel generators used in agricultural processing.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 13, color: '#3F7E44', label: 'Climate Action' }
        },
        {
          label: 'New Connection',
          value: '2,500',
          icon: Zap,
          description: 'Households and businesses connected to the mini-grid.',
          image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' }
        },
        {
          label: 'Job Created',
          value: '30',
          icon: Users,
          description: 'Jobs created in grid operation and newly established local businesses.',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
          sdg: { id: 8, color: '#A21942', label: 'Decent Work and Economic Growth' }
        }
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  }
];
