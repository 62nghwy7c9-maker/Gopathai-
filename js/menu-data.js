/* Speisekarte Gophai Thai Imbiss — Nr. 1–98, Stand: Speisekarte April 2023
   chili: 0–4 (würzig → höllisch scharf) · allergens: Buchstaben laut Karte */
const MENU_CATEGORIES = [
  { id: 'vorspeisen',  label: 'Vorspeisen' },
  { id: 'suppen',      label: 'Suppen', note: 'klein / groß' },
  { id: 'salate',      label: 'Salate', note: 'ausschließlich auf Vorbestellung' },
  { id: 'reis',        label: 'Reisgerichte' },
  { id: 'nudeln',      label: 'Nudelgerichte' },
  { id: 'haehnchen',   label: 'Hähnchengerichte', note: 'mit Reis' },
  { id: 'rind',        label: 'Rindfleischgerichte', note: 'mit Reis' },
  { id: 'ente',        label: 'Entengerichte', note: 'mit Reis' },
  { id: 'garnelen',    label: 'Garnelen-Gerichte', note: 'mit Reis' },
  { id: 'vegetarisch', label: 'Vegetarische Gerichte', note: 'mit Reis' },
  { id: 'extras',      label: 'Extras' },
  { id: 'dessert',     label: 'Dessert' },
  { id: 'getraenke',   label: 'Getränke', note: 'alle ohne Pfand' },
];

