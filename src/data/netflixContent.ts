import { NetflixContent } from '../types/content';

export const netflixContent: NetflixContent[] = [
  {
    category: "Aksiyon ve Macera",
    titles: [
      { name: "Stranger Things", type: "dizi", mood: ["heyecanlı", "gizemli", "nostaljik"] },
      { name: "The Witcher", type: "dizi", mood: ["fantastik", "epik", "karanlık"] },
      { name: "Extraction", type: "film", mood: ["aksiyon", "gerilim", "yoğun"] },
      { name: "Red Notice", type: "film", mood: ["eğlenceli", "aksiyon", "komedi"] }
    ]
  },
  {
    category: "Drama",
    titles: [
      { name: "The Crown", type: "dizi", mood: ["tarihi", "dramatik", "düşündürücü"] },
      { name: "Bridgerton", type: "dizi", mood: ["romantik", "dönem", "dramatik"] },
      { name: "Marriage Story", type: "film", mood: ["duygusal", "gerçekçi", "dramatik"] },
      { name: "The Trial of the Chicago 7", type: "film", mood: ["politik", "tarihi", "güçlü"] }
    ]
  },
  {
    category: "Komedi",
    titles: [
      { name: "Emily in Paris", type: "dizi", mood: ["hafif", "romantik", "eğlenceli"] },
      { name: "Brooklyn Nine-Nine", type: "dizi", mood: ["eğlenceli", "neşeli", "komik"] },
      { name: "Don't Look Up", type: "film", mood: ["hiciv", "komedi", "düşündürücü"] },
      { name: "Murder Mystery", type: "film", mood: ["eğlenceli", "komedi", "macera"] }
    ]
  },
  {
    category: "Gerilim",
    titles: [
      { name: "You", type: "dizi", mood: ["psikolojik", "gerilim", "karanlık"] },
      { name: "Mindhunter", type: "dizi", mood: ["psikolojik", "suç", "karanlık"] },
      { name: "Bird Box", type: "film", mood: ["gerilim", "post-apokaliptik", "korku"] },
      { name: "The Platform", type: "film", mood: ["distopik", "gerilim", "düşündürücü"] }
    ]
  },
  {
    category: "Bilim Kurgu ve Fantastik",
    titles: [
      { name: "Black Mirror", type: "dizi", mood: ["distopik", "teknolojik", "düşündürücü"] },
      { name: "Dark", type: "dizi", mood: ["karmaşık", "gizemli", "bilimkurgu"] },
      { name: "The Adam Project", type: "film", mood: ["macera", "bilimkurgu", "aile"] },
      { name: "The Old Guard", type: "film", mood: ["aksiyon", "fantastik", "süper kahraman"] }
    ]
  },
  {
    category: "Belgesel",
    titles: [
      { name: "Our Planet", type: "dizi", mood: ["bilgilendirici", "sakin", "doğa"] },
      { name: "Formula 1: Drive to Survive", type: "dizi", mood: ["heyecanlı", "spor", "rekabetçi"] },
      { name: "My Octopus Teacher", type: "film", mood: ["duygusal", "doğa", "sakin"] },
      { name: "The Social Dilemma", type: "film", mood: ["düşündürücü", "teknoloji", "toplumsal"] }
    ]
  },
  {
    category: "Romantik",
    titles: [
      { name: "Virgin River", type: "dizi", mood: ["romantik", "drama", "sakin"] },
      { name: "Sweet Magnolias", type: "dizi", mood: ["romantik", "drama", "sıcak"] },
      { name: "To All the Boys I've Loved Before", type: "film", mood: ["romantik", "genç", "tatlı"] },
      { name: "Set It Up", type: "film", mood: ["romantik komedi", "eğlenceli", "hafif"] }
    ]
  },
  {
    category: "Korku",
    titles: [
      { name: "The Haunting of Hill House", type: "dizi", mood: ["korku", "psikolojik", "aile"] },
      { name: "Midnight Mass", type: "dizi", mood: ["korku", "supernatural", "gerilim"] },
      { name: "Fear Street Trilogy", type: "film", mood: ["korku", "genç", "gerilim"] },
      { name: "His House", type: "film", mood: ["korku", "psikolojik", "sosyal"] }
    ]
  }
];