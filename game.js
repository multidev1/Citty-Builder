
"use strict";

// ==========================================
// CITTY BUILDER - GAME ENGINE
// AI MODE + LOCAL MULTIPLAYER
// ==========================================

let deck = [];
let discardPile = [];
let players = [];
let currentPlayerIndex = 0;
let pendingWinPlayer = null;

let turnDirection = 1;

let selectedAttacker = null;
let pendingSabotageCard = null;

let currentGameMode = 'ai';
let waitingForLocalHandoff = false;

let aiTurnTimer = null;

const CARD_BACK_IMG = "0000_back.png";

// ==========================================
// VERTALINGEN
// ==========================================

function getGameText() {
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'nl';

    const texts = {
        nl: {
            yourTurn: "Jouw Beurt (Speel een kaart of klik op je monster om aan te vallen)",
            aiTurn: "Beurt van",
            deckEmpty: "Leeg",
            building: "Gebouw",
            monster: "Monster",
            selectAttacker: "Aanvaller geselecteerd. Kies een doelwit!",
            sameLevel: "Gelijk Level! Beide monsters vernietigd.",
            hitMonster: "Hit! Vijandelijk monster is verslagen!",
            hitStatus: "Hit uitgevoerd op",
            hpText: "HP",
            goldenShield: "Gouden Schild Regel: Versla eerst alle monsters in de Front Line!",
            buildingDestroyed: "Doelwit geraakt! Gebouw is vernietigd.",
            alreadyHasBuilding: "Je hebt al een",
            uniqueBuilding: "Gebouwen moeten uniek zijn.",
            buildingZoneFull: "Je Back Line zit vol met gebouwen!",
            monsterSummoned: "Monster opgeroepen",
            frontLineFull: "Je Front Line zit vol (maximaal 3 monsters)!",
            sabotageSelected: "Sabotage geselecteerd! KLIK NU OP DE TEGENSTANDER om dit toe te passen.",
            demolishDone: "DEMOLISH! Gebouw direct vernietigd!",
            noBuildingsToDemolish: "heeft geen gebouwen om te slopen!",
            drawTwoDone: "DRAW TWO! Extra kaarten getrokken.",
            handSwapDone: "HAND SWAP! Handen zijn gewisseld!",
            skipTurnDone: "slaat zijn volgende beurt over door Sabotage!",
            winAlert: "is de absolute winnaar van CITTY BUILDER!",
            winWarning: "heeft 7 unieke gebouwen! Verdedig ze tot de volgende beurt",
            aiPlacedBuilding: "heeft een gebouw geplaatst",
            aiSummonedMonster: "heeft een monster opgeroepen",
            aiSabotage: "speelt sabotagekaart op",
            aiDiscarded: "heeft een kaart afgelegd"
        },

        en: {
            yourTurn: "Your Turn (Play a card or click your monster to attack)",
            aiTurn: "Turn of",
            deckEmpty: "Empty",
            building: "Building",
            monster: "Monster",
            selectAttacker: "Attacker selected. Choose a target!",
            sameLevel: "Equal Level! Both monsters destroyed.",
            hitMonster: "Hit! Enemy monster is defeated!",
            hitStatus: "Hit performed on",
            hpText: "HP",
            goldenShield: "Golden Shield Rule: Defeat all monsters in the Front Line first!",
            buildingDestroyed: "Target hit! Building is destroyed.",
            alreadyHasBuilding: "You already have a",
            uniqueBuilding: "Buildings must be unique.",
            buildingZoneFull: "Your Back Line is full of buildings!",
            monsterSummoned: "Monster summoned",
            frontLineFull: "Your Front Line is full (max 3 monsters)!",
            sabotageSelected: "Sabotage selected! NOW CLICK ON THE OPPONENT to apply it.",
            demolishDone: "DEMOLISH! Building directly destroyed!",
            noBuildingsToDemolish: "has no buildings to demolish!",
            drawTwoDone: "DRAW TWO! Extra cards drawn.",
            handSwapDone: "HAND SWAP! Hands have been swapped!",
            skipTurnDone: "skips their next turn due to Sabotage!",
            winAlert: "is the absolute winner of CITTY BUILDER!",
            winWarning: "has 7 unique buildings! Defend them until your next turn",
            aiPlacedBuilding: "placed a building",
            aiSummonedMonster: "summoned a monster",
            aiSabotage: "plays sabotage card on",
            aiDiscarded: "discarded a card"
        },

        fr: {
            yourTurn: "Votre Tour (Jouez une carte ou cliquez sur votre monstre pour attaquer)",
            aiTurn: "Tour de",
            deckEmpty: "Vide",
            building: "Bâtiment",
            monster: "Monstre",
            selectAttacker: "Attaquant sélectionné. Choisissez une cible !",
            sameLevel: "Niveau égal ! Les deux monstres sont détruits.",
            hitMonster: "Touché ! Le monstre ennemi est vaincu !",
            hitStatus: "Attaque effectuée sur",
            hpText: "PV",
            goldenShield: "Règle du Bouclier d'Or : Battez d'abord tous les monstres de la Front Line !",
            buildingDestroyed: "Cible touchée ! Le bâtiment est détruit.",
            alreadyHasBuilding: "Vous avez déjà un",
            uniqueBuilding: "Les bâtiments doivent être uniques.",
            buildingZoneFull: "Votre Back Line est pleine !",
            monsterSummoned: "Monstre invoqué",
            frontLineFull: "Votre Front Line est pleine (max 3 monstres) !",
            sabotageSelected: "Sabotage sélectionné ! CLIQUEZ SUR L'ADVERSAIRE pour l'appliquer.",
            demolishDone: "DEMOLISH ! Bâtiment détruit directement !",
            noBuildingsToDemolish: "n'a pas de bâtiments à démolir !",
            drawTwoDone: "DRAW TWO ! Cartes supplémentaires piochées.",
            handSwapDone: "HAND SWAP ! Les mains ont été échangées !",
            skipTurnDone: "passe son prochain tour à cause du Sabotage !",
            winAlert: "est le grand gagnant de CITTY BUILDER !",
            winWarning: "a 7 bâtiments uniques ! Défendez-les jusqu'à votre prochain tour",
            aiPlacedBuilding: "a placé un bâtiment",
            aiSummonedMonster: "a invoqué un monstre",
            aiSabotage: "joue une carte de sabotage sur",
            aiDiscarded: "a défaussé une carte"
        },

        es: {
            yourTurn: "Tu Turno (Juega una carta o haz clic en tu monstruo para atacar)",
            aiTurn: "Turno de",
            deckEmpty: "Vacío",
            building: "Edificio",
            monster: "Monstruo",
            selectAttacker: "Atacante seleccionado. ¡Elige un objetivo!",
            sameLevel: "¡Mismo nivel! Ambos monstruos destruidos.",
            hitMonster: "¡Impacto! ¡Monstruo enemigo derrotado!",
            hitStatus: "Ataque realizado en",
            hpText: "HP",
            goldenShield: "Regla del Escudo Dorado: ¡Derrota primero a todos los monstruos de la Front Line!",
            buildingDestroyed: "¡Objetivo alcanzado! Edificio destruido.",
            alreadyHasBuilding: "Ya tienes un",
            uniqueBuilding: "Los edificios deben ser únicos.",
            buildingZoneFull: "¡Tu Back Line está llena de edificios!",
            monsterSummoned: "Monstruo invocado",
            frontLineFull: "¡Tu Front Line está llena (máx. 3 monstruos)!",
            sabotageSelected: "¡Sabotage seleccionado! HAZ CLIC EN EL OPONENTE para aplicarlo.",
            demolishDone: "¡DEMOLISH! ¡Edificio destruido directamente!",
            noBuildingsToDemolish: "no tiene edificios para demoler!",
            drawTwoDone: "DRAW TWO! Cartas adicionales robadas.",
            handSwapDone: "HAND SWAP! ¡Las manos han sido intercambiadas!",
            skipTurnDone: "¡pierde su próximo turno debido al Sabotage!",
            winAlert: "es el ganador absoluto de CITTY BUILDER!",
            winWarning: "¡tiene 7 edificios únicos! Defiéndelos hasta tu próximo turno",
            aiPlacedBuilding: "colocó un edificio",
            aiSummonedMonster: "invocó un monstruo",
            aiSabotage: "juega una carta de sabotaje en",
            aiDiscarded: "descartó una carta"
        }
    };

    return texts[lang] || texts.nl;
}

