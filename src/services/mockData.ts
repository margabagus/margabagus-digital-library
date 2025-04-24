
// Mock data for development purposes
// This will be replaced with API calls in production

// Categories
export const categories = [
  {
    id: "novel",
    name: "Novel",
    description: "Karya fiksi prosa panjang yang mengandung rangkaian cerita kehidupan seseorang dengan orang-orang di sekelilingnya.",
    count: 145,
  },
  {
    id: "edukasi",
    name: "Edukasi",
    description: "Buku-buku yang berisi pengetahuan akademis dan edukasi untuk pembelajaran.",
    count: 120,
  },
  {
    id: "bisnis",
    name: "Bisnis",
    description: "Buku yang berkaitan dengan bisnis, kewirausahaan, dan pengembangan karir.",
    count: 98,
  },
  {
    id: "teknologi",
    name: "Teknologi",
    description: "Buku-buku tentang teknologi, komputer, dan perkembangan digital.",
    count: 87,
  },
  {
    id: "agama",
    name: "Agama",
    description: "Buku-buku yang berhubungan dengan agama dan spiritualitas.",
    count: 76,
  },
  {
    id: "sejarah",
    name: "Sejarah",
    description: "Buku yang membahas sejarah dunia, negara, atau peristiwa bersejarah.",
    count: 64,
  },
  {
    id: "psikologi",
    name: "Psikologi",
    description: "Buku tentang psikologi, pengembangan diri, dan kesehatan mental.",
    count: 55,
  },
  {
    id: "seni",
    name: "Seni & Desain",
    description: "Buku mengenai seni, desain, fotografi, dan karya kreatif.",
    count: 43,
  },
];

// Books
export const books = [
  {
    id: "1",
    title: "Bumi",
    author: "Tere Liye",
    coverImage: "https://source.unsplash.com/480x640/?fantasy,book",
    category: "Novel",
    rating: 4.8,
    description: "Tentang petualangan Raib dan kedua temannya ke dunia paralel yang penuh dengan keajaiban.",
  },
  {
    id: "2",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    coverImage: "https://source.unsplash.com/480x640/?philosophy,book",
    category: "Psikologi",
    rating: 4.7,
    description: "Buku tentang filsafat Stoa yang mengajarkan cara hidup tenang dan bijak dalam menghadapi permasalahan hidup.",
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://source.unsplash.com/480x640/?habits,book",
    category: "Edukasi",
    rating: 4.9,
    description: "Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk.",
  },
  {
    id: "4",
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    coverImage: "https://source.unsplash.com/480x640/?ocean,book",
    category: "Novel",
    rating: 4.6,
    description: "Novel tentang kisah para aktivis yang hilang pada masa Orde Baru.",
  },
  {
    id: "5",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverImage: "https://source.unsplash.com/480x640/?history,book",
    category: "Sejarah",
    rating: 4.7,
    description: "Sejarah singkat tentang umat manusia dari kemunculan Homo sapiens hingga masa kini.",
  },
  {
    id: "6",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    coverImage: "https://source.unsplash.com/480x640/?finance,book",
    category: "Bisnis",
    rating: 4.5,
    description: "Mengajarkan tentang kecerdasan finansial dan bagaimana mengatur keuangan dengan bijak.",
  },
  {
    id: "7",
    title: "Algorithms to Live By",
    author: "Brian Christian & Tom Griffiths",
    coverImage: "https://source.unsplash.com/480x640/?algorithm,book",
    category: "Teknologi",
    rating: 4.6,
    description: "Menerapkan prinsip ilmu komputer untuk memecahkan masalah kehidupan sehari-hari.",
  },
  {
    id: "8",
    title: "Sebuah Seni untuk Bersikap Bodo Amat",
    author: "Mark Manson",
    coverImage: "https://source.unsplash.com/480x640/?art,book",
    category: "Psikologi",
    rating: 4.4,
    description: "Pandangan berbeda tentang cara hidup yang bahagia dengan tidak terlalu peduli pada hal-hal yang tidak penting.",
  },
  {
    id: "9",
    title: "Pulang",
    author: "Tere Liye",
    coverImage: "https://source.unsplash.com/480x640/?home,book",
    category: "Novel",
    rating: 4.5,
    description: "Kisah tentang perjalanan seorang anak muda untuk menemukan arti dari kata pulang.",
  },
  {
    id: "10",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverImage: "https://source.unsplash.com/480x640/?money,book",
    category: "Bisnis",
    rating: 4.8,
    description: "Mengajarkan cara berpikir tentang uang dan bagaimana psikologi mempengaruhi keputusan finansial.",
  },
];

// Featured Books
export const featuredBooks = [
  books[0],
  books[2],
  books[4],
  books[6],
  books[8],
];

// New Releases
export const newReleases = [
  books[1],
  books[3],
  books[5],
  books[7],
  books[9],
];

// Popular Books
export const popularBooks = [
  books[2],
  books[0],
  books[4],
  books[9],
  books[6],
];
