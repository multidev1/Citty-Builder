// cards.js

const CARD_BACK_IMAGE = "cards/0000_back.png";

// Spelinstellingen volgens de regels (2 tot 4 spelers)
const GAME_SETTINGS = {
  minPlayers: 2,
  maxPlayers: 4,
  startingHandSize: 5,
  maxMonsters: 3,
  targetBuildings: 7
};

const DECK_DATA = [
  // --- CENTRAL BANK (000 t/m 006) ---
  { id: 0, name: "Central Bank", type: "building", image: "cards/000.png" },
  { id: 1, name: "Central Bank", type: "building", image: "cards/001.png" },
  { id: 2, name: "Central Bank", type: "building", image: "cards/002.png" },
  { id: 3, name: "Central Bank", type: "building", image: "cards/003.png" },
  { id: 4, name: "Central Bank", type: "building", image: "cards/004.png" },
  { id: 5, name: "Central Bank", type: "building", image: "cards/005.png" },
  { id: 6, name: "Central Bank", type: "building", image: "cards/006.png" },

  // --- GRAND HOTEL (007 t/m 013) ---
  { id: 7,  name: "Grand Hotel", type: "building", image: "cards/007.png" },
  { id: 8,  name: "Grand Hotel", type: "building", image: "cards/008.png" },
  { id: 9,  name: "Grand Hotel", type: "building", image: "cards/009.png" },
  { id: 10, name: "Grand Hotel", type: "building", image: "cards/010.png" },
  { id: 11, name: "Grand Hotel", type: "building", image: "cards/011.png" },
  { id: 12, name: "Grand Hotel", type: "building", image: "cards/012.png" },
  { id: 13, name: "Grand Hotel", type: "building", image: "cards/013.png" },

  // --- MEGA CASINO (014 t/m 020) ---
  { id: 14, name: "Mega Casino", type: "building", image: "cards/014.png" },
  { id: 15, name: "Mega Casino", type: "building", image: "cards/015.png" },
  { id: 16, name: "Mega Casino", type: "building", image: "cards/016.png" },
  { id: 17, name: "Mega Casino", type: "building", image: "cards/017.png" },
  { id: 18, name: "Mega Casino", type: "building", image: "cards/018.png" },
  { id: 19, name: "Mega Casino", type: "building", image: "cards/019.png" },
  { id: 20, name: "Mega Casino", type: "building", image: "cards/020.png" },

  // --- HOUSE (021 t/m 027) ---
  { id: 21, name: "House", type: "building", image: "cards/021.png" },
  { id: 22, name: "House", type: "building", image: "cards/022.png" },
  { id: 23, name: "House", type: "building", image: "cards/023.png" },
  { id: 24, name: "House", type: "building", image: "cards/024.png" },
  { id: 25, name: "House", type: "building", image: "cards/025.png" },
  { id: 26, name: "House", type: "building", image: "cards/026.png" },
  { id: 27, name: "House", type: "building", image: "cards/027.png" },

  // --- CATHEDRAL (028 t/m 034) ---
  { id: 28, name: "Cathedral", type: "building", image: "cards/028.png" },
  { id: 29, name: "Cathedral", type: "building", image: "cards/029.png" },
  { id: 30, name: "Cathedral", type: "building", image: "cards/030.png" },
  { id: 31, name: "Cathedral", type: "building", image: "cards/031.png" },
  { id: 32, name: "Cathedral", type: "building", image: "cards/032.png" },
  { id: 33, name: "Cathedral", type: "building", image: "cards/033.png" },
  { id: 34, name: "Cathedral", type: "building", image: "cards/034.png" },

  // --- SHOPPING MALL (035 t/m 041) ---
  { id: 35, name: "Shopping Mall", type: "building", image: "cards/035.png" },
  { id: 36, name: "Shopping Mall", type: "building", image: "cards/036.png" },
  { id: 37, name: "Shopping Mall", type: "building", image: "cards/037.png" },
  { id: 38, name: "Shopping Mall", type: "building", image: "cards/038.png" },
  { id: 39, name: "Shopping Mall", type: "building", image: "cards/039.png" },
  { id: 40, name: "Shopping Mall", type: "building", image: "cards/040.png" },
  { id: 41, name: "Shopping Mall", type: "building", image: "cards/041.png" },

  // --- INTERNATIONAL AIRPORT (042 t/m 048) ---
  { id: 42, name: "International Airport", type: "building", image: "cards/042.png" },
  { id: 43, name: "International Airport", type: "building", image: "cards/043.png" },
  { id: 44, name: "International Airport", type: "building", image: "cards/044.png" },
  { id: 45, name: "International Airport", type: "building", image: "cards/045.png" },
  { id: 46, name: "International Airport", type: "building", image: "cards/046.png" },
  { id: 47, name: "International Airport", type: "building", image: "cards/047.png" },
  { id: 48, name: "International Airport", type: "building", image: "cards/048.png" },

  // --- MONSTERS ---
  // Bear Guardian (49 t/m 56)
  { id: 49, name: "Bear Guardian", type: "monster", power: 5,  hits: 1, maxHits: 1, level: 1, image: "cards/049.png" },
  { id: 50, name: "Bear Guardian", type: "monster", power: 5,  hits: 1, maxHits: 1, level: 1, image: "cards/050.png" },
  { id: 51, name: "Bear Guardian", type: "monster", power: 10, hits: 2, maxHits: 2, level: 2, image: "cards/051.png" },
  { id: 52, name: "Bear Guardian", type: "monster", power: 10, hits: 2, maxHits: 2, level: 2, image: "cards/052.png" },
  { id: 53, name: "Bear Guardian", type: "monster", power: 15, hits: 3, maxHits: 3, level: 3, image: "cards/053.png" },
  { id: 54, name: "Bear Guardian", type: "monster", power: 15, hits: 3, maxHits: 3, level: 3, image: "cards/054.png" },
  { id: 55, name: "Bear Guardian", type: "monster", power: 20, hits: 4, maxHits: 4, level: 4, image: "cards/055.png" },
  { id: 56, name: "Bear Guardian", type: "monster", power: 20, hits: 4, maxHits: 4, level: 4, image: "cards/056.png" },

  // Reptile Ninja (57 t/m 64)
  { id: 57, name: "Reptile Ninja", type: "monster", power: 5,  hits: 1, maxHits: 1, level: 1, image: "cards/057.png" },
  { id: 58, name: "Reptile Ninja", type: "monster", power: 5,  hits: 1, maxHits: 1, level: 1, image: "cards/058.png" },
  { id: 59, name: "Reptile Ninja", type: "monster", power: 10, hits: 2, maxHits: 2, level: 2, image: "cards/059.png" },
  { id: 60, name: "Reptile Ninja", type: "monster", power: 10, hits: 2, maxHits: 2, level: 2, image: "cards/060.png" },
  { id: 61, name: "Reptile Ninja", type: "monster", power: 15, hits: 3, maxHits: 3, level: 3, image: "cards/061.png" },
  { id: 62, name: "Reptile Ninja", type: "monster", power: 15, hits: 3, maxHits: 3, level: 3, image: "cards/062.png" },
  { id: 63, name: "Reptile Ninja", type: "monster", power: 20, hits: 4, maxHits: 4, level: 4, image: "cards/063.png" },
  { id: 64, name: "Reptile Ninja", type: "monster", power: 20, hits: 4, maxHits: 4, level: 4, image: "cards/064.png" },

  // Stone Golem (65 t/m 72)
  { id: 65, name: "Stone Golem",   type: "monster", power: 5,  hits: 1, maxHits: 1, level: 1, image: "cards/065.png" },
  { id: 66, name: "Stone Golem",   type: "monster", power: 5,  hits: 1, maxHits: 1, level: 1, image: "cards/066.png" },
  { id: 67, name: "Stone Golem",   type: "monster", power: 10, hits: 2, maxHits: 2, level: 2, image: "cards/067.png" },
  { id: 68, name: "Stone Golem",   type: "monster", power: 10, hits: 2, maxHits: 2, level: 2, image: "cards/068.png" },
  { id: 69, name: "Stone Golem",   type: "monster", power: 15, hits: 3, maxHits: 3, level: 3, image: "cards/069.png" },
  { id: 70, name: "Stone Golem",   type: "monster", power: 15, hits: 3, maxHits: 3, level: 3, image: "cards/070.png" },
  { id: 71, name: "Stone Golem",   type: "monster", power: 20, hits: 4, maxHits: 4, level: 4, image: "cards/071.png" },
  { id: 72, name: "Stone Golem",   type: "monster", power: 20, hits: 4, maxHits: 4, level: 4, image: "cards/072.png" },

  // Warrior Wolf (73 t/m 80)
  { id: 73, name: "Warrior Wolf",  type: "monster", power: 5,  hits: 1, maxHits: 1, level: 1, image: "cards/073.png" },
  { id: 74, name: "Warrior Wolf",  type: "monster", power: 5,  hits: 1, maxHits: 1, level: 1, image: "cards/074.png" },
  { id: 75, name: "Warrior Wolf",  type: "monster", power: 10, hits: 2, maxHits: 2, level: 2, image: "cards/075.png" },
  { id: 76, name: "Warrior Wolf",  type: "monster", power: 10, hits: 2, maxHits: 2, level: 2, image: "cards/076.png" },
  { id: 77, name: "Warrior Wolf",  type: "monster", power: 15, hits: 3, maxHits: 3, level: 3, image: "cards/077.png" },
  { id: 78, name: "Warrior Wolf",  type: "monster", power: 15, hits: 3, maxHits: 3, level: 3, image: "cards/078.png" },
  { id: 79, name: "Warrior Wolf",  type: "monster", power: 20, hits: 4, maxHits: 4, level: 4, image: "cards/079.png" },
  { id: 80, name: "Warrior Wolf",  type: "monster", power: 20, hits: 4, maxHits: 4, level: 4, image: "cards/080.png" },

  // --- ACTION CARDS ---
  // Reverse! (81 t/m 86)
  { id: 81, name: "Reverse!", type: "action", description: "Immediately reverse the turn order around the table.", image: "cards/081.png" },
  { id: 82, name: "Reverse!", type: "action", description: "Immediately reverse the turn order around the table.", image: "cards/082.png" },
  { id: 83, name: "Reverse!", type: "action", description: "Immediately reverse the turn order around the table.", image: "cards/083.png" },
  { id: 84, name: "Reverse!", type: "action", description: "Immediately reverse the turn order around the table.", image: "cards/084.png" },
  { id: 85, name: "Reverse!", type: "action", description: "Immediately reverse the turn order around the table.", image: "cards/085.png" },
  { id: 86, name: "Reverse!", type: "action", description: "Immediately reverse the turn order around the table.", image: "cards/086.png" },

  // Skip! (87 t/m 92)
  { id: 87, name: "Skip!", type: "action", description: "Force a chosen player to skip their entire turn.", image: "cards/087.png" },
  { id: 88, name: "Skip!", type: "action", description: "Force a chosen player to skip their entire turn.", image: "cards/088.png" },
  { id: 89, name: "Skip!", type: "action", description: "Force a chosen player to skip their entire turn.", image: "cards/089.png" },
  { id: 90, name: "Skip!", type: "action", description: "Force a chosen player to skip their entire turn.", image: "cards/090.png" },
  { id: 91, name: "Skip!", type: "action", description: "Force a chosen player to skip their entire turn.", image: "cards/091.png" },
  { id: 92, name: "Skip!", type: "action", description: "Force a chosen player to skip their entire turn.", image: "cards/092.png" },

  // Draw Two! (93 t/m 98)
  { id: 93, name: "Draw Two!", type: "action", description: "Target opponent must draw 2 extra cards from the deck.", image: "cards/093.png" },
  { id: 94, name: "Draw Two!", type: "action", description: "Target opponent must draw 2 extra cards from the deck.", image: "cards/094.png" },
  { id: 95, name: "Draw Two!", type: "action", description: "Target opponent must draw 2 extra cards from the deck.", image: "cards/095.png" },
  { id: 96, name: "Draw Two!", type: "action", description: "Target opponent must draw 2 extra cards from the deck.", image: "cards/096.png" },
  { id: 97, name: "Draw Two!", type: "action", description: "Target opponent must draw 2 extra cards from the deck.", image: "cards/097.png" },
  { id: 98, name: "Draw Two!", type: "action", description: "Target opponent must draw 2 extra cards from the deck.", image: "cards/098.png" },

  // Demolish! (99 t/m 104)
  { id: 99, name: "Demolish!", type: "action", description: "Directly destroy 1 building of an opponent (bypasses all monsters).", image: "cards/099.png" },
  { id: 100, name: "Demolish!", type: "action", description: "Directly destroy 1 building of an opponent (bypasses all monsters).", image: "cards/100.png" },
  { id: 101, name: "Demolish!", type: "action", description: "Directly destroy 1 building of an opponent (bypasses all monsters).", image: "cards/101.png" },
  { id: 102, name: "Demolish!", type: "action", description: "Directly destroy 1 building of an opponent (bypasses all monsters).", image: "cards/102.png" },
  { id: 103, name: "Demolish!", type: "action", description: "Directly destroy 1 building of an opponent (bypasses all monsters).", image: "cards/103.png" },
  { id: 104, name: "Demolish!", type: "action", description: "Directly destroy 1 building of an opponent (bypasses all monsters).", image: "cards/104.png" },

  // Hand Swap! (105 t/m 110)
  { id: 105, name: "Hand Swap!", type: "action", description: "Trade your entire hand of cards with any chosen player.", image: "cards/105.png" },
  { id: 106, name: "Hand Swap!", type: "action", description: "Trade your entire hand of cards with any chosen player.", image: "cards/106.png" },
  { id: 107, name: "Hand Swap!", type: "action", description: "Trade your entire hand of cards with any chosen player.", image: "cards/107.png" },
  { id: 108, name: "Hand Swap!", type: "action", description: "Trade your entire hand of cards with any chosen player.", image: "cards/108.png" },
  { id: 109, name: "Hand Swap!", type: "action", description: "Trade your entire hand of cards with any chosen player.", image: "cards/109.png" },
  { id: 110, name: "Hand Swap!", type: "action", description: "Trade your entire hand of cards with any chosen player.", image: "cards/110.png" }
];