// ==========================================
// HULPFUNCTIES
// ==========================================

function getCardBackImage() {
    return typeof CARD_BACK_IMAGE !== 'undefined'
        ? CARD_BACK_IMAGE
        : CARD_BACK_IMG;
}

function getDisplayPlayerIndex() {
    return currentGameMode === 'multiplayer'
        ? currentPlayerIndex
        : 0;
}

function isHumanTurn() {
    return players[currentPlayerIndex] &&
        !players[currentPlayerIndex].isAI &&
        !waitingForLocalHandoff;
}

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// ==========================================
// AI TIMER
// Pauzeert AI-acties zolang een sabotagekaart
// geselecteerd is en er nog een doelwit gekozen
// moet worden.
// ==========================================

function scheduleAIAction(callback, delay = 1500) {
    if (aiTurnTimer !== null) {
        clearTimeout(aiTurnTimer);
    }

    aiTurnTimer = setTimeout(() => {
        aiTurnTimer = null;

        if (pendingSabotageCard) {
            scheduleAIAction(callback, 250);
            return;
        }

        callback();

    }, delay);
}

function clearAIActionTimer() {
    if (aiTurnTimer !== null) {
        clearTimeout(aiTurnTimer);
        aiTurnTimer = null;
    }
}

// ==========================================
// NIEUW SPEL
// ==========================================

