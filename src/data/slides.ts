export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  location: string;
  tag: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: 'Misty Highlands',
    subtitle: 'Where silence meets the sky',
    description:
      'Drift through layers of fog-draped peaks as dawn paints the world in soft pastel hues. A moment of pure serenity.',
    image:
      'https://images.pexels.com/photos/34742289/pexels-photo-34742289.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
    location: 'Carpathian Mountains',
    tag: 'Mountains',
  },
  {
    id: 2,
    title: 'Turquoise Paradise',
    subtitle: 'Escape to endless blue',
    description:
      'Crystal-clear waters meet powder-white sand in a tropical haven that feels worlds away from everything.',
    image:
      'https://images.pexels.com/photos/9149273/pexels-photo-9149273.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
    location: 'Maldives',
    tag: 'Tropical',
  },
  {
    id: 3,
    title: 'Northern Lights',
    subtitle: 'Dance of the cosmos',
    description:
      'Witness nature\'s most spectacular light show as aurora borealis sweeps across the Arctic night sky in vivid color.',
    image:
      'https://images.pexels.com/photos/28237726/pexels-photo-28237726.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
    location: 'Karasjok, Norway',
    tag: 'Aurora',
  },
  {
    id: 4,
    title: 'Golden Dunes',
    subtitle: 'Shadows of the Sahara',
    description:
      'Rippling sand catches the last golden light of day, casting long shadows across an ancient and endless desert.',
    image:
      'https://images.pexels.com/photos/30710172/pexels-photo-30710172.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
    location: 'Moroccan Sahara',
    tag: 'Desert',
  },
  {
    id: 5,
    title: 'Hidden Cascade',
    subtitle: 'Nature\'s quiet roar',
    description:
      'Deep within a lush tropical jungle, a pristine waterfall tumbles through emerald foliage into a crystal pool.',
    image:
      'https://images.pexels.com/photos/28811534/pexels-photo-28811534.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
    location: 'Tropical Rainforest',
    tag: 'Jungle',
  },
];
