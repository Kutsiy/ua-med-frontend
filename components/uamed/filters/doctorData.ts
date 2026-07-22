export interface DoctorItem {
  id: string;
  name: string;
  specialty: string;
  specialtyKey: string;
  experience: string;
  rating: number;
  reviews: number;
  clinic: string;
  time: string;
  price: number;
  initials: string;
  availableToday: boolean;
}

export const DOCTOR_CONFIG = {
  search: {
    placeholder: 'Пошук лікаря, спеціальності або клініки...',
  },
  sorts: [
    { value: 'rating', label: 'За рейтингом' },
    { value: 'reviews', label: 'За кількістю відгуків' },
    { value: 'price_asc', label: 'Спочатку дешевші' },
    { value: 'price_desc', label: 'Спочатку дорожчі' },
  ],
  filters: [
    {
      id: 'specialtyKey',
      label: 'Спеціальність',
      type: 'select',
      options: [
        { value: 'all', label: 'Усі спеціальності' },
        { value: 'family', label: 'Сімейний лікар' },
        { value: 'cardio', label: 'Кардіолог' },
        { value: 'dentist', label: 'Стоматолог' },
        { value: 'pediatric', label: 'Педіатр' },
        { value: 'neuro', label: 'Невролог' },
      ],
    },
    {
      id: 'price',
      label: 'Вартість прийому, ₴',
      type: 'range',
      minKey: 'priceMin',
      maxKey: 'priceMax',
    },
    {
      id: 'availableToday',
      label: 'Доступні сьогодні',
      type: 'boolean',
      key: 'availableToday',
    },
  ],
};

export function getDoctorConfig(t: any) {
  return {
    search: {
      placeholder: t('search.doctors'),
    },
    sorts: [
      { value: 'rating', label: t('sorts.rating') },
      { value: 'reviews', label: t('sorts.reviews') },
      { value: 'price_asc', label: t('sorts.price_asc') },
      { value: 'price_desc', label: t('sorts.price_desc') },
    ],
    filters: [
      {
        id: 'specialtyKey',
        label: t('filterLabels.specialty'),
        type: 'select',
        options: [
          { value: 'all', label: t('options.specialty.all') },
          { value: 'family', label: t('options.specialty.family') },
          { value: 'cardio', label: t('options.specialty.cardio') },
          { value: 'dentist', label: t('options.specialty.dentist') },
          { value: 'pediatric', label: t('options.specialty.pediatric') },
          { value: 'neuro', label: t('options.specialty.neuro') },
        ],
      },
      {
        id: 'price',
        label: t('filterLabels.doctorPrice'),
        type: 'range',
        minKey: 'priceMin',
        maxKey: 'priceMax',
      },
      {
        id: 'availableToday',
        label: t('filterLabels.availableToday'),
        type: 'boolean',
        key: 'availableToday',
      },
    ],
  };
}

export function getDoctors(t: any): DoctorItem[] {
  return DOCTORS.map((item) => ({
    ...item,
    name: t(`items.doctors.${item.id}.name`),
    specialty: t(`items.doctors.${item.id}.specialty`),
    experience: t(`items.doctors.${item.id}.experience`),
    clinic: t(`items.doctors.${item.id}.clinic`),
    time: t(`items.doctors.${item.id}.time`),
  }));
}

export const DOCTORS: DoctorItem[] = [
  {
    id: 'olena',
    name: 'Олена Ковальчук',
    specialty: 'Сімейний лікар',
    specialtyKey: 'family',
    experience: '12 років досвіду',
    rating: 4.9,
    reviews: 328,
    clinic: 'Медичний центр «Оберіг»',
    time: 'Сьогодні, 14:30',
    price: 650,
    initials: 'ОК',
    availableToday: true,
  },
  {
    id: 'andriy',
    name: 'Андрій Мельник',
    specialty: 'Кардіолог',
    specialtyKey: 'cardio',
    experience: '18 років досвіду',
    rating: 4.8,
    reviews: 254,
    clinic: 'Клініка «Добробут»',
    time: 'Сьогодні, 16:00',
    price: 900,
    initials: 'АМ',
    availableToday: true,
  },
  {
    id: 'iryna',
    name: 'Ірина Шевченко',
    specialty: 'Стоматолог',
    specialtyKey: 'dentist',
    experience: '9 років досвіду',
    rating: 5.0,
    reviews: 412,
    clinic: 'Стоматологія «Люмі-Дент»',
    time: 'Сьогодні, 17:15',
    price: 500,
    initials: 'ІШ',
    availableToday: true,
  },
  {
    id: 'maksym',
    name: 'Максим Бойко',
    specialty: 'Педіатр',
    specialtyKey: 'pediatric',
    experience: '11 років досвіду',
    rating: 4.9,
    reviews: 189,
    clinic: 'Дитячий центр «Малятко»',
    time: 'Завтра, 10:00',
    price: 600,
    initials: 'МБ',
    availableToday: false,
  },
  {
    id: 'tetyana',
    name: 'Тетяна Ткаченко',
    specialty: 'Невролог',
    specialtyKey: 'neuro',
    experience: '15 років досвіду',
    rating: 4.7,
    reviews: 142,
    clinic: 'Медична клініка «Mediker»',
    time: 'Сьогодні, 18:45',
    price: 750,
    initials: 'ТТ',
    availableToday: true,
  },
];