function initGame(numPlayers = 3, mode = 'ai') {
    if (typeof DECK_DATA === 'undefined') {
        console.error("cards.js ontbreekt of DECK_DATA is niet gevonden!");
        return;
    }

    if (mode !== 'ai' && mode !== 'multiplayer') {
        console.error("Ongeldige spelmodus:", mode);
        return;
    }

    if (mode === 'multiplayer') {
        numPlayers = 2;
    }

    numPlayers = Math.max(2, Math.min(4, numPlayers));

    clearAIActionTimer();

    currentGameMode = mode;
    waitingForLocalHandoff = false;

    const handoffScreen =
        document.getElementById('local-handoff-screen');

    if (handoffScreen) {
        handoffScreen.style.display = 'none';
    }

    deck = shuffle([...DECK_DATA]);
    discardPile = [];

    currentPlayerIndex = 0;
    pendingWinPlayer = null;
    turnDirection = 1;
    selectedAttacker = null;
    pendingSabotageCard = null;

    players = [];

    for (let i = 0; i < numPlayers; i++) {
        const isComputer = mode === 'ai' && i !== 0;

        players.push({
            id: i,
            name: mode === 'ai'
                ? (i === 0 ? "Jij" : `AI Speler ${i}`)
                : `Speler ${i + 1}`,

            isAI: isComputer,
            hand: [],
            frontLine: [null, null, null],
            backLine: Array(7).fill(null),
            skipNextTurn: false
        });
    }

    const gameContainer =
        document.getElementById('game-container');

    if (gameContainer) {
        gameContainer.style.display = 'flex';
    }

    renderBoard();

    // ======================================
    // KAARTEN UITDELEN MET ANIMATIE
    // ======================================

    const drawPileEl =
        document.getElementById('draw-pile');

    const humanHandEl =
        document.getElementById('player-hand');

    if (!drawPileEl || !humanHandEl) {
        for (let round = 0; round < 5; round++) {
            for (let pIndex = 0; pIndex < players.length; pIndex++) {
                if (deck.length > 0) {
                    players[pIndex].hand.push(deck.pop());
                }
            }
        }

        renderBoard();
        return;
    }

    drawPileEl.classList.add('shuffling');

    setTimeout(() => {
        drawPileEl.classList.remove('shuffling');

        const totalRounds = 5;
        let animationStep = 0;
        const backImg = getCardBackImage();

        for (let round = 0; round < totalRounds; round++) {
            for (let pIndex = 0; pIndex < players.length; pIndex++) {

                setTimeout(() => {
                    if (deck.length === 0) return;

                    const drawnCard = deck.pop();
                    players[pIndex].hand.push(drawnCard);

                    const flyingCard = document.createElement('img');

                    flyingCard.src = pIndex === 0
                        ? drawnCard.image
                        : backImg;

                    flyingCard.className = 'card-img dealing-card';

                    const pileRect =
                        drawPileEl.getBoundingClientRect();

                    let targetRect =
                        humanHandEl.getBoundingClientRect();

                    if (pIndex > 0) {
                        const opponentBoxes =
                            document.querySelectorAll('.field-container');

                        if (opponentBoxes[pIndex - 1]) {
                            targetRect =
                                opponentBoxes[pIndex - 1].getBoundingClientRect();
                        }
                    }

                    flyingCard.style.position = 'fixed';
                    flyingCard.style.left = `${pileRect.left}px`;
                    flyingCard.style.top = `${pileRect.top}px`;
                    flyingCard.style.width = `${pileRect.width || 60}px`;
                    flyingCard.style.height = `${pileRect.height || 90}px`;
                    flyingCard.style.zIndex = '9999';

                    document.body.appendChild(flyingCard);

                    setTimeout(() => {
                        flyingCard.style.transition =
                            'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

                        flyingCard.style.left =
                            `${targetRect.left + targetRect.width / 2}px`;

                        flyingCard.style.top =
                            `${targetRect.top + targetRect.height / 2}px`;

                        flyingCard.style.transform = 'scale(0.3)';
                        flyingCard.style.opacity = '0';
                    }, 20);

                    setTimeout(() => {
                        flyingCard.remove();
                        renderBoard();
                    }, 420);

                }, animationStep * 130);

                animationStep++;
            }
        }

    }, 1100);
}

// ==========================================
// STATUSBERICHT
// ==========================================

function showStatus(message, isAlert = false) {
    const indicator =
        document.getElementById('turn-indicator');

    if (!indicator) return;

    indicator.innerText = message;

    indicator.style.background = isAlert
        ? "#ff3333"
        : (selectedAttacker || pendingSabotageCard
            ? "#ff5722"
            : "#ffeb3b");

    indicator.style.color =
        isAlert || selectedAttacker || pendingSabotageCard
            ? "#fff"
            : "#000";
}

// ==========================================
// SPEELBORD WEERGEVEN
// ==========================================

