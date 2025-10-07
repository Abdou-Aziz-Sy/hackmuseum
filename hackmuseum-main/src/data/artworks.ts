import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import femmeImage from "@/assets/femme.jpg";
import feticheImage from "@/assets/fetiche.jpg";
import hommeImage from "@/assets/homme.jpg";
import image1 from "@/assets/1.jpg";
import image2 from "@/assets/2.jpg";
import image3 from "@/assets/3.jpg";
import image4 from "@/assets/4.jpg";
import image5 from "@/assets/5.jpg";
import image6 from "@/assets/6.jpg";
import image7 from "@/assets/7.jpg";
import image8 from "@/assets/8.jpg";
import image9 from "@/assets/9.jpg";
import image10 from "@/assets/10.jpg";
import image11 from "@/assets/11.jpg";
import image12 from "@/assets/12.jpg";
import image13 from "@/assets/13.jpg";

export interface Artwork {
  id: string;
  title: {
    fr: string;
    en: string;
    wo: string;
  };
  artist: string;
  period: string;
  origin: string;
  image: string;
  category: string;
  description: {
    fr: string;
    en: string;
    wo: string;
  };
  history: {
    fr: string;
    en: string;
    wo: string;
  };
  culturalContext: {
    fr: string;
    en: string;
    wo: string;
  };
  audioUrl?: string;
}

export interface Category {
  id: string;
  name: {
    fr: string;
    en: string;
    wo: string;
  };
  description: {
    fr: string;
    en: string;
    wo: string;
  };
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "sculpture",
    name: {
      fr: "Sculpture",
      en: "Sculpture",
      wo: "Sëriñ"
    },
    description: {
      fr: "Œuvres sculptées en bois, pierre ou métal",
      en: "Works carved in wood, stone or metal",
      wo: "Liggéey yu def ak xeer, doj walla mettal"
    },
    icon: "🗿",
    color: "bg-orange-100 text-orange-800 border-orange-200"
  },
  {
    id: "masks",
    name: {
      fr: "Masques",
      en: "Masks",
      wo: "Mask"
    },
    description: {
      fr: "Masques cérémoniaux et rituels",
      en: "Ceremonial and ritual masks",
      wo: "Mask yu ceremoni ak rite"
    },
    icon: "🎭",
    color: "bg-purple-100 text-purple-800 border-purple-200"
  },
  {
    id: "textiles",
    name: {
      fr: "Textiles",
      en: "Textiles",
      wo: "Tiil"
    },
    description: {
      fr: "Tissus traditionnels et vêtements",
      en: "Traditional fabrics and clothing",
      wo: "Tiil yu cosaan ak yërëm"
    },
    icon: "🧵",
    color: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "jewelry",
    name: {
      fr: "Bijoux",
      en: "Jewelry",
      wo: "Yërmënde"
    },
    description: {
      fr: "Parures et bijoux traditionnels",
      en: "Traditional ornaments and jewelry",
      wo: "Yërmënde yu cosaan"
    },
    icon: "💎",
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  {
    id: "pottery",
    name: {
      fr: "Poterie",
      en: "Pottery",
      wo: "Bëñ"
    },
    description: {
      fr: "Vases et objets en céramique",
      en: "Vases and ceramic objects",
      wo: "Bëñ ak ay liggéey yu seramik"
    },
    icon: "🏺",
    color: "bg-red-100 text-red-800 border-red-200"
  },
  {
    id: "musical",
    name: {
      fr: "Instruments",
      en: "Musical Instruments",
      wo: "Xalam"
    },
    description: {
      fr: "Instruments de musique traditionnels",
      en: "Traditional musical instruments",
      wo: "Ay xalam yu cosaan"
    },
    icon: "🎵",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200"
  }
];