const MENU_ITEMS = [
  // ── Vorspeisen ──────────────────────────────────────────────
  { nr: 1,  cat: 'vorspeisen', name: 'Por Pia Tord', desc: 'frittierte thailändische Frühlingsrolle mit Hähnchenfleisch – pro Stück', price: '1,70', allergens: 'a', chili: 0 },
  { nr: 2,  cat: 'vorspeisen', name: 'Piek Gai Tord', desc: 'frittierte Hähnchenflügel – 6 Stück', price: '6,00', allergens: 'a', chili: 0 },
  { nr: 3,  cat: 'vorspeisen', name: 'Gai Sate', desc: 'Hähnchenspieße mit Erdnusssoße – 5 Stück', price: '6,50', allergens: 'i', chili: 0 },
  { nr: 4,  cat: 'vorspeisen', name: 'Nuea Sate', desc: 'Rindfleischspieße mit Erdnusssoße – 5 Stück', price: '7,50', allergens: '', chili: 0 },
  { nr: 5,  cat: 'vorspeisen', name: 'Pla Tord Man', desc: 'frittierte Fischbällchen – 5 Stück · auch als frittierte Hähnchenbällchen (6,50 €)', price: '7,50', allergens: 'a,e', chili: 0 },
  { nr: 6,  cat: 'vorspeisen', name: 'Gang Shoop Paeng Tord', desc: 'frittierte panierte Garnelen – 5 Stück', price: '7,50', allergens: 'e,d', chili: 0 },
  { nr: 7,  cat: 'vorspeisen', name: 'Gai Shoop Paeng Tord', desc: 'frittiertes paniertes Hähnchenfleisch – 5 Stück', price: '6,50', allergens: 'a,c', chili: 0 },
  { nr: 8,  cat: 'vorspeisen', name: 'Chicken Nuggets', desc: 'paniertes Hähnchenfleisch · klein 6 Stück / groß 12 Stück', price: '5,00 / 9,00', allergens: 'a', chili: 0 },
  { nr: 10, cat: 'vorspeisen', name: 'Pommes frites', desc: 'frittierte Kartoffelstreifen · klein / groß', price: '3,00 / 4,00', allergens: '', chili: 0 },

  // ── Suppen (klein / groß) ───────────────────────────────────
  { nr: 11, cat: 'suppen', name: 'Geau Naam', desc: 'Wan-Tan-Suppe', price: '7,00 / 8,50', allergens: 'b,d', chili: 0 },
  { nr: 12, cat: 'suppen', name: 'Gaeng Jued Won Seen', desc: 'Glasnudeln mit Hähnchenfleisch und Gemüse', price: '6,50 / 8,50', allergens: '', chili: 0 },
  { nr: 13, cat: 'suppen', name: 'Guay Tiaw Ped', desc: 'thailändische Reisnudelsuppe mit Entenbruststreifen und Gemüse', price: '9,00 / 12,00', allergens: 'a', chili: 0 },
  { nr: 14, cat: 'suppen', name: 'Guay Tiaw Nuea', desc: 'Reisnudelsuppe mit Rindfleisch und Gemüse', price: '7,00 / 9,00', allergens: '', chili: 0 },
  { nr: 15, cat: 'suppen', name: 'Guay Tiaw Gai', desc: 'Reisnudelsuppe mit Hähnchenfleisch und Gemüse', price: '6,50 / 8,50', allergens: '', chili: 0 },
  { nr: 16, cat: 'suppen', name: 'Gaeng Som Gung', desc: 'scharf-saure Suppe mit Garnelen und Gemüse', price: '9,00 / 12,00', allergens: 'd', chili: 2 },
  { nr: 17, cat: 'suppen', name: 'Tom Yam Gung', desc: 'Zitronengras mit Garnelen und Champignons', price: '9,00 / 12,00', allergens: 'd', chili: 2 },
  { nr: 18, cat: 'suppen', name: 'Tom Yam Gai', desc: 'Zitronengras mit Hähnchenfleisch und Champignons', price: '6,50 / 8,50', allergens: '', chili: 2 },
  { nr: 19, cat: 'suppen', name: 'Tom Kha Gai', desc: 'Hühnerfleischsuppe mit Kokosmilch und Galgant', price: '6,50 / 8,50', allergens: 'c', chili: 0 },
  { nr: 20, cat: 'suppen', name: 'Tom Kha Gung', desc: 'Galgantsuppe mit Garnelen und Kokosmilch', price: '9,00 / 12,00', allergens: 'c,d', chili: 0 },

  // ── Salate (nur auf Vorbestellung) ──────────────────────────
  { nr: 21, cat: 'salate', name: 'Yam Nuea', desc: 'thailändischer Rindfleischsalat mit frischen Kräutern', price: '10,50', allergens: '', chili: 0 },
  { nr: 22, cat: 'salate', name: 'Laab Ped', desc: 'Entenbrustsalat mit thailändischen Kräutern', price: '11,00', allergens: 'a', chili: 0 },
  { nr: 23, cat: 'salate', name: 'Laab Gai', desc: 'Hähnchenfleischsalat mit thailändischen Kräutern', price: '9,50', allergens: '', chili: 0 },
  { nr: 24, cat: 'salate', name: 'Yam Woonsen', desc: 'Glasnudelsalat mit Hähnchenfleisch, Krabben und Zwiebeln', price: '9,50', allergens: 'd', chili: 0 },
  { nr: 25, cat: 'salate', name: 'Yam Talay', desc: 'thailändischer Meeresfrüchtesalat', price: '11,50', allergens: '', chili: 0 },
  { nr: 26, cat: 'salate', name: 'Som Tham Thai', desc: 'Salat von grünen Papayas mit frischen Gewürzen und Knoblauch', price: '11,50', allergens: 'e', chili: 2 },

  // ── Reisgerichte ────────────────────────────────────────────
  { nr: 27, cat: 'reis', name: 'Khao Phad Gai', desc: 'gebratener Reis mit Hähnchenfleisch, Ei und Gemüse', price: '11,00', allergens: 'b,g', chili: 0 },
  { nr: 28, cat: 'reis', name: 'Khao Phad Nuea', desc: 'gebratener Reis mit Rindfleisch, Ei und Gemüse', price: '13,00', allergens: 'b,g', chili: 0 },
  { nr: 29, cat: 'reis', name: 'Khao Phad Gung', desc: 'gebratener Reis mit Garnelen, Ei und Gemüse', price: '15,00', allergens: 'b,g', chili: 0 },
  { nr: 30, cat: 'reis', name: 'Khao Phad Sapparot', desc: 'gebratener Reis mit Hähnchenfleisch, Curry, Ananas und Cashewnüssen', price: '11,00', allergens: 'i', chili: 0 },
  { nr: 31, cat: 'reis', name: 'Khao Phad Bai Kra Prao', desc: 'gebratener Reis mit Hähnchenfleisch, Peperoni und Basilikum', price: '11,00', allergens: 'g', chili: 3 },

  // ── Nudelgerichte ───────────────────────────────────────────
  { nr: 32, cat: 'nudeln', name: 'Bami Phad Gai', desc: 'gebratene Nudeln mit Hähnchenfleisch, Ei und Gemüse', price: '11,00', allergens: 'b,g', chili: 0 },
  { nr: 33, cat: 'nudeln', name: 'Bami Phad Nuea', desc: 'gebratene Nudeln mit Rindfleisch, Ei und Gemüse', price: '13,00', allergens: 'b,g', chili: 0 },
  { nr: 34, cat: 'nudeln', name: 'Bami Phad Gung', desc: 'gebratene Nudeln mit Garnelen, Ei und Gemüse', price: '15,00', allergens: 'b,g,d', chili: 0 },
  { nr: 35, cat: 'nudeln', name: 'Bami Phad Ped', desc: 'gebratene Nudeln mit knuspriger Ente, Ei und Gemüse', price: '15,00', allergens: 'a,b,g', chili: 0 },
  { nr: 36, cat: 'nudeln', name: 'Kuay Tiaw Phad Khi Mao Gai', desc: 'gebratene Reisnudeln mit Hähnchenfleisch und Gemüse', price: '11,00', allergens: 'b,g', chili: 1 },
  { nr: 37, cat: 'nudeln', name: 'Kuay Tiaw Phad Khi Mao Gung', desc: 'gebratene Reisnudeln mit Garnelen und Gemüse', price: '15,00', allergens: 'b,d,g', chili: 1 },
  { nr: 38, cat: 'nudeln', name: 'Kuay Tiaw Phad Thai Gung', desc: 'gebratene Reisnudeln auf thailändische Art mit Garnelen und Gemüse', price: '15,00', allergens: 'b,d,g', chili: 0 },
  { nr: 39, cat: 'nudeln', name: 'Kuay Tiaw Phad Thai Gai', desc: 'gebratene Reisnudeln auf thailändische Art mit Hähnchenfleisch, Sprossen und Gemüse', price: '11,00', allergens: 'b,g', chili: 0 },
  { nr: 40, cat: 'nudeln', name: 'Kuay Tiaw Rad Na Gung', desc: 'gebratene Reisnudeln in Soße mit Thaigemüse und Garnelen', price: '15,00', allergens: 'b,d,g', chili: 0 },
  { nr: 41, cat: 'nudeln', name: 'Kuay Tiaw Rad Na Gai', desc: 'gebratene Reisnudeln in Soße mit Thaigemüse und Hähnchenfleisch', price: '11,00', allergens: 'b,g', chili: 0 },
  { nr: 42, cat: 'nudeln', name: 'Kuay Tiaw Rad Na Talay', desc: 'gebratene Reisnudeln in Soße mit Thaigemüse und Meeresfrüchten', price: '15,00', allergens: 'b,g', chili: 0 },
  { nr: 43, cat: 'nudeln', name: 'Kuay Tiaw Phad Sie-Yu Gai', desc: 'gebratene Reisnudeln mit Hähnchenfleisch, Broccoli und Ei', price: '11,00', allergens: 'b,g', chili: 0 },
  { nr: 44, cat: 'nudeln', name: 'Kuay Tiaw Phad Sie-Yu Talay', desc: 'gebratene Reisnudeln mit Meeresfrüchten, Broccoli und Ei', price: '15,00', allergens: 'b,g', chili: 0 },

  // ── Hähnchengerichte mit Reis ───────────────────────────────
  { nr: 45, cat: 'haehnchen', name: 'Gai Phad Kratriam Prie Thai', desc: 'gebratenes Hähnchenfleisch mit Knoblauch, Gemüse und Pfeffer', price: '11,00', allergens: 'g', chili: 0 },
  { nr: 46, cat: 'haehnchen', name: 'Gang Gai Normhai', desc: 'Hähnchenfleisch in rotem Curry mit Kokosmilch, Bambusstreifen und Basilikum', price: '11,00', allergens: 'c', chili: 2 },
  { nr: 47, cat: 'haehnchen', name: 'Gai Phad Khing Sapparod', desc: 'gebratenes Hähnchenfleisch mit Ananas, Ingwer und Zwiebeln', price: '11,00', allergens: 'g', chili: 0 },
  { nr: 48, cat: 'haehnchen', name: 'Gai Phad Priow Waan', desc: 'Hähnchenfleisch in süßsaurer Soße mit Ananas, Zwiebeln und Paprika', price: '11,00', allergens: 'a', chili: 0 },
  { nr: 49, cat: 'haehnchen', name: 'Gai Phad Bai Krapao', desc: 'Hähnchenfleisch mit frischen Chilischoten und Minzblättern', price: '11,00', allergens: 'g', chili: 3 },
  { nr: 50, cat: 'haehnchen', name: 'Gaeing Kari Gai', desc: 'Hähnchenfleisch in gelbem Curry mit Kokosmilch, Kartoffeln und Zwiebeln', price: '11,00', allergens: 'c', chili: 1 },
  { nr: 51, cat: 'haehnchen', name: 'Gaeng Kiowan Gai', desc: 'Hähnchenfleisch in grünem Curry mit Kokosmilch, Thaiauberginen und Thaibasilikum', price: '11,00', allergens: 'c', chili: 3 },
  { nr: 52, cat: 'haehnchen', name: 'Gaeng Paneng Gai', desc: 'Hähnchenfleisch in rotem Curry mit Kokosmilch und Basilikum', price: '11,00', allergens: 'c', chili: 2 },
  { nr: 53, cat: 'haehnchen', name: 'Gai Phad Phong Garie', desc: 'gebratenes Hähnchenfleisch in gelbem Curry mit Ei, Paprika und Zwiebeln', price: '11,00', allergens: 'c,b', chili: 2 },
  { nr: 54, cat: 'haehnchen', name: 'Gai Phad Phak', desc: 'gebratenes Hähnchenfleisch mit Gemüse', price: '11,00', allergens: 'g', chili: 0 },
  { nr: 55, cat: 'haehnchen', name: 'Geang Phed Gai', desc: 'gebratenes Hähnchenfleisch mit rotem Curry und Gemüse', price: '11,00', allergens: 'c', chili: 1 },
  { nr: 56, cat: 'haehnchen', name: 'Gaeng Massa-Man Gai', desc: 'Hähnchenfleisch in Massaman-Curry, Kokosmilch, Kartoffeln und Zwiebeln', price: '11,00', allergens: 'c,i', chili: 0 },
  { nr: 57, cat: 'haehnchen', name: 'Gai Phad Brokkoli', desc: 'gebratenes Hähnchenfleisch mit Broccoli', price: '11,00', allergens: 'g', chili: 0 },
  { nr: 58, cat: 'haehnchen', name: 'Gai Phad King', desc: 'gebratenes Hähnchenfleisch mit Ingwer, Zwiebeln und Morcheln', price: '11,00', allergens: 'd', chili: 0 },

  // ── Rindfleischgerichte mit Reis ────────────────────────────
  { nr: 59, cat: 'rind', name: 'Nuea Phad Nahm Man Hoi', desc: 'gebratenes Rindfleisch mit Austernsoße und Broccoli', price: '13,00', allergens: 'g', chili: 0 },
  { nr: 60, cat: 'rind', name: 'Nuea Phad Bai Kra Prao', desc: 'gebratenes Rindfleisch mit Chilischoten, Gemüse und Basilikumblättern', price: '13,00', allergens: 'g', chili: 3 },
  { nr: 61, cat: 'rind', name: 'Gaeng Nuea Normhai', desc: 'Rindfleisch in rotem Curry mit Kokosmilch, Bambussprossen und Gemüse', price: '13,00', allergens: 'c', chili: 2 },
  { nr: 62, cat: 'rind', name: 'Nuea Phad Kratiam Thai', desc: 'gebratenes Rindfleisch mit Knoblauch, Gemüse und Pfeffer', price: '13,00', allergens: 'g', chili: 1 },
  { nr: 63, cat: 'rind', name: 'Nuea Prieow Waan', desc: 'gebratenes Rindfleisch mit Ananas, Paprika und Zwiebeln in süßsauerer Soße', price: '13,00', allergens: 'a', chili: 0 },
  { nr: 64, cat: 'rind', name: 'Gaeng Kiowan Nuea', desc: 'Rindfleisch in grünem Curry mit Kokosmilch, Thaiauberginen und Basilikum', price: '13,00', allergens: 'c', chili: 3 },
  { nr: 65, cat: 'rind', name: 'Gaeng Paneng Nuea', desc: 'Rindfleisch in rotem Curry mit Kokosmilch und Basilikum', price: '13,00', allergens: 'c', chili: 2 },
  { nr: 66, cat: 'rind', name: 'Massaman Nuea', desc: 'Rindfleisch in Massaman-Curry mit Kokosmilch, Cashewnüssen und Kartoffeln', price: '13,00', allergens: 'c,i', chili: 0 },
  { nr: 67, cat: 'rind', name: 'Nuea Phad Phak', desc: 'gebratenes Rindfleisch mit Gemüse', price: '13,00', allergens: 'g', chili: 0 },

  // ── Entengerichte mit Reis ──────────────────────────────────
  { nr: 68, cat: 'ente', name: 'Priow Waan', desc: 'knusprige Ente mit süßsauerer Soße und Gemüse', price: '15,00', allergens: 'a', chili: 0 },
  { nr: 69, cat: 'ente', name: 'Phad Phak', desc: 'knusprige Ente mit Gemüse', price: '15,00', allergens: 'a,g', chili: 0 },
  { nr: 70, cat: 'ente', name: 'Phad Bai Kra Prao', desc: 'knusprige Ente mit frischen Chilischoten, Gemüse und Basilikum', price: '15,00', allergens: 'a,g', chili: 3 },
  { nr: 71, cat: 'ente', name: 'Phad Khing', desc: 'knusprige Ente mit Ingwer, Paprika und Lauchzwiebeln', price: '15,00', allergens: 'a,g', chili: 0 },
  { nr: 72, cat: 'ente', name: 'Gaeng Kiao Wan Ped', desc: 'knusprige Ente in grünem Curry mit Kokosmilch, Thaiauberginen und Basilikum', price: '15,00', allergens: 'a,c', chili: 2 },
  { nr: 73, cat: 'ente', name: 'Gaeng Pannang Ped', desc: 'knusprige Ente in rotem Curry mit Kokosmilch und Basilikum', price: '15,00', allergens: 'a,c', chili: 2 },
  { nr: 74, cat: 'ente', name: 'Ped Phad Nor Mai', desc: 'knusprige Ente mit Bambussprossen', price: '15,00', allergens: 'a,g', chili: 0 },
  { nr: 75, cat: 'ente', name: 'Gaeng Phed Ped', desc: 'knusprige Ente in rotem Curry mit Gemüse', price: '15,00', allergens: 'a,c', chili: 2 },

  // ── Garnelen-Gerichte mit Reis ──────────────────────────────
  { nr: 76, cat: 'garnelen', name: 'Gung Phad Priow Waan', desc: 'gebratene Garnelen in süßsauerer Soße mit Paprika, Ananas und Zwiebeln', price: '15,00', allergens: 'a,d', chili: 0 },
  { nr: 77, cat: 'garnelen', name: 'Gung Phad Phak', desc: 'gebratene Garnelen mit Gemüse', price: '15,00', allergens: 'g,d', chili: 0 },
  { nr: 78, cat: 'garnelen', name: 'Gung Phad Khing', desc: 'gebratene Garnelen mit Ingwer, Zwiebeln und Pilzen', price: '15,00', allergens: 'g,d', chili: 0 },
  { nr: 79, cat: 'garnelen', name: 'Gung Phad Bai Kra Prao', desc: 'gebratene Garnelen mit frischen Chilischoten und Basilikum', price: '15,00', allergens: 'g,d', chili: 3 },
  { nr: 80, cat: 'garnelen', name: 'Gung Phad Brokkoli', desc: 'gebratene Garnelen mit Broccoli', price: '15,00', allergens: 'g,d', chili: 0 },
  { nr: 81, cat: 'garnelen', name: 'Gaeng Kiao Waan Gung', desc: 'Garnelen in grünem Curry mit Kokosmilch, Thaiauberginen und Basilikum', price: '15,00', allergens: 'c,d', chili: 2 },
  { nr: 82, cat: 'garnelen', name: 'Gaeng Paneng Gung', desc: 'Garnelen in rotem Curry mit Kokosmilch und Basilikum', price: '15,00', allergens: 'c,d', chili: 2 },
  { nr: 83, cat: 'garnelen', name: 'Gung Kratiam Prig Thai', desc: 'gebratene Garnelen mit Knoblauch, Gemüse und Pfeffer', price: '15,00', allergens: 'g,d', chili: 1 },
  { nr: 84, cat: 'garnelen', name: 'Gung Phad Woon Sen', desc: 'gebratene Garnelen mit Glasnudeln und Gemüse (ohne Reis)', price: '15,00', allergens: 'g,d', chili: 0 },

  // ── Vegetarische Gerichte mit Reis ──────────────────────────
  { nr: 85, cat: 'vegetarisch', name: 'Khao Phad Phak', desc: 'gebratener Reis mit Gemüse und Ei', price: '10,00', allergens: 'g,b', chili: 0 },
  { nr: 86, cat: 'vegetarisch', name: 'Bami Phad Phak', desc: 'gebratene Nudeln mit Gemüse und Ei (ohne Reis)', price: '10,00', allergens: 'g,b', chili: 0 },
  { nr: 87, cat: 'vegetarisch', name: 'Phad Phak', desc: 'verschiedene gebratene Gemüse', price: '10,00', allergens: 'g', chili: 0 },
  { nr: 88, cat: 'vegetarisch', name: 'Phad Phak Priow Waan', desc: 'gebratenes Gemüse und Ananas in süßsauerer Soße', price: '10,00', allergens: 'g,a', chili: 0 },
  { nr: 89, cat: 'vegetarisch', name: 'Woon Sen Phad Phak', desc: 'gebratenes Gemüse mit Glasnudeln (ohne Reis)', price: '10,00', allergens: 'g', chili: 0 },
  { nr: 90, cat: 'vegetarisch', name: 'Tao Hoo Phad Phak', desc: 'gebratener Tofu mit Gemüse', price: '11,00', allergens: 'g', chili: 0 },
  { nr: 91, cat: 'vegetarisch', name: 'Gaeng Phed Phak', desc: 'gebratenes Gemüse in rotem Curry', price: '10,00', allergens: 'c', chili: 2 },
  { nr: 92, cat: 'vegetarisch', name: 'Gaeng Kiao Wan Phak', desc: 'verschiedenes Gemüse in grünem Curry mit Kokosmilch', price: '10,00', allergens: 'c', chili: 1 },
  { nr: 93, cat: 'vegetarisch', name: 'Phad Phak Phong Garie', desc: 'gebratene Champignons in gelbem Curry mit Ei und Gemüse', price: '10,00', allergens: 'c,b', chili: 2 },
  { nr: 94, cat: 'vegetarisch', name: 'Por Pia Tord', desc: 'thailändische Frühlingsrolle – pro Stück', price: '1,50', allergens: 'a', chili: 0 },

  // ── Extras ──────────────────────────────────────────────────
  { nr: null, cat: 'extras', name: 'Portion Reis', desc: '', price: '1,50', allergens: '', chili: 0 },
  { nr: null, cat: 'extras', name: 'Extra Zutaten', desc: '', price: '1,50', allergens: '', chili: 0 },
  { nr: null, cat: 'extras', name: 'Süß-Sauer-Soße', desc: '', price: '2,00', allergens: '', chili: 0 },
  { nr: null, cat: 'extras', name: 'Erdnusssoße', desc: '', price: '3,00', allergens: 'i,c', chili: 0 },
  { nr: null, cat: 'extras', name: 'Tofu', desc: '', price: '1,50', allergens: '', chili: 0 },
  { nr: null, cat: 'extras', name: 'Hähnchen', desc: '', price: '5,00', allergens: '', chili: 0 },
  { nr: null, cat: 'extras', name: 'Rind', desc: '', price: '6,00', allergens: '', chili: 0 },
  { nr: null, cat: 'extras', name: 'Ente / Garnelen', desc: '', price: '8,50', allergens: 'a / e,d', chili: 0 },

  // ── Dessert ─────────────────────────────────────────────────
  { nr: 95, cat: 'dessert', name: 'Gebratene Bananen mit Honig', desc: '', price: '4,50', allergens: '', chili: 0 },
  { nr: 96, cat: 'dessert', name: 'Gebratene Bananen mit Honig und Vanilleeis', desc: '', price: '5,50', allergens: '', chili: 0 },
  { nr: 97, cat: 'dessert', name: 'Gebratene Ananas mit Honig', desc: '', price: '4,50', allergens: '', chili: 0 },
  { nr: 98, cat: 'dessert', name: 'Gebratene Ananas mit Honig und Vanilleeis', desc: '', price: '5,50', allergens: '', chili: 0 },
  { nr: null, cat: 'dessert', name: 'Klebereis mit Mango', desc: 'saisonal – nur für kurze Zeit, solange verfügbar', price: '10,00', allergens: '', chili: 0 },

  // ── Getränke (alle ohne Pfand) ──────────────────────────────
  { nr: null, cat: 'getraenke', name: 'Coca-Cola / Coca-Cola light / Fanta / Sprite / Mezzomix', desc: '0,33 l · Zusatzstoffe 1, 2, 3, 4', price: '2,00', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Sprudel & Mineralwasser', desc: '0,5 l', price: '1,80', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Thailändische Säfte', desc: 'Mango, Guava, Lychee u. a. · 0,24 l', price: '3,00', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Capri-Sonne', desc: '0,2 l', price: '0,90', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Kölsch', desc: '0,33 l', price: '2,10', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Kölsch alkoholfrei', desc: '0,33 l', price: '2,10', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Vitamalz', desc: '0,5 l', price: '2,10', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Chang Beer / Singha Beer', desc: '0,33 l', price: '3,00', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Fassbrause', desc: 'Orange oder Zitrone · 0,5 l', price: '2,10', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Ingwer-Tee', desc: '', price: '1,50', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Fuze Tea', desc: '0,4 l', price: '2,80', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Durstlöscher', desc: 'verschiedene Sorten · 0,5 l', price: '2,10', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Apfelschorle', desc: '0,33 l', price: '1,80', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'OISHI Tea', desc: 'verschiedene Sorten · 0,5 l', price: '2,80', allergens: '', chili: 0 },
  { nr: null, cat: 'getraenke', name: 'Uludağ', desc: '0,33 l', price: '2,80', allergens: '', chili: 0 },
];

const ALLERGENS_LEGEND = {
  a: 'Glutenhaltiges Getreide', b: 'Eier', c: 'Milch / Laktose', d: 'Schalenfrüchte',
  e: 'Fisch', g: 'Soja', i: 'Erdnüsse',
};

const ADDITIVES_LEGEND = {
  1: 'Farbstoff', 2: 'Süßungsmittel', 3: 'geschwefelt', 4: 'koffeinhaltig', 5: 'Antioxidationsmittel',
};

const SPICE_LEVELS = [
  { chili: 1, label: 'würzig scharf', surcharge: '0,30' },
  { chili: 2, label: 'mittel scharf', surcharge: '0,60' },
  { chili: 3, label: 'sehr scharf', surcharge: '0,90' },
  { chili: 4, label: 'höllisch scharf', surcharge: '1,20' },
];