function renderBoard() {
    if (!players.length) return;

    const txt = getGameText();

    const activePlayer = players[currentPlayerIndex];
    const displayPlayerIndex = getDisplayPlayerIndex();
    const displayPlayer = players[displayPlayerIndex];

    if (!activePlayer || !displayPlayer) return;

    if (waitingForLocalHandoff) {
        showStatus("Geef het toestel door aan de volgende speler.");
    } else if (pendingSabotageCard) {
        showStatus(
            `⚡ ${pendingSabotageCard.card.name} - Kies een tegenstander.`,
            true
        );
    } else {
        showStatus(
            activePlayer.isAI
                ? `${txt.aiTurn} ${activePlayer.name}...`
                : `${activePlayer.name}: ${txt.yourTurn}`
        );
    }

    const deckCount =
        document.getElementById('deck-count');

    const discardCount =
        document.getElementById('discard-count');

    if (deckCount) deckCount.innerText = deck.length;
    if (discardCount) discardCount.innerText = discardPile.length;

    // ======================================
    // TREKSTAPEL
    // ======================================

    const drawPileEl =
        document.getElementById('draw-pile');

    if (drawPileEl) {
        const backImg = getCardBackImage();

        drawPileEl.innerHTML = deck.length > 0
            ? `<img src="${backImg}" class="card-img" alt="Trekstapel">`
            : `<span>${txt.deckEmpty}</span>`;
    }

    // ======================================
    // AFLEGSTAPEL
    // ======================================

    const discardPileEl =
        document.getElementById('discard-pile');

    if (discardPileEl) {
        if (discardPile.length > 0) {
            const topCard =
                discardPile[discardPile.length - 1];

            discardPileEl.innerHTML =
                `<img src="${topCard.image}" class="card-img" alt="${topCard.name}">`;
        } else {
            discardPileEl.innerHTML =
                `<span>${txt.deckEmpty}</span>`;
        }
    }

    // ======================================
    // TEGENSTANDERS WEERGEVEN
    // ======================================

    const aiContainer =
        document.getElementById('ai-container');

    if (aiContainer) {
        aiContainer.innerHTML = '';

        players.forEach((opponent, opponentIndex) => {
            if (opponentIndex === displayPlayerIndex) return;

            const oppField =
                document.createElement('div');

            oppField.className = 'field-container';

            const canTarget =
                (isHumanTurn() || pendingSabotageCard !== null) &&
                (selectedAttacker !== null ||
                    pendingSabotageCard !== null);

            oppField.style.background = pendingSabotageCard
                ? 'rgba(255, 87, 34, 0.2)'
                : 'rgba(255, 0, 0, 0.08)';

            oppField.style.cursor =
                canTarget ? 'pointer' : 'default';

            oppField.onclick = () => {
                if (pendingSabotageCard) {
                    executeSabotageOnTarget(opponentIndex);
                    return;
                }

                if (!isHumanTurn()) return;
            };

            const buildingCount =
                opponent.backLine.filter(c => c !== null).length;

            const backImg = getCardBackImage();

            let oppHandHtml = '';

            for (let h = 0; h < opponent.hand.length; h++) {
                oppHandHtml += `
                    <img
                        src="${backImg}"
                        class="ai-hand-card-img"
                        style="
                            width:30px;
                            height:45px;
                            margin-right:3px;
                            border-radius:4px;
                            box-shadow:0 2px 4px rgba(0,0,0,0.3);
                        "
                    >
                `;
            }

            oppField.innerHTML = `
                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    width:100%;
                    margin-bottom:5px;
                ">
                    <p class="zone-title" style="margin:0;">
                        🛡️ ${opponent.name}
                        (${txt.building}: ${buildingCount}/7)
                    </p>

                    <div style="
                        display:flex;
                        align-items:center;
                        background:rgba(0,0,0,0.2);
                        padding:2px 6px;
                        border-radius:6px;
                    ">
                        <span style="
                            font-size:11px;
                            margin-right:5px;
                            color:#fff;
                            font-weight:bold;
                        ">
                            Hand (${opponent.hand.length}):
                        </span>

                        <div style="display:flex;">
                            ${oppHandHtml}
                        </div>
                    </div>
                </div>

                <div class="card-slots" id="opp-${opponentIndex}-back"></div>

                <p class="zone-title" style="margin-top:4px;">
                    🛡️ Front Line (${txt.monster})
                </p>

                <div class="card-slots" id="opp-${opponentIndex}-front"></div>
            `;

            aiContainer.appendChild(oppField);

            // ==================================
            // GEBOUWEN TEGENSTANDER
            // ==================================

            const oppBackSlots =
                document.getElementById(`opp-${opponentIndex}-back`);

            for (let b = 0; b < 7; b++) {
                const slot =
                    document.createElement('div');

                slot.className = 'slot';

                const building = opponent.backLine[b];

                if (building) {
                    const img =
                        document.createElement('img');

                    img.src = building.image;
                    img.className = 'ai-card-img';

                    img.onclick = (e) => {
                        e.stopPropagation();

                        if (pendingSabotageCard) {
                            executeSabotageOnTarget(
                                opponentIndex,
                                'building',
                                b
                            );
                            return;
                        }

                        if (!isHumanTurn()) return;

                        if (selectedAttacker) {
                            handleTargetClick(
                                'building',
                                opponentIndex,
                                b
                            );
                        }
                    };

                    slot.appendChild(img);
                } else {
                    slot.innerText = txt.building;
                }

                oppBackSlots.appendChild(slot);
            }

            // ==================================
            // MONSTERS TEGENSTANDER
            // ==================================

            const oppFrontSlots =
                document.getElementById(`opp-${opponentIndex}-front`);

            for (let f = 0; f < 3; f++) {
                const slot =
                    document.createElement('div');

                slot.className = 'slot';

                const monster = opponent.frontLine[f];

                if (monster) {
                    const img =
                        document.createElement('img');

                    img.src = monster.image;
                    img.className = 'ai-card-img';

                    img.title =
                        `${monster.name} (LV ${monster.level || 1}) - ${txt.hpText}: ${monster.currentHp}/${monster.maxHp}`;

                    img.onclick = (e) => {
                        e.stopPropagation();

                        if (!isHumanTurn()) return;

                        if (selectedAttacker) {
                            handleTargetClick(
                                'monster',
                                opponentIndex,
                                f
                            );
                        }
                    };

                    slot.appendChild(img);
                } else {
                    slot.innerText = txt.monster;
                }

                oppFrontSlots.appendChild(slot);
            }
        });
    }

    // ======================================
    // HAND VAN DE DISPLAY-SPELER
    // ======================================

    const handEl =
        document.getElementById('player-hand');

    if (handEl) {
        handEl.innerHTML = '';

        const canShowHand =
            !waitingForLocalHandoff &&
            !displayPlayer.isAI;

        if (canShowHand) {
            displayPlayer.hand.forEach((card, index) => {
                const img =
                    document.createElement('img');

                img.src = card.image;
                img.className = 'card-img';
                img.title = `${card.name} (${card.type})`;

                img.onclick = () => {
                    const isSabotage =
                        card.type !== 'building' &&
                        card.type !== 'monster';

                    // Gebouwen en monsters mogen uitsluitend
                    // tijdens de eigen beurt gespeeld worden.
                    if (!isHumanTurn() && !isSabotage) return;

                    // Lokale multiplayer blijft beperkt tot
                    // de actieve speler.
                    if (currentGameMode === 'multiplayer' &&
                        !isHumanTurn()) {
                        return;
                    }

                    playCardFromHand(index);
                };

                handEl.appendChild(img);
            });
        }
    }

    // ======================================
    // FRONT LINE DISPLAY-SPELER
    // ======================================

    const frontEl =
        document.getElementById('front-line');

    if (frontEl) {
        frontEl.innerHTML = '';

        for (let i = 0; i < 3; i++) {
            const slot =
                document.createElement('div');

            slot.className = 'slot';

            if (selectedAttacker &&
                selectedAttacker.slotIndex === i &&
                selectedAttacker.playerIndex === displayPlayerIndex) {

                slot.style.border = "3px solid #ffeb3b";
                slot.style.background = "rgba(255,235,59,0.3)";
                slot.style.boxShadow = "0 0 12px #ffeb3b";
            }

            const monster = displayPlayer.frontLine[i];

            if (monster) {
                const img =
                    document.createElement('img');

                img.src = monster.image;
                img.className = 'card-img';
                img.style.cursor = 'pointer';

                img.title =
                    `${monster.name} (LV ${monster.level || 1}) - ${txt.hpText}: ${monster.currentHp}/${monster.maxHp}`;

                img.onclick = () => {
                    if (!isHumanTurn()) return;

                    toggleAttackerSelection(i);
                };

                slot.appendChild(img);
            } else {
                slot.innerText = `${txt.monster} ${i + 1}`;
            }

            frontEl.appendChild(slot);
        }
    }

    // ======================================
    // BACK LINE DISPLAY-SPELER
    // ======================================

    const backEl =
        document.getElementById('back-line');

    if (backEl) {
        backEl.innerHTML = '';

        for (let i = 0; i < 7; i++) {
            const slot =
                document.createElement('div');

            slot.className = 'slot';

            const building = displayPlayer.backLine[i];

            if (building) {
                const img =
                    document.createElement('img');

                img.src = building.image;
                img.className = 'card-img';
                img.title = building.name;

                slot.appendChild(img);
            } else {
                slot.innerText = `${txt.building} ${i + 1}`;
            }

            backEl.appendChild(slot);
        }
    }

    // ======================================
    // GEBOUWENTELLER
    // ======================================

    const bCount =
        document.getElementById('player-building-count');

    if (bCount) {
        bCount.innerText =
            displayPlayer.backLine.filter(c => c !== null).length;
    }
}