export const artworks: Artwork[] = [
  {
    id: "1",
    title: {
      fr: "Sculpture Traditionnelle",
      en: "Traditional Sculpture",
      wo: "Sëriñ bu Cosaan",
    },
    artist: "Artisan Sénégalais",
    period: "XIXe siècle",
    origin: "Sénégal",
    image: artwork1,
    category: "sculpture",
    description: {
      fr: "Cette magnifique sculpture représente un aspect fondamental de l'art traditionnel sénégalais. Les motifs géométriques complexes reflètent la maîtrise technique des artisans de l'époque.",
      en: "This magnificent sculpture represents a fundamental aspect of traditional Senegalese art. The complex geometric patterns reflect the technical mastery of the artisans of the time.",
      wo: "Sëriñ bii rafet moo melni jikko bu njëkk ci aada yu Senegaal. Motif yi geometrik yu nguur moo wane xam-xam bu teknik bi artisan yi amoon.",
    },
    history: {
      fr: "Créée au XIXe siècle, cette œuvre témoigne de la richesse culturelle du Sénégal précolonial. Elle a été transmise de génération en génération avant d'être acquise par le musée.",
      en: "Created in the 19th century, this work testifies to the cultural richness of precolonial Senegal. It was passed down from generation to generation before being acquired by the museum.",
      wo: "Defar ci aw 19e, liggéey bii moo wane naat bu aada bu Senegaal bu njëkk. Dañu koy yàmb ci aw ji ci aw ja ba musée bi jënd ko.",
    },
    culturalContext: {
      fr: "Les sculptures de ce type jouaient un rôle central dans les cérémonies traditionnelles et représentaient souvent des figures spirituelles importantes.",
      en: "Sculptures of this type played a central role in traditional ceremonies and often represented important spiritual figures.",
      wo: "Sëriñ yu ni mooy jëfandikoo bu mag ci ceremoni yu cosaan te dañuy melni jom-jom bu kersa bu mag.",
    },
  },
  {
    id: "2",
    title: {
      fr: "Masque Cérémonial",
      en: "Ceremonial Mask",
      wo: "Mask bu Ceremoni",
    },
    artist: "Collectif d'artisans",
    period: "XVIIIe siècle",
    origin: "Afrique de l'Ouest",
    image: artwork2,
    category: "masks",
    description: {
      fr: "Ce masque vibrant incarne la tradition des masques cérémoniaux d'Afrique de l'Ouest. Les couleurs vives et les détails complexes démontrent l'importance rituelle de ces objets.",
      en: "This vibrant mask embodies the West African ceremonial mask tradition. The bright colors and intricate details demonstrate the ritual importance of these objects.",
      wo: "Mask bii bu yomb moo melni aada yu mask yu ceremoni yu Penku Sëngal. Melaxat yu yomb ak detail yu njëkk moo wane li mask yii am ci rite.",
    },
    history: {
      fr: "Utilisé lors de cérémonies d'initiation importantes, ce masque a voyagé à travers plusieurs régions avant de rejoindre la collection du musée.",
      en: "Used during important initiation ceremonies, this mask traveled through several regions before joining the museum's collection.",
      wo: "Jëfandikoo ci ceremoni yu inisiasion yu mag, mask bii dafa dem ci bare dëkk ba taw ci kolleksion bu musée bi.",
    },
    culturalContext: {
      fr: "Les masques comme celui-ci servaient de pont entre le monde physique et spirituel, portés par des danseurs lors de rituels sacrés.",
      en: "Masks like this served as a bridge between the physical and spiritual world, worn by dancers during sacred rituals.",
      wo: "Mask yi ni mooy ngi jëfandikoo ngir jëfëndikoo aduna bi nga gis ak bi nga gisul, dansëer yi danuy koy takk ci rite yu sañ-sañ.",
    },
  },
  {
    id: "3",
    title: {
      fr: "Textile Traditionnel",
      en: "Traditional Textile",
      wo: "Tiil bu Cosaan",
    },
    artist: "Tisserands Wolof",
    period: "XXe siècle",
    origin: "Sénégal",
    image: artwork3,
    category: "textiles",
    description: {
      fr: "Ce textile aux motifs géométriques vibrants représente l'excellence du tissage traditionnel sénégalais. Chaque motif raconte une histoire et porte une signification culturelle profonde.",
      en: "This textile with vibrant geometric patterns represents the excellence of traditional Senegalese weaving. Each pattern tells a story and carries deep cultural significance.",
      wo: "Tiil bii ak motif geometrik yu yomb moo melni xam bu rafet bu tiss bu cosaan bu Senegaal. Motif bu nekk moo waxal benn xëbaar te am solo bu aada bu gatt.",
    },
    history: {
      fr: "Tissé à la main selon des techniques ancestrales, ce textile était destiné aux occasions spéciales et aux célébrations importantes.",
      en: "Hand-woven using ancestral techniques, this textile was intended for special occasions and important celebrations.",
      wo: "Tiss ak loxo ci ëmb technique yu njëkk, tiil bii dañu ko def ngir ay jamano yu bees ak celebration yu mag.",
    },
    culturalContext: {
      fr: "Les textiles jouent un rôle essentiel dans l'expression de l'identité culturelle et du statut social dans les sociétés ouest-africaines.",
      en: "Textiles play an essential role in expressing cultural identity and social status in West African societies.",
      wo: "Tiil yi ngi jëfandikoo bu mag ngir wane xam-xam bu aada ak boroom ci société yu Penku Sëngal.",
    },
  },
  {
    id: "4",
    title: {
      fr: "Collier de Perles",
      en: "Bead Necklace",
      wo: "Jëlë bu Perle",
    },
    artist: "Artisan Peul",
    period: "XXe siècle",
    origin: "Mali",
    image: femmeImage,
    category: "jewelry",
    description: {
      fr: "Ce magnifique collier de perles multicolores témoigne de l'artisanat traditionnel peul. Chaque perle raconte une histoire et porte une signification spirituelle.",
      en: "This magnificent multicolored bead necklace testifies to traditional Fulani craftsmanship. Each bead tells a story and carries spiritual significance.",
      wo: "Jëlë bii bu perle yu melaxat yu bare moo wane liggéey bu cosaan bu Peul. Perle bu nekk moo waxal benn xëbaar te am solo bu kersa.",
    },
    history: {
      fr: "Créé selon des techniques ancestrales transmises de mère en fille, ce collier était porté lors de cérémonies importantes.",
      en: "Created using ancestral techniques passed from mother to daughter, this necklace was worn during important ceremonies.",
      wo: "Defar ci ëmb technique yu njëkk yu ñu yàmb ci ndey ci doom ju jigéen, jëlë bii dañu koy takk ci ceremoni yu mag.",
    },
    culturalContext: {
      fr: "Les bijoux traditionnels sont porteurs d'identité et de statut social dans les communautés peules.",
      en: "Traditional jewelry carries identity and social status in Fulani communities.",
      wo: "Yërmënde yu cosaan danuy wane jëmm ak boroom ci jëfandikoo yu Peul.",
    },
  },
  {
    id: "5",
    title: {
      fr: "Vase Cérémoniel",
      en: "Ceremonial Vase",
      wo: "Bëñ bu Ceremoni",
    },
    artist: "Potier Dogon",
    period: "XIXe siècle",
    origin: "Mali",
    image: feticheImage,
    category: "pottery",
    description: {
      fr: "Ce vase en céramique aux motifs géométriques complexes est un chef-d'œuvre de l'art potier dogon. Sa forme et ses décorations reflètent la cosmogonie dogon.",
      en: "This ceramic vase with complex geometric motifs is a masterpiece of Dogon pottery art. Its shape and decorations reflect Dogon cosmology.",
      wo: "Bëñ bii bu seramik ak motif geometrik yu nguur moo melni liggéey bu mag bu potier Dogon. Mel ak ndëndëg moo wane xam-xam bu aduna Dogon.",
    },
    history: {
      fr: "Utilisé lors de rituels funéraires et de cérémonies de passage, ce vase était considéré comme sacré par la communauté dogon.",
      en: "Used during funeral rituals and rites of passage, this vase was considered sacred by the Dogon community.",
      wo: "Jëfandikoo ci rite yu dee ak ceremoni yu doxal, bëñ bii dañu koy xalaat ngir sañ-sañ ci jëfandikoo Dogon.",
    },
    culturalContext: {
      fr: "La poterie dogon est étroitement liée aux croyances spirituelles et aux rituels de passage de la vie.",
      en: "Dogon pottery is closely linked to spiritual beliefs and life passage rituals.",
      wo: "Bëñ Dogon mooy xam ak ngëm yu kersa ak rite yu doxal ci ndox.",
    },
  },
  {
    id: "6",
    title: {
      fr: "Djembé Traditionnel",
      en: "Traditional Djembe",
      wo: "Xalam bu Cosaan",
    },
    artist: "Facteur d'instruments",
    period: "XXe siècle",
    origin: "Guinée",
    image: image1,
    category: "musical",
    description: {
      fr: "Ce djembé sculpté dans un tronc d'arbre unique témoigne de l'art de la facture d'instruments traditionnels. Sa résonance exceptionnelle en fait un instrument de choix pour les griots.",
      en: "This djembe carved from a single tree trunk testifies to the art of traditional instrument making. Its exceptional resonance makes it an instrument of choice for griots.",
      wo: "Djembé bii bu def ci garab bu benn moo wane xam-xam bu def xalam yu cosaan. Bàkku bii bu rafet moo def ko xalam bu rafet ngir griot yi.",
    },
    history: {
      fr: "Créé selon des techniques ancestrales transmises de maître à apprenti, ce djembé a accompagné de nombreuses cérémonies.",
      en: "Created using ancestral techniques passed from master to apprentice, this djembe has accompanied numerous ceremonies.",
      wo: "Defar ci ëmb technique yu njëkk yu ñu yàmb ci boroom ci ndaw, djembé bii dafa bokk ci bare ceremoni.",
    },
    culturalContext: {
      fr: "Le djembé occupe une place centrale dans la musique traditionnelle ouest-africaine et la transmission orale.",
      en: "The djembe occupies a central place in West African traditional music and oral transmission.",
      wo: "Djembé bii am benn barab bu mag ci mbooy bu cosaan bu Penku Sëngal ak yàmb ci wax.",
    },
  },
  {
    id: "7",
    title: {
      fr: "Statue de Chef",
      en: "Chief Statue",
      wo: "Sëriñ bu Boroom",
    },
    artist: "Sculpteur Bambara",
    period: "XVIIIe siècle",
    origin: "Mali",
    image: image2,
    category: "sculpture",
    description: {
      fr: "Cette imposante statue de chef représente l'autorité et le pouvoir dans la société bambara. Les détails du visage et de la coiffe témoignent du statut social élevé.",
      en: "This imposing chief statue represents authority and power in Bambara society. The facial details and headdress testify to high social status.",
      wo: "Sëriñ bii bu mag bu boroom moo melni kàddu ak doole ci société Bambara. Detail yu bët ak kàdd moo wane boroom bu mag.",
    },
    history: {
      fr: "Créée pour honorer un chef de village respecté, cette statue a été conservée dans la case des anciens avant d'être acquise par le musée.",
      en: "Created to honor a respected village chief, this statue was kept in the elders' house before being acquired by the museum.",
      wo: "Defar ngir wone boroom dëkk bu ñu gëm, sëriñ bii dañu koy def ci kër bu mag yi ba musée bi jënd ko.",
    },
    culturalContext: {
      fr: "Les statues de chefs jouaient un rôle central dans les cérémonies d'investiture et la légitimation du pouvoir.",
      en: "Chief statues played a central role in investiture ceremonies and power legitimation.",
      wo: "Sëriñ yu boroom dañuy jëfandikoo bu mag ci ceremoni yu investiture ak wone doole.",
    },
  },
  {
    id: "8",
    title: {
      fr: "Masque de Danse",
      en: "Dance Mask",
      wo: "Mask bu Dëpp",
    },
    artist: "Artisan Yoruba",
    period: "XXe siècle",
    origin: "Nigeria",
    image: image3,
    category: "masks",
    description: {
      fr: "Ce masque de danse yoruba aux couleurs vives est utilisé lors des festivités traditionnelles. Il représente un esprit protecteur de la communauté.",
      en: "This brightly colored Yoruba dance mask is used during traditional festivities. It represents a protective spirit of the community.",
      wo: "Mask bii bu dëpp bu Yoruba ak melaxat yu yomb dañu koy jëfandikoo ci celebration yu cosaan. Moo melni rab bu wone jëfandikoo bi.",
    },
    history: {
      fr: "Transmis de génération en génération, ce masque a été porté lors de nombreuses cérémonies avant de rejoindre la collection du musée.",
      en: "Passed down from generation to generation, this mask was worn during many ceremonies before joining the museum's collection.",
      wo: "Yàmb ci aw ji ci aw ja, mask bii dafa takk ci bare ceremoni ba taw ci kolleksion bu musée bi.",
    },
    culturalContext: {
      fr: "Les masques de danse yoruba sont des objets sacrés qui permettent la communication avec le monde spirituel.",
      en: "Yoruba dance masks are sacred objects that enable communication with the spiritual world.",
      wo: "Mask yu dëpp yu Yoruba ay liggéey yu sañ-sañ yu man jëfandikoo ak aduna bu kersa.",
    },
  },
  {
    id: "9",
    title: {
      fr: "Boubou Traditionnel",
      en: "Traditional Boubou",
      wo: "Bubu bu Cosaan",
    },
    artist: "Couturier Peul",
    period: "XXe siècle",
    origin: "Sénégal",
    image: image4,
    category: "textiles",
    description: {
      fr: "Ce boubou traditionnel en coton brodé témoigne de l'excellence de l'art vestimentaire peul. Les motifs géométriques racontent l'histoire familiale.",
      en: "This traditional embroidered cotton boubou testifies to the excellence of Fulani clothing art. The geometric patterns tell the family history.",
      wo: "Bubu bii bu cosaan bu koton bu ñu def ak xànjar moo wane xam bu rafet bu yërëm bu Peul. Motif yu geometrik dañuy waxal tarix bu mag bu kër.",
    },
    history: {
      fr: "Créé pour une grande cérémonie familiale, ce boubou a été transmis de mère en fille avant d'être donné au musée.",
      en: "Created for a great family ceremony, this boubou was passed from mother to daughter before being donated to the museum.",
      wo: "Defar ngir ceremoni bu mag bu kër, bubu bii dañu koy yàmb ci ndey ci doom ju jigéen ba ñu ko jox musée bi.",
    },
    culturalContext: {
      fr: "Le boubou traditionnel est un symbole de dignité et de respect dans la culture peule.",
      en: "The traditional boubou is a symbol of dignity and respect in Fulani culture.",
      wo: "Bubu bu cosaan mooy aal bu ñàkk ak gëm ci aada Peul.",
    },
  },
  {
    id: "10",
    title: {
      fr: "Bracelet en Or",
      en: "Gold Bracelet",
      wo: "Bàkk bu Wuru",
    },
    artist: "Orfèvre Ashanti",
    period: "XIXe siècle",
    origin: "Ghana",
    image: image5,
    category: "jewelry",
    description: {
      fr: "Ce bracelet en or massif témoigne de la maîtrise de l'orfèvrerie ashanti. Les motifs complexes reflètent la richesse et le pouvoir royal.",
      en: "This solid gold bracelet testifies to Ashanti goldsmithing mastery. The complex motifs reflect wealth and royal power.",
      wo: "Bàkk bii bu wuru bu mag moo wane xam-xam bu orfèvre Ashanti. Motif yu nguur moo wane naat ak doole bu buur.",
    },
    history: {
      fr: "Propriété d'un roi ashanti, ce bracelet a été porté lors de cérémonies officielles avant d'être acquis par le musée.",
      en: "Property of an Ashanti king, this bracelet was worn during official ceremonies before being acquired by the museum.",
      wo: "Jëfandikoo bu buur Ashanti, bàkk bii dañu koy takk ci ceremoni yu nguur ba musée bi jënd ko.",
    },
    culturalContext: {
      fr: "L'or était considéré comme le métal des dieux et était réservé aux objets royaux et religieux.",
      en: "Gold was considered the metal of the gods and was reserved for royal and religious objects.",
      wo: "Wuru dañu koy xalaat ngir mettal bu yàlla ak dañu koy jëfandikoo ngir ay liggéey yu buur ak yu diine.",
    },
  },
  {
    id: "11",
    title: {
      fr: "Vase Funéraire",
      en: "Funeral Vase",
      wo: "Bëñ bu Dee",
    },
    artist: "Potier Nok",
    period: "500 av. J.-C.",
    origin: "Nigeria",
    image: image6,
    category: "pottery",
    description: {
      fr: "Ce vase funéraire de la culture Nok est l'un des plus anciens exemples de céramique africaine. Sa forme élégante témoigne d'une civilisation avancée.",
      en: "This Nok culture funeral vase is one of the oldest examples of African ceramics. Its elegant shape testifies to an advanced civilization.",
      wo: "Bëñ bii bu dee bu aada Nok mooy benn ci bëñ yu cosaan yu Afrik. Mel bii bu rafet moo wane civilization bu njëkk.",
    },
    history: {
      fr: "Découvert lors de fouilles archéologiques, ce vase date de l'âge du fer et témoigne de l'ancienneté de la civilisation nokienne.",
      en: "Discovered during archaeological excavations, this vase dates from the Iron Age and testifies to the antiquity of Nok civilization.",
      wo: "Gis ci jamano yu fouille, bëñ bii mooy ci Iron Age te moo wane cosaan bu civilization Nok.",
    },
    culturalContext: {
      fr: "La culture Nok est considérée comme l'une des plus anciennes civilisations d'Afrique subsaharienne.",
      en: "Nok culture is considered one of the oldest civilizations in sub-Saharan Africa.",
      wo: "Aada Nok dañu koy xalaat ngir benn ci civilization yu cosaan yu Afrik yu jëm ci suuf.",
    },
  },
  {
    id: "12",
    title: {
      fr: "Kora Traditionnelle",
      en: "Traditional Kora",
      wo: "Kora bu Cosaan",
    },
    artist: "Facteur Mandingue",
    period: "XXe siècle",
    origin: "Gambie",
    image: image7,
    category: "musical",
    description: {
      fr: "Cette kora traditionnelle à 21 cordes est l'instrument emblématique des griots mandingues. Sa caisse de résonance en calebasse produit des sons envoûtants.",
      en: "This traditional 21-string kora is the emblematic instrument of Mandinka griots. Its calabash soundbox produces mesmerizing sounds.",
      wo: "Kora bii bu cosaan ak 21 corde mooy xalam bu njëkk bu griot Mandingue. Këpp bii bu calabash moo manu def ay bàkku yu yomb.",
    },
    history: {
      fr: "Construite selon des techniques ancestrales, cette kora a accompagné de nombreux griots dans leur transmission orale.",
      en: "Built using ancestral techniques, this kora has accompanied many griots in their oral transmission.",
      wo: "Defar ci ëmb technique yu njëkk, kora bii dafa bokk ak bare griot ci yàmb ci wax.",
    },
    culturalContext: {
      fr: "La kora est l'instrument sacré des griots, gardiens de la tradition orale et de l'histoire des peuples mandingues.",
      en: "The kora is the sacred instrument of griots, guardians of oral tradition and history of Mandinka peoples.",
      wo: "Kora mooy xalam bu sañ-sañ bu griot, ay wone bu aada bu wax ak tarix bu xeet Mandingue.",
    },
  },
  {
    id: "13",
    title: {
      fr: "Statuette Ancestrale",
      en: "Ancestral Figurine",
      wo: "Sëriñ bu Njëkk",
    },
    artist: "Sculpteur Serer",
    period: "XVIe siècle",
    origin: "Sénégal",
    image: image8,
    category: "sculpture",
    description: {
      fr: "Cette statuette ancestrale serer représente un gardien spirituel de la communauté. Les traits stylisés et les symboles gravés témoignent d'une profonde spiritualité.",
      en: "This Serer ancestral figurine represents a spiritual guardian of the community. The stylized features and engraved symbols testify to deep spirituality.",
      wo: "Sëriñ bii bu njëkk bu Serer moo melni gannaw bu kersa bu jëfandikoo bi. Sañse yi ak aal yu bind moo wane kersa bu gatt.",
    },
    history: {
      fr: "Utilisée lors de rituels de protection, cette statuette était conservée dans les sanctuaires familiaux et transmise aux générations futures.",
      en: "Used during protection rituals, this figurine was kept in family shrines and passed down to future generations.",
      wo: "Jëfandikoo ci rite yu gann, sëriñ bii dañu koy tëgg ci sanctuaire yu kër te yàmb ci aw yi ñëw.",
    },
    culturalContext: {
      fr: "Dans la culture serer, les statuettes ancestrales servent d'intermédiaires entre les vivants et les ancêtres, assurant la protection et la guidance spirituelle.",
      en: "In Serer culture, ancestral figurines serve as intermediaries between the living and the ancestors, ensuring protection and spiritual guidance.",
      wo: "Ci aada Serer, sëriñ yu njëkk mooy jëfandikoo ci ëlb yu nekk ak yu dee, danuy gann te joxe ci kersa.",
    },
  },
  {
    id: "14",
    title: {
      fr: "Masque de Société Secrète",
      en: "Secret Society Mask",
      wo: "Mask bu Société Secrète",
    },
    artist: "Maître Masque Diola",
    period: "XVIIe siècle",
    origin: "Casamance, Sénégal",
    image: image9,
    category: "masks",
    description: {
      fr: "Ce masque sacré était utilisé par les sociétés secrètes diola lors de cérémonies d'initiation. Ses cornes stylisées symbolisent la force et la sagesse.",
      en: "This sacred mask was used by Diola secret societies during initiation ceremonies. Its stylized horns symbolize strength and wisdom.",
      wo: "Mask bii bu sañ-sañ dañu koy jëfandikoo ci société secrète yu Diola ci ceremoni yu initiation. Bañ yi bu sañse moo melni doole ak xam-xam.",
    },
    history: {
      fr: "Gardé jalousement par les initiés, ce masque n'apparaissait qu'lors de rituels spéciaux marquant le passage à l'âge adulte.",
      en: "Jealously guarded by initiates, this mask only appeared during special rituals marking the passage to adulthood.",
      wo: "Initié yi danuy ko gëm bu gëm, mask bii dañu koy wonee ci rite yu bees yu melni doxal ci mag.",
    },
    culturalContext: {
      fr: "Les sociétés secrètes diola utilisent les masques comme véhicules de transformation spirituelle et de transmission des connaissances ancestrales.",
      en: "Diola secret societies use masks as vehicles for spiritual transformation and transmission of ancestral knowledge.",
      wo: "Société secrète yu Diola danuy jëfandikoo mask yi ngir coppite ci kersa ak yàmb xam-xam bu njëkk.",
    },
  },
  {
    id: "15",
    title: {
      fr: "Coussin Royal",
      en: "Royal Cushion",
      wo: "Coussin bu Buur",
    },
    artist: "Tisserand Royal",
    period: "XVIIIe siècle",
    origin: "Royaume du Sine",
    image: image10,
    category: "textiles",
    description: {
      fr: "Ce coussin royal en soie brodée était réservé aux cérémonies officielles du royaume du Sine. Les motifs dorés racontent l'histoire des rois successeurs.",
      en: "This royal silk embroidered cushion was reserved for official ceremonies of the Sine kingdom. The golden patterns tell the story of successive kings.",
      wo: "Coussin bii bu buur bu soie bu xànjar dañu koy tëgg ngir ceremoni yu nguur yu Sine. Motif yu wuru dañuy wax tarix bu buur yu topp.",
    },
    history: {
      fr: "Confectionné par les meilleurs artisans du royaume, ce coussin accompagnait le roi lors des audiences royales et des fêtes traditionnelles.",
      en: "Crafted by the kingdom's finest artisans, this cushion accompanied the king during royal audiences and traditional festivities.",
      wo: "Def nañu ko artisan yu gën ci nguur gi, coussin bii dafa bokk ak buur ci audience yu nguur ak fête yu cosaan.",
    },
    culturalContext: {
      fr: "Dans la monarchie sine, les objets textiles royaux symbolisent la continuité dynastique et la légitimité du pouvoir royal.",
      en: "In the Sine monarchy, royal textile objects symbolize dynastic continuity and the legitimacy of royal power.",
      wo: "Ci nguur bu Sine, liggéey yu tiil yu buur danuy melni topp bu doole ak dëgg bu doole bu buur.",
    },
  },
  {
    id: "16",
    title: {
      fr: "Parure de Cérémonie",
      en: "Ceremonial Jewelry Set",
      wo: "Yërmënde bu Ceremoni",
    },
    artist: "Orfèvre Toucouleur",
    period: "XIXe siècle",
    origin: "Vallée du Fleuve Sénégal",
    image: hommeImage,
    category: "jewelry",
    description: {
      fr: "Cette parure complète en argent massif était portée par les notables toucouleurs lors des grandes cérémonies. Chaque élément a une signification spirituelle précise.",
      en: "This complete solid silver jewelry set was worn by Toucouleur dignitaries during major ceremonies. Each element has a precise spiritual meaning.",
      wo: "Yërmënde bii bu sëmën bu mag dañu koy takk ay notable Toucouleur ci ceremoni yu mag. Liggéey bu nekk am solo bu kersa bu baax.",
    },
    history: {
      fr: "Transmise de père en fils, cette parure marquait l'appartenance à l'élite sociale et religieuse de la communauté toucouleur.",
      en: "Passed from father to son, this jewelry set marked membership in the social and religious elite of the Toucouleur community.",
      wo: "Yàmb ci baay ci doom ju góor, yërmënde bii dafa aal ci boroom ak marabout yu jëfandikoo Toucouleur.",
    },
    culturalContext: {
      fr: "Chez les Toucouleurs, les bijoux en argent ont une dimension protective et sont considérés comme des talismans contre les forces négatives.",
      en: "Among the Toucouleurs, silver jewelry has a protective dimension and is considered as talismans against negative forces.",
      wo: "Ci Toucouleur yi, yërmënde yu sëmën danuy gann te xalaat nañu koy ngir talisman ci doole yu bon.",
    },
  },
  {
    id: "17",
    title: {
      fr: "Vase Rituel d'Eau Sacrée",
      en: "Sacred Water Ritual Vase",
      wo: "Bëñ bu Ndox bu Sañ-sañ",
    },
    artist: "Potier Lébou",
    period: "XXe siècle",
    origin: "Presqu'île du Cap-Vert",
    image: image11,
    category: "pottery",
    description: {
      fr: "Ce vase rituel servait à conserver l'eau sacrée utilisée lors des cérémonies de purification lébou. Sa forme unique facilite les ablutions rituelles.",
      en: "This ritual vase was used to store sacred water during Lebou purification ceremonies. Its unique shape facilitates ritual ablutions.",
      wo: "Bëñ bii bu rite dañu koy jëfandikoo ngir tëgg ndox bu sañ-sañ ci ceremoni yu sedd yu Lébou. Mel bii bu benn moo gën ablution yu rite.",
    },
    history: {
      fr: "Façonné selon des techniques séculaires, ce vase était béni par les marabouts avant chaque usage ceremoniel.",
      en: "Shaped using centuries-old techniques, this vase was blessed by marabouts before each ceremonial use.",
      wo: "Def ci technique yu aw yi jiitu, bëñ bii dañu koy barkeel marabout yi ba jëfandikoo ci ceremoni.",
    },
    culturalContext: {
      fr: "Dans la tradition lébou, l'eau sacrée est un élément central des rituels de protection maritime et de bénédiction des pêcheurs.",
      en: "In Lebou tradition, sacred water is a central element in maritime protection rituals and fishermen's blessings.",
      wo: "Ci aada Lébou, ndox bu sañ-sañ moo mag ci rite yu gann ci géej ak barkeel bu jëf-jën.",
    },
  },
  {
    id: "18",
    title: {
      fr: "Balafon Ancestral",
      en: "Ancestral Balafon",
      wo: "Balafon bu Njëkk",
    },
    artist: "Luthier Malinké",
    period: "XIXe siècle",
    origin: "Haute Guinée",
    image: image12,
    category: "musical",
    description: {
      fr: "Ce balafon ancestral à 21 lames était l'instrument sacré des griots malinké. Ses résonateurs en calebasse produisent une sonorité unique reconnue par tous.",
      en: "This ancestral 21-key balafon was the sacred instrument of Malinke griots. Its calabash resonators produce a unique sound recognized by all.",
      wo: "Balafon bii bu njëkk ak 21 lame mooy xalam bu sañ-sañ bu griot Malinké. Bàkku bii bu calabash moo def may bàkku bu benn bu ñépp xam.",
    },
    history: {
      fr: "Transmis dans la même famille de griots depuis sept générations, ce balafon a accompagné les plus grands récits épiques de l'empire mandingue.",
      en: "Passed down in the same griot family for seven generations, this balafon has accompanied the greatest epic tales of the Mandinka empire.",
      wo: "Yàmb ci benn kër bu griot ci juróom-ñeett aw, balafon bii dafa bokk ay épopée yu mag yu empire Mandingue.",
    },
    culturalContext: {
      fr: "Le balafon occupe une place sacrée dans la culture malinké, servant d'intermédiaire entre le monde terrestre et spirituel lors des récitations.",
      en: "The balafon occupies a sacred place in Malinke culture, serving as an intermediary between the earthly and spiritual worlds during recitations.",
      wo: "Balafon bii am barab bu sañ-sañ ci aada Malinké, mooy jikko ci ëlb suuf ak kersa ci wax.",
    },
  },
  {
    id: "19",
    title: {
      fr: "Masque de Chasseur",
      en: "Hunter's Mask",
      wo: "Mask bu Gaynde",
    },
    artist: "Sculpteur Chasseur Bambara",
    period: "XVIIe siècle",
    origin: "Mali",
    image: image13,
    category: "masks",
    description: {
      fr: "Ce masque de chasseur bambara était porté lors des rituels de départ à la chasse. Les cornes d'antilope sculptées invoquent l'esprit de l'animal chassé.",
      en: "This Bambara hunter's mask was worn during hunting departure rituals. The carved antelope horns invoke the spirit of the hunted animal.",
      wo: "Mask bii bu gaynde Bambara dañu koy takk ci rite yu dem gaynde. Bañ bu antilope bu sañse moo wutu rab bu mala bi.",
    },
    history: {
      fr: "Utilisé par une confrérie de chasseurs respectés, ce masque était considéré comme possédant des pouvoirs magiques de réussite à la chasse.",
      en: "Used by a brotherhood of respected hunters, this mask was considered to possess magical powers for hunting success.",
      wo: "Jëfandikoo ci confrérie bu gaynde yu ñu gëm, mask bii dañu koy xalaat ni am doole bu màgic ngir réussite ci gaynde.",
    },
    culturalContext: {
      fr: "Dans la société bambara, les masques de chasseurs établissent une communion spirituelle avec le gibier et garantissent le respect des lois de la nature.",
      en: "In Bambara society, hunter's masks establish spiritual communion with game and ensure respect for the laws of nature.",
      wo: "Ci société Bambara, mask yu gaynde danuy def jëfandikoo ci kersa ak mala te di dëgg yoon bu yaram.",
    },
  },
];
