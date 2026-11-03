// Volledige en foutloze rules.js voor CITTY BUILDER
const TRANSLATIONS = {
    nl: {
        newGame: "NEW GAME",
        howToPlay: "HOW TO PLAY",
        contact: "CONTACT",
        settings: "SETTINGS",
        selectMode: "KIES SPELMODUS",
        selectPlayers: "KIES HET AANTAL SPELERS",
        modeAi: "🤖 Tegen Computer (AI)",
        modeMp: "👥 Multiplayer (Lokaal / 1 vs 1)",
        settingsTitle: "⚙️ INSTELLINGEN",
        chooseLang: "Kies Taal / Select Language:",
        rulesTitle: "📜 SPELREGELS",
        contactTitle: "📦 CONTACT & KAARTEN BESTELLEN",
        back: "TERUG",
        rulesHtml: `
            <h2>📜 CITTY BUILDER</h2>
            <p><i>The Ultimate Card Game of Building, Combat & Sabotage</i><br><b>2 - 4 Players</b></p>
            <hr style="border: 0; border-top: 1px solid #c19b47; margin: 15px 0;">

            <h3>🎯 DOEL VAN HET SPEL</h3>
            <p>Bouw als eerste <b>7 verschillende gebouwen</b> uniek in je Back Line en verdedig ze een volledige ronde (tot het begin van je volgende beurt).</p>

            <h3>🎴 HET DEK (112 Kaarten)</h3>
            <p>Het spel wordt gespeeld met één centrale trekstapel van 112 kaarten, verdeeld in drie categorieën:</p>
            <ul>
                <li><b>Gebouwen (ca. 49 kaarten):</b> Unieke locaties zoals Bank, Hotel, Kathedraal, Casino, Huis, Winkelcentrum, Internationale Luchthaven.</li>
                <li><b>Monsters (ca. 33 kaarten):</b> Verdedigers met een Level (LV), kracht en een specifieke incasseringscapaciteit (HP = Level: LV1=1 hit, LV2=2 hits, LV3=3 hits, LV4=4 hits).</li>
                <li><b>Sabotage (ca. 30 kaarten):</b> Actiekaarten die de regels breken en op elk moment gespeeld kunnen worden.</li>
            </ul>

            <h3>🗺️ HET SPEELVELD</h3>
            <p>Elke speler bouwt twee zones voor zich op tafel:</p>
            <p><b>Front Line (Monster Zone):</b> Hier staan je monsters om je gebouwen te bewaken (maximaal 3).</p>
            <p><b>Back Line (Gebouw Zone):</b> Hier plaats je je unieke gebouwen (maximaal 7).</p>

            <h3>🛡️ De Gouden Schild Regel</h3>
            <p>Zolang je minstens 1 monster in je Front Line hebt, zijn al je gebouwen volledig beschermd tegen standaard aanvallen. Tegenstanders moeten eerst al je monsters verslaan voordat ze je gebouwen kunnen raken.</p>

            <h3>🚀 SPELVERLOOP</h3>
            <p><b>Setup:</b></p>
            <ul>
                <li>Schud alle 112 kaarten en leg ze als centrale trekstapel neer.</li>
                <li>Elke speler krijgt 5 startkaarten.</li>
                <li>De jongste speler begint, daarna met de klok mee.</li>
            </ul>

            <p><b>Beurtstructuur:</b><br>Elke beurt doe je 1 Hoofdactie en vul je daarna je hand aan tot 5 kaarten:</p>

            <p><b>STAP 1: Kies 1 Hoofdactie</b></p>
            <ul>
                <li><b>Optie A — BOUWEN:</b> Plaats 1 gebouw uit je hand open in je Back Line (moet uniek zijn, geen dubbele gebouwen!).</li>
                <li><b>Optie B — MONSTER OPROEPEN:</b> Plaats 1 monster uit je hand open in je Front Line (maximaal 3 tegelijk).</li>
                <li><b>Optie C — AANVALLEN:</b> Kies 1 monster uit je Front Line om een vijandelijk monster of gebouw aan te vallen.</li>
            </ul>

            <p><b>STAP 2: Hand aanvullen</b><br>Trek kaarten van de stapel tot je hand weer uit 5 kaarten bestaat.</p>

            <h3>⚡ SABOTAGEKAARTEN</h3>
            <p>Sabotagekaarten speel je direct uit je hand wanneer je maar wilt, zelfs tijdens de beurt van een ander:</p>
            <ul>
                <li><b>Skip!:</b> Laat een speler zijn beurt overslaan.</li>
                <li><b>Draw Two!:</b> Laat een tegenstander 2 extra kaarten trekken.</li>
                <li><b>Demolish!:</b> Vernietig direct 1 gebouw van een tegenstander (bypassed monsters).</li>
                <li><b>Hand Swap!:</b> Wissel je hele hand met die van een andere speler.</li>
            </ul>

            <h3>🏆 DE WINNAAR</h3>
            <p>Zodra een speler <b>7 UNIEKE GEBOUWEN</b> in zijn Back Line heeft, moet hij dit luid aankondigen. Als ze aan het begin van zijn volgende beurt nog overeind staan, is die speler de absolute winnaar!</p>
        `
    },
    en: {
        newGame: "NEW GAME",
        howToPlay: "HOW TO PLAY",
        contact: "CONTACT",
        settings: "SETTINGS",
        selectMode: "CHOOSE GAME MODE",
        selectPlayers: "CHOOSE NUMBER OF PLAYERS",
        modeAi: "🤖 Vs Computer (AI)",
        modeMp: "👥 Multiplayer (Local / 1 vs 1)",
        settingsTitle: "⚙️ SETTINGS",
        chooseLang: "Select Language:",
        rulesTitle: "📜 GAME RULES",
        contactTitle: "📦 CONTACT & ORDER CARDS",
        back: "BACK",
        rulesHtml: `
            <h2>📜 CITTY BUILDER</h2>
            <p><i>The Ultimate Card Game of Building, Combat & Sabotage</i><br><b>2 - 4 Players</b></p>
            <hr style="border: 0; border-top: 1px solid #c19b47; margin: 15px 0;">

            <h3>🎯 OBJECTIVE OF THE GAME</h3>
            <p>Be the first player to have <b>7 different buildings</b> face-up in your backline and successfully defend them for a full round (until the start of your next turn).</p>

            <h3>🎴 THE DECK (112 Cards)</h3>
            <p>The game is played with a single central draw pile consisting of 112 cards, divided into three categories:</p>
            <ul>
                <li><b>Buildings:</b> Unique locations. Bank, Hotel, Cathedral, Casino, House, Shopping Mall, International Airport.</li>
                <li><b>Monsters:</b> Defenders featuring a Level (LV) and hit capacity (HP = Level: LV1=1 hit, LV2=2 hits, LV3=3 hits, LV4=4 hits).</li>
                <li><b>Sabotage:</b> Action cards that break the rules and can be played at any time.</li>
            </ul>

            <h3>🗺️ THE BATTLEFIELD</h3>
            <p>Each player builds two distinct zones in front of them:</p>
            <p><b>Front Line:</b> Where your Monsters stand to guard your buildings (max 3).</p>
            <p><b>Back Line:</b> Where your unique Buildings are placed (max 7).</p>

            <h3>🛡️ The Golden Shield Rule</h3>
            <p>As long as you have at least 1 Monster in your Front Line, all your Buildings are fully protected from standard attacks.</p>

            <h3>🚀 GAMEPLAY</h3>
            <p><b>Turn Structure:</b><br>Choose 1 Main Action (Build, Summon, or Attack), then refill your hand to 5 cards.</p>

            <h3>⚡ SABOTAGE CARDS</h3>
            <p>Play out of turn to sabotage opponents, force skips, draw cards, or demolish buildings.</p>

            <h3>🏆 THE WINNER</h3>
            <p>Build 7 unique buildings and defend them until your next turn to win the game!</p>
        `
    },
    fr: {
        newGame: "NOUVELLE PARTIE",
        howToPlay: "COMMENT JOUER",
        contact: "CONTACT",
        settings: "PARAMÈTRES",
        selectMode: "CHOISIR LE MODE DE JEU",
        selectPlayers: "CHOISIR LE NOMBRE DE JOUEURS",
        modeAi: "🤖 Contre l'ordinateur (IA)",
        modeMp: "👥 Multijoueur (Local / 1 vs 1)",
        settingsTitle: "⚙️ PARAMÈTRES",
        chooseLang: "Choisir la langue :",
        rulesTitle: "📜 RÈGLES DU JEU",
        contactTitle: "📦 CONTACT & COMMANDER",
        back: "RETOUR",
        rulesHtml: `
            <h2>📜 CITTY BUILDER</h2>
            <p><i>Le jeu de cartes ultime de construction, de combat et de sabotage</i><br><b>2 - 4 Joueurs</b></p>
            <h3>🎯 BUT DU JEU</h3>
            <p>Soyez le premier à construire <b>7 bâtiments uniques</b> dans votre Back Line et à les défendre pendant un tour complet.</p>
            <h3>🛡️ RÈGLE DU BOUCLIER D'OR</h3>
            <p>Tant que vous avez au moins 1 monstre dans votre Front Line, vos bâtiments sont protégés.</p>
            <h3>🏆 LE GAGNANT</h3>
            <p>Le premier à défendre ses 7 bâtiments gagne la partie !</p>
        `
    },
    es: {
        newGame: "NUEVA PARTIDA",
        howToPlay: "CÓMO JUGAR",
        contact: "CONTACTO",
        settings: "AJUSTES",
        selectMode: "ELEGIR MODO DE JUEGO",
        selectPlayers: "ELEGIR NÚMERO DE JUGADORES",
        modeAi: "🤖 Contra la computadora (IA)",
        modeMp: "👥 Multijugador (Local / 1 vs 1)",
        settingsTitle: "⚙️ AJUSTES",
        chooseLang: "Seleccionar idioma:",
        rulesTitle: "📜 REGLAS DEL JUEGO",
        contactTitle: "📦 CONTACTO Y PEDIDOS",
        back: "VOLVER",
        rulesHtml: `
            <h2>📜 CITTY BUILDER</h2>
            <p><i>El juego de cartas definitivo de construcción, combate y sabotaje</i><br><b>2 - 4 Jugadores</b></p>
            <h3>🎯 OBJETIVO DEL JUEGO</h3>
            <p>Sé el primero en construir <b>7 edificios únicos</b> en tu Back Line y defiéndelos durante una ronda completa.</p>
            <h3>🛡️ REGLA DEL ESCUDO DORADO</h3>
            <p>Mientras tengas al menos 1 monstruo en tu Front Line, tus edificios están protegidos.</p>
            <h3>🏆 EL GANADOR</h3>
            <p>¡El primero en defender sus 7 edificios gana la partida!</p>
        `
    }
};

const GAME_RULES_HTML = TRANSLATIONS.nl.rulesHtml;