// ==========================================
// AANVALLER SELECTEREN
// ==========================================

function toggleAttackerSelection(slotIndex) {
    if (!isHumanTurn()) return;

    const activePlayer = players[currentPlayerIndex];
    const txt = getGameText();

    if (!activePlayer.frontLine[slotIndex]) return;

    pendingSabotageCard = null;

    if (selectedAttacker &&
        selectedAttacker.slotIndex === slotIndex &&
        selectedAttacker.playerIndex === currentPlayerIndex) {

        selectedAttacker = null;

        showStatus(`${activePlayer.name}: ${txt.yourTurn}`);

    } else {
        selectedAttacker = {
            slotIndex: slotIndex,
            playerIndex: currentPlayerIndex,
            card: activePlayer.frontLine[slotIndex]
        };

        showStatus(
            `🎯 ${selectedAttacker.card.name} - ${txt.selectAttacker}`
        );
    }

    renderBoard();
}

// ==========================================
// AANVAL OP DOELWIT
// ==========================================

function handleTargetClick(targetType, targetPlayerIndex, targetIndex) {
    if (!isHumanTurn() || !selectedAttacker) return;

    const txt = getGameText();

    const activePlayer = players[currentPlayerIndex];
    const targetPlayer = players[targetPlayerIndex];

    if (!activePlayer || !targetPlayer) return;
    if (targetPlayerIndex === currentPlayerIndex) return;

    if (selectedAttacker.playerIndex !== currentPlayerIndex) return;

    const attackerCard =
        activePlayer.frontLine[selectedAttacker.slotIndex];

    if (!attackerCard) {
        selectedAttacker = null;
        renderBoard();
        return;
    }

    if (targetType === 'monster') {
        const targetMonster =
            targetPlayer.frontLine[targetIndex];

        if (!targetMonster) return;

        const attackerLevel = attackerCard.level || 1;
        const targetLevel = targetMonster.level || 1;

        if (attackerLevel === targetLevel) {
            showStatus(`⚠️ ${txt.sameLevel}`, true);

            discardPile.push(attackerCard);
            discardPile.push(targetMonster);

            activePlayer.frontLine[selectedAttacker.slotIndex] = null;
            targetPlayer.frontLine[targetIndex] = null;

        } else {
            targetMonster.currentHp--;

            if (targetMonster.currentHp <= 0) {
                showStatus(`🎯 ${txt.hitMonster}`, false);

                discardPile.push(targetMonster);
                targetPlayer.frontLine[targetIndex] = null;

            } else {
                showStatus(
                    `⚔️ ${txt.hitStatus} ${targetMonster.name} (${txt.hpText}: ${targetMonster.currentHp}/${targetMonster.maxHp})`,
                    false
                );
            }
        }

    } else if (targetType === 'building') {
        const targetHasMonsters =
            targetPlayer.frontLine.some(m => m !== null);

        if (targetHasMonsters) {
            showStatus(`🛡️ ${txt.goldenShield}`, true);

            selectedAttacker = null;

            renderBoard();
            return;
        }

        const targetBuilding =
            targetPlayer.backLine[targetIndex];

        if (!targetBuilding) return;

        showStatus(
            `🏙️ ${txt.buildingDestroyed} (${targetBuilding.name})`,
            false
        );

        discardPile.push(targetBuilding);
        targetPlayer.backLine[targetIndex] = null;
    }

    selectedAttacker = null;

    renderBoard();

    setTimeout(endTurn, 1500);
}

// ==========================================
// KAART UIT HAND SPELEN
// ==========================================

