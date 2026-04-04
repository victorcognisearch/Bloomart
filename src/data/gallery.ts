export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
  images: GalleryImage[];
}

export const galleryCategories: GalleryCategory[] = [
  {
    id: 'adulti',
    label: 'Adulți',
    images: [
      { src: '/images/grupa-adulti/grupa-adulti-1-1.webp', alt: 'Curs dans adulți — sesiune de grup' },
      { src: '/images/grupa-adulti/grupa-adulti-1-3.webp', alt: 'Cursanți dans de societate' },
      { src: '/images/grupa-adulti/grupa-adulti-2-1-reworked-website.webp', alt: 'Perechi dans de societate' },
      { src: '/images/grupa-adulti/grupa-adulti-3-1.webp', alt: 'Lecție de dans adulți' },
      { src: '/images/grupa-adulti/grupa-adulti-3-3-reworked-website.webp', alt: 'Practică dans de societate' },
      { src: '/images/grupa-adulti/grupa-adulti-4-1.webp', alt: 'Grup dans adulți în studio' },
      { src: '/images/grupa-adulti/grupa-adulti-5-1.webp', alt: 'Sesiune dans adulți' },
      { src: '/images/grupa-adulti/grupa-adulti-tango.webp', alt: 'Duo tango' },
      { src: '/images/grupa-adulti/dans-copii-04.webp', alt: 'Dans în studio' },
    ],
  },
  {
    id: 'copii',
    label: 'Copii',
    images: [
      { src: '/images/dans-copii/dans-copii-01.webp', alt: 'Curs dans copii' },
      { src: '/images/dans-copii/dans-copii-02.webp', alt: 'Copii în lecția de dans' },
      { src: '/images/dans-copii/dans-copii-03.webp', alt: 'Dans modern copii' },
      { src: '/images/dans-copii/dans-copii-05.webp', alt: 'Grupa de dans copii' },
      { src: '/images/dans-copii/dans-copii-06.webp', alt: 'Lecție dans copii' },
    ],
  },
  {
    id: 'cantonamente',
    label: 'Cantonamente',
    images: [
      { src: '/images/cantonament-6am/camp-6am-01.webp', alt: 'Cantonament 6AM — sesiune dimineață' },
      { src: '/images/cantonament-6am/camp-6am-04.webp', alt: 'Cantonament 6AM — antrenament' },
      { src: '/images/cantonament-6am/camp-6am-07.webp', alt: 'Cantonament 6AM — practică de grup' },
      { src: '/images/cantonament-6am/camp-6am-10.webp', alt: 'Cantonament 6AM — sesiune dans' },
      { src: '/images/cantonament-6am/camp-6am-13.webp', alt: 'Cantonament 6AM — momente de grup' },
      { src: '/images/cantonament-inviorare/camp-inviorare-02.webp', alt: 'Cantonament Înviorare — activități' },
      { src: '/images/cantonament-inviorare/camp-inviorare-05.webp', alt: 'Cantonament Înviorare — dans' },
      { src: '/images/cantonament-inviorare/camp-inviorare-09.webp', alt: 'Cantonament Înviorare — echipa' },
      { src: '/images/cantonament-inviorare/camp-inviorare-12.webp', alt: 'Cantonament Înviorare — momente' },
      { src: '/images/cantonament-inviorare/camp-inviorare-15.webp', alt: 'Cantonament Înviorare — grup' },
      { src: '/images/cantonament-team-mach/camp-team-01.webp', alt: 'Cantonament Team — sesiune' },
      { src: '/images/cantonament-team-mach/camp-team-03.webp', alt: 'Cantonament Team — activitate' },
    ],
  },
  {
    id: 'nunta',
    label: 'Nunta',
    images: [
      { src: '/images/nunta/nunta-01.webp', alt: 'Dansul mirilor — vals' },
      { src: '/images/nunta/nunta-02.webp', alt: 'Dansul mirilor — pereche' },
      { src: '/images/nunta/nunta-03.webp', alt: 'Dansul mirilor — momentul special' },
    ],
  },
];