function playCardFromHand(index) {
    const displayPlayerIndex = getDisplayPlayerIndex();
    const cardOwner = players[displayPlayerIndex];

    if (!cardOwner) return;

    const card = cardOwner.hand[index];

    if (!card) return;

    const isSabotage =
        card.type !== 'building' &&
        card.type !== 'monster';

    // Alleen sabotage mag buiten de eigen beurt.
    if (!isHumanTurn() && !isSabotage) return;

    // Lokale multiplayer blijft beperkt tot de actieve speler.
    if (currentGameMode === 'multiplayer' && !isHumanTurn()) {
        return;
    }

    const activePlayer = cardOwner;
    const txt = getGameText();

    selectedAttacker = null;

    // ======================================
    // GEBOUW
    // ======================================

    if (card.type === 'building') {
        pendingSabotageCard = null;

        const alreadyHas =
            activePlayer.backLine.some(
                c => c && c.name === card.name
            );

        if (alreadyHas) {
            showStatus(
                `${txt.alreadyHasBuilding} ${card.name}! ${txt.uniqueBuilding}`,
                true
            );

            return;
        }

        const emptyIndex =
            activePlayer.backLine.indexOf(null);

        if (emptyIndex !== -1) {
            activePlayer.backLine[emptyIndex] = card;
            activePlayer.hand.splice(index, 1);

            showStatus(`🏙️ ${card.name}`);

            renderBoard();

            setTimeout(endTurn, 1000);

        } else {
            showStatus(txt.buildingZoneFull, true);
        }
    }

    // ======================================
    // MONSTER
    // ======================================

    else if (card.type === 'monster') {
        pendingSabotageCard = null;

        const emptyIndex =
            activePlayer.frontLine.indexOf(null);

        if (emptyIndex !== -1) {
            card.level = card.level || 1;
            card.maxHp = card.level;
            card.currentHp = card.maxHp;

            activePlayer.frontLine[emptyIndex] = card;
            activePlayer.hand.splice(index, 1);

            showStatus(
                `👾 ${txt.monsterSummoned}: ${card.name} (LV ${card.level})`
            );

            renderBoard();

            setTimeout(endTurn, 1000);

        } else {
            showStatus(txt.frontLineFull, true);
        }
    }

    // ======================================
    // SABOTAGE
    // ======================================

    else {
        const cardNameLower = card.name.toLowerCase();

        // ==================================
        // REVERSE
        // Onmiddellijk de speelrichting omkeren.
        // Er hoeft geen tegenstander gekozen te worden.
        // ==================================

        if (
            cardNameLower.includes('reverse') ||
            cardNameLower.includes('richting')
        ) {
            const playedOutOfTurn =
                displayPlayerIndex !== currentPlayerIndex;

            activePlayer.hand.splice(index, 1);
            discardPile.push(card);

            turnDirection *= -1;

            pendingSabotageCard = null;
            selectedAttacker = null;

            showStatus(
                `🔄 ${card.name}! De speelrichting is omgekeerd.`,
                true
            );

            renderBoard();

            // Bij gebruik tijdens een AI-beurt
            // wordt die beurt onmiddellijk beëindigd.
            if (playedOutOfTurn) {
                clearAIActionTimer();
            }

            setTimeout(endTurn, 700);
            return;
        }

        // ==================================
        // ANDERE SABOTAGEKAARTEN
        // ==================================

        pendingSabotageCard = {
            cardIndex: index,
            card: card,
            playerIndex: displayPlayerIndex
        };

        showStatus(
            `⚡ ${card.name} - ${txt.sabotageSelected}`,
            true
        );

        renderBoard();
    }
}

// ==========================================
// SABOTAGE UITVOEREN
// ==========================================

function executeSabotageOnTarget(
    targetPlayerIndex,
    targetType = null,
    targetIndex = null
) {
    if (!pendingSabotageCard) return;

    const ownerIndex = pendingSabotageCard.playerIndex;
    const cardOwner = players[ownerIndex];

    const activeTurnPlayer = players[currentPlayerIndex];
    const targetPlayer = players[targetPlayerIndex];

    const txt = getGameText();

    if (!cardOwner || !activeTurnPlayer || !targetPlayer) return;
    if (targetPlayerIndex === ownerIndex) return;

    const isOutOfTurn = ownerIndex !== currentPlayerIndex;

    // Haal de sabotagekaart uit de hand van de speler
    // die de kaart daadwerkelijk heeft gespeeld.
    const card = cardOwner.hand.splice(
        pendingSabotageCard.cardIndex,
        1
    )[0];

    if (!card) {
        pendingSabotageCard = null;
        renderBoard();
        return;
    }

    discardPile.push(card);

    const cardNameLower = card.name.toLowerCase();

    let interruptCurrentTurn = false;

    // ======================================
    // DEMOLISH
    // ======================================

    if (
        cardNameLower.includes('demolish') ||
        cardNameLower.includes('slopen')
    ) {
        const bIndex = targetIndex !== null
            ? targetIndex
            : targetPlayer.backLine.findIndex(b => b !== null);

        if (bIndex !== -1 && targetPlayer.backLine[bIndex]) {
            const destroyedBuilding =
                targetPlayer.backLine[bIndex];

            targetPlayer.backLine[bIndex] = null;
            discardPile.push(destroyedBuilding);

            showStatus(
                `💥 ${txt.demolishDone} (${destroyedBuilding.name})`,
                true
            );

        } else {
            showStatus(
                `${targetPlayer.name} ${txt.noBuildingsToDemolish}`,
                true
            );
        }
    }

    // ======================================
    // DRAW TWO
    // ======================================

    else if (
        cardNameLower.includes('draw') ||
        cardNameLower.includes('trek')
    ) {
        for (let d = 0; d < 2; d++) {
            if (deck.length > 0) {
                targetPlayer.hand.push(deck.pop());
            }
        }

        showStatus(
            `🃏 ${txt.drawTwoDone} (${targetPlayer.name})`
        );
    }

    // ======================================
    // HAND SWAP
    // ======================================

    else if (
        cardNameLower.includes('swap') ||
        cardNameLower.includes('wissel')
    ) {
        const tempHand = cardOwner.hand;

        cardOwner.hand = targetPlayer.hand;
        targetPlayer.hand = tempHand;

        showStatus(
            `🔄 ${txt.handSwapDone} (${targetPlayer.name})`
        );
    }

    // ======================================
    // REVERSE
    // Verandert de speelrichting.
    // Bij gebruik buiten de eigen beurt
    // eindigt de actieve beurt onmiddellijk.
    // ======================================

    else if (
        cardNameLower.includes('reverse') ||
        cardNameLower.includes('richting')
    ) {
        turnDirection *= -1;

        showStatus(
            `🔄 ${card.name}! De speelrichting is omgekeerd.`,
            true
        );

        if (isOutOfTurn) {
            interruptCurrentTurn = true;
        }
    }

    // ======================================
    // SKIP
    // Buiten de eigen beurt wordt de actieve
    // beurt onmiddellijk beëindigd.
    // Tijdens de eigen beurt slaat het gekozen
    // doelwit zijn volgende beurt over.
    // ======================================

    else if (
        cardNameLower.includes('skip') ||
        cardNameLower.includes('overslaan')
    ) {
        if (isOutOfTurn) {
            interruptCurrentTurn = true;

            showStatus(
                `⏭️ ${card.name}! ${activeTurnPlayer.name} verliest zijn huidige beurt.`,
                true
            );

        } else {
            targetPlayer.skipNextTurn = true;

            showStatus(
                `⚡ ${card.name}! ${targetPlayer.name} ${txt.skipTurnDone}`,
                true
            );
        }
    }

    // ======================================
    // ONBEKENDE SABOTAGEKAART
    // ======================================

    else {
        showStatus(
            `⚠️ ${card.name}: onbekend sabotage-effect.`,
            true
        );
    }

    pendingSabotageCard = null;

    renderBoard();

    // Draw Two, Demolish en Hand Swap beëindigen
    // de beurt van de AI niet wanneer ze buiten
    // de eigen beurt worden gespeeld.
    if (interruptCurrentTurn) {
        clearAIActionTimer();
        setTimeout(endTurn, 700);

    } else if (!isOutOfTurn) {
        setTimeout(endTurn, 2000);
    }

    // Bij een gewone sabotage buiten de eigen beurt
    // blijft de bestaande AI-timer actief.
}

// ==========================================
// BEURT EINDE
// ==========================================

function endTurn() {
    if (!players.length) return;

    clearAIActionTimer();

    const txt = getGameText();

    selectedAttacker = null;
    pendingSabotageCard = null;

    let checkedPlayers = 0;

    do {
        currentPlayerIndex =
            (currentPlayerIndex + turnDirection + players.length) %
            players.length;

        const nextCandidate = players[currentPlayerIndex];

        if (nextCandidate.skipNextTurn) {
            nextCandidate.skipNextTurn = false;

            showStatus(
                `⏩ ${nextCandidate.name} ${txt.skipTurnDone}`,
                true
            );

            checkedPlayers++;

        } else {
            break;
        }

    } while (checkedPlayers < players.length);

    const nextPlayer = players[currentPlayerIndex];

    // ======================================
    // WINNAAR CONTROLEREN
    // ======================================

    if (
        pendingWinPlayer !== null &&
        currentPlayerIndex === pendingWinPlayer
    ) {
        showStatus(
            `🎉 ${nextPlayer.name} ${txt.winAlert}`,
            false
        );

        alert(`🎉 ${nextPlayer.name} ${txt.winAlert}`);

        initGame(players.length, currentGameMode);
        return;
    }

    // ======================================
    // KAARTEN AANVULLEN TOT 5
    // ======================================

    while (nextPlayer.hand.length < 5 && deck.length > 0) {
        nextPlayer.hand.push(deck.pop());
    }

    checkWinCondition();

    // ======================================
    // LOKALE MULTIPLAYER
    // ======================================

    if (currentGameMode === 'multiplayer') {
        waitingForLocalHandoff = true;

        renderBoard();

        const handoffScreen =
            document.getElementById('local-handoff-screen');

        const playerName =
            document.getElementById('handoff-player-name');

        if (playerName) {
            playerName.innerText =
                `Geef het toestel aan ${nextPlayer.name}`;
        }

        if (handoffScreen) {
            handoffScreen.style.display = 'flex';
        }

        return;
    }

    // ======================================
    // AI-MODUS
    // ======================================

    waitingForLocalHandoff = false;

    renderBoard();

    if (nextPlayer.isAI) {
        scheduleAIAction(playAITurn, 1500);
    }
}

// ==========================================
// LOKALE SPELER KAN BEURT STARTEN
// ==========================================

function continueLocalTurn() {
    if (currentGameMode !== 'multiplayer') return;
    if (!waitingForLocalHandoff) return;

    waitingForLocalHandoff = false;

    const handoffScreen =
        document.getElementById('local-handoff-screen');

    if (handoffScreen) {
        handoffScreen.style.display = 'none';
    }

    renderBoard();
}

// ==========================================
// AI BEURT
// ==========================================

function playAITurn() {
    if (currentGameMode !== 'ai') return;

    const ai = players[currentPlayerIndex];

    if (!ai || !ai.isAI) return;

    let actionDone = false;

    const txt = getGameText();

    if (pendingWinPlayer === ai.id) {
        showStatus(
            `🏆 ${ai.name} ${txt.winAlert}`,
            true
        );

        alert(`🏆 ${ai.name} ${txt.winAlert}`);

        initGame(players.length, 'ai');
        return;
    }

    // ======================================
    // AI AANVAL
    // ======================================

    const aiHasMonsters =
        ai.frontLine.some(m => m !== null);

    if (aiHasMonsters) {
        const opponents =
            players.filter(p => p.id !== ai.id);

        const targetOpponent =
            opponents[Math.floor(Math.random() * opponents.length)];

        if (targetOpponent) {
            const opponentHasMonsters =
                targetOpponent.frontLine.some(m => m !== null);

            if (opponentHasMonsters) {
                const mIndex =
                    targetOpponent.frontLine.findIndex(m => m !== null);

                if (mIndex !== -1) {
                    const targetMonster =
                        targetOpponent.frontLine[mIndex];

                    targetMonster.currentHp--;

                    showStatus(
                        `🤖 ${ai.name} -> ${targetOpponent.name} (${targetMonster.name})`,
                        true
                    );

                    if (targetMonster.currentHp <= 0) {
                        discardPile.push(targetMonster);

                        targetOpponent.frontLine[mIndex] = null;
                    }

                    actionDone = true;
                }

            } else {
                const bIndex =
                    targetOpponent.backLine.findIndex(b => b !== null);

                if (bIndex !== -1) {
                    const targetBuilding =
                        targetOpponent.backLine[bIndex];

                    showStatus(
                        `🤖 ${ai.name} -> ${targetOpponent.name} (${targetBuilding.name})`,
                        true
                    );

                    discardPile.push(targetBuilding);

                    targetOpponent.backLine[bIndex] = null;

                    actionDone = true;
                }
            }
        }
    }

    // ======================================
    // AI GEBOUW PLAATSEN
    // ======================================

    if (!actionDone) {
        for (let i = 0; i < ai.hand.length; i++) {
            const card = ai.hand[i];

            if (card.type === 'building') {
                const alreadyHas =
                    ai.backLine.some(
                        c => c && c.name === card.name
                    );

                const emptySlot =
                    ai.backLine.indexOf(null);

                if (!alreadyHas && emptySlot !== -1) {
                    ai.backLine[emptySlot] =
                        ai.hand.splice(i, 1)[0];

                    showStatus(
                        `🤖 ${ai.name} ${txt.aiPlacedBuilding}: ${card.name}`
                    );

                    actionDone = true;
                    break;
                }
            }
        }
    }

    // ======================================
    // AI MONSTER OPROEPEN
    // ======================================

    if (!actionDone) {
        for (let i = 0; i < ai.hand.length; i++) {
            const card = ai.hand[i];

            if (card.type === 'monster') {
                const emptySlot =
                    ai.frontLine.indexOf(null);

                if (emptySlot !== -1) {
                    card.level = card.level || 1;
                    card.maxHp = card.level;
                    card.currentHp = card.maxHp;

                    ai.frontLine[emptySlot] =
                        ai.hand.splice(i, 1)[0];

                    showStatus(
                        `🤖 ${ai.name} ${txt.aiSummonedMonster}: ${card.name} (LV ${card.level})`
                    );

                    actionDone = true;
                    break;
                }
            }
        }
    }

    // ======================================
    // AI SABOTAGE
    // ======================================

    if (!actionDone) {
        const sabotageIndex =
            ai.hand.findIndex(
                c => c.type !== 'building' &&
                     c.type !== 'monster'
            );

        if (sabotageIndex !== -1) {
            const sabotageCard =
                ai.hand.splice(sabotageIndex, 1)[0];

            discardPile.push(sabotageCard);

            const opponents =
                players.filter(p => p.id !== ai.id);

            const targetOpponent =
                opponents[Math.floor(Math.random() * opponents.length)];

            if (targetOpponent) {
                const cardNameLower =
                    sabotageCard.name.toLowerCase();

                // DEMOLISH
                if (
                    cardNameLower.includes('demolish') ||
                    cardNameLower.includes('slopen')
                ) {
                    const bIndex =
                        targetOpponent.backLine.findIndex(b => b !== null);

                    if (
                        bIndex !== -1 &&
                        targetOpponent.backLine[bIndex]
                    ) {
                        const destroyedBuilding =
                            targetOpponent.backLine[bIndex];

                        targetOpponent.backLine[bIndex] = null;

                        discardPile.push(destroyedBuilding);

                        showStatus(
                            `💥 ${ai.name} speelt DEMOLISH! Gebouw (${destroyedBuilding.name}) van ${targetOpponent.name} is vernietigd!`,
                            true
                        );

                    } else {
                        showStatus(
                            `🤖 ${ai.name} speelt ${sabotageCard.name}, maar ${targetOpponent.name} heeft geen gebouwen om te slopen.`,
                            true
                        );
                    }

                // DRAW TWO
                } else if (
                    cardNameLower.includes('draw') ||
                    cardNameLower.includes('trek')
                ) {
                    for (let d = 0; d < 2; d++) {
                        if (deck.length > 0) {
                            targetOpponent.hand.push(deck.pop());
                        }
                    }

                    showStatus(
                        `🃏 ${ai.name} geeft ${targetOpponent.name} 2 extra kaarten via ${sabotageCard.name}!`
                    );

                // HAND SWAP
                } else if (
                    cardNameLower.includes('swap') ||
                    cardNameLower.includes('wissel')
                ) {
                    const tempHand = ai.hand;

                    ai.hand = targetOpponent.hand;
                    targetOpponent.hand = tempHand;

                    showStatus(
                        `🔄 ${ai.name} heeft de handkaarten gewisseld met ${targetOpponent.name} via ${sabotageCard.name}!`,
                        true
                    );

                // REVERSE
                } else if (
                    cardNameLower.includes('reverse') ||
                    cardNameLower.includes('richting')
                ) {
                    turnDirection *= -1;

                    showStatus(
                        `🔄 ${ai.name} speelt ${sabotageCard.name}! De speelrichting is omgekeerd.`,
                        true
                    );

                // SKIP
                } else if (
                    cardNameLower.includes('skip') ||
                    cardNameLower.includes('overslaan')
                ) {
                    targetOpponent.skipNextTurn = true;

                    showStatus(
                        `⚡ ${ai.name} speelt ${sabotageCard.name}! ${targetOpponent.name} moet de volgende beurt overslaan!`,
                        true
                    );

                } else {
                    showStatus(
                        `⚠️ ${ai.name} speelt ${sabotageCard.name}, maar het effect is niet herkend.`,
                        true
                    );
                }
            }

            actionDone = true;
        }
    }

    // ======================================
    // AI KAART AFLEGGEN
    // ======================================

    if (!actionDone && ai.hand.length > 0) {
        discardPile.push(ai.hand.splice(0, 1)[0]);

        showStatus(
            `🤖 ${ai.name} ${txt.aiDiscarded}.`
        );
    }

    renderBoard();

    scheduleAIAction(endTurn, 1500);
}

// ==========================================
// WINCONDITIE
// ==========================================

function checkWinCondition() {
    const txt = getGameText();

    for (const player of players) {
        const uniqueBuildings = new Set(
            player.backLine
                .filter(c => c !== null)
                .map(c => c.name)
        );

        if (uniqueBuildings.size >= 7) {
            if (pendingWinPlayer === null) {
                pendingWinPlayer = player.id;

                showStatus(
                    `🏆 ${player.name} ${txt.winWarning}!`,
                    true
                );
            }

            return;
        }
    }
}
