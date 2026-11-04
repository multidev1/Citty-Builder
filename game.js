let deck = [];
let discardPile = [];
let players = [];
let currentPlayerIndex = 0;
let pendingWinPlayer = null;

let selectedAttacker = null;
let pendingSabotageCard = null;

// De juiste achterkant van de kaart
const CARD_BACK_IMG = "0000_back.png";

// Dynamische vertalingen voor het spel zelf
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
    return texts[lang] || texts['nl'];
}

// VOLLEDIG GEFIXTE INITGAME MET PROFESSIONELE DEAL-ANIMATIE VOOR ALLE SPELERS
function initGame(numPlayers = 3, mode = 'ai') {
    if (typeof DECK_DATA === 'undefined') {
        console.error("cards.js ontbreekt of DECK_DATA is niet gevonden!");
        return;
    }

    deck = shuffle([...DECK_DATA]);
    discardPile = [];
    currentPlayerIndex = 0;
    pendingWinPlayer = null;
    selectedAttacker = null;
    pendingSabotageCard = null;

    players = [];
    for (let i = 0; i < numPlayers; i++) {
        let isComputer = (mode === 'ai') ? (i !== 0) : false;
        players.push({
            id: i,
            name: (mode === 'ai') ? (i === 0 ? "Jij" : `AI Speler ${i}`) : `Speler ${i + 1}`,
            isAI: isComputer,
            hand: [],
            frontLine: [null, null, null],
            backLine: Array(7).fill(null),
            skipNextTurn: false
        });
    }

    // 1. Maak het speelbord direct zichtbaar
    document.getElementById('game-container').style.display = 'flex';
    renderBoard();

    // 2. PROFESSIONELE ANIMATIE: Schudden en om de beurt uitdelen aan iedereen
    const drawPileEl = document.getElementById('draw-pile');
    const humanHandEl = document.getElementById('player-hand');

    if (drawPileEl && humanHandEl) {
        drawPileEl.classList.add('shuffling');

        setTimeout(() => {
            drawPileEl.classList.remove('shuffling');

            let totalRounds = 5; // 5 kaarten per speler
            let animationStep = 0;
            let backImg = typeof CARD_BACK_IMAGE !== 'undefined' ? CARD_BACK_IMAGE : CARD_BACK_IMG;

            for (let round = 0; round < totalRounds; round++) {
                for (let pIndex = 0; pIndex < players.length; pIndex++) {
                    
                    setTimeout(() => {
                        if (deck.length === 0) return;
                        let drawnCard = deck.pop();
                        players[pIndex].hand.push(drawnCard);

                        if (drawPileEl) {
                            const flyingCard = document.createElement('img');
                            flyingCard.src = (pIndex === 0) ? drawnCard.image : backImg;
                            flyingCard.className = 'card-img dealing-card';

                            const pileRect = drawPileEl.getBoundingClientRect();
                            let targetRect = humanHandEl.getBoundingClientRect();

                            if (pIndex > 0) {
                                const aiBoxes = document.querySelectorAll('.field-container');
                                if (aiBoxes[pIndex - 1]) {
                                    targetRect = aiBoxes[pIndex - 1].getBoundingClientRect();
                                }
                            }

                            flyingCard.style.setProperty('--start-x', `${pileRect.left - targetRect.left}px`);
                            flyingCard.style.setProperty('--start-y', `${pileRect.top - targetRect.top}px`);

                            document.body.appendChild(flyingCard);
                            flyingCard.style.position = 'fixed';
                            flyingCard.style.left = `${pileRect.left}px`;
                            flyingCard.style.top = `${pileRect.top}px`;
                            flyingCard.style.width = `${pileRect.width || 60}px`;
                            flyingCard.style.height = `${pileRect.height || 90}px`;
                            flyingCard.style.zIndex = '9999';

                            setTimeout(() => {
                                flyingCard.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                                flyingCard.style.left = `${targetRect.left + (targetRect.width / 2)}px`;
                                flyingCard.style.top = `${targetRect.top + (targetRect.height / 2)}px`;
                                flyingCard.style.transform = 'scale(0.3) opacity(0)';
                            }, 20);

                            setTimeout(() => {
                                flyingCard.remove();
                                renderBoard();
                            }, 420);
                        }

                    }, animationStep * 130);

                    animationStep++;
                }
            }

        }, 1100);
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function showStatus(message, isAlert = false) {
    const indicator = document.getElementById('turn-indicator');
    if (indicator) {
        indicator.innerText = message;
        indicator.style.background = isAlert ? "#ff3333" : (selectedAttacker || pendingSabotageCard ? "#ff5722" : "#ffeb3b");
        indicator.style.color = isAlert || selectedAttacker || pendingSabotageCard ? "#fff" : "#000";
    }
}

function renderBoard() {
    const txt = getGameText();
    const activePlayer = players[currentPlayerIndex];
    
    showStatus(activePlayer.isAI ? `${txt.aiTurn} ${activePlayer.name}...` : `${activePlayer.name}: ${txt.yourTurn}`);

    document.getElementById('deck-count').innerText = deck.length;
    document.getElementById('discard-count').innerText = discardPile.length;

    const drawPileEl = document.getElementById('draw-pile');
    if (drawPileEl) {
        let backImg = typeof CARD_BACK_IMAGE !== 'undefined' ? CARD_BACK_IMAGE : CARD_BACK_IMG;
        drawPileEl.innerHTML = deck.length > 0 ? `<img src="${backImg}" class="card-img" alt="Trekstapel">` : `<span>${txt.deckEmpty}</span>`;
    }

    const discardPileEl = document.getElementById('discard-pile');
    if (discardPileEl) {
        if (discardPile.length > 0) {
            const topCard = discardPile[discardPile.length - 1];
            discardPileEl.innerHTML = `<img src="${topCard.image}" class="card-img" alt="${topCard.name}">`;
        } else {
            discardPileEl.innerHTML = `<span>${txt.deckEmpty}</span>`;
        }
    }

    // --- 1. ALLE TEGENSTANDERS (AI) ---
    const aiContainer = document.getElementById('ai-container');
    if (aiContainer) {
        aiContainer.innerHTML = '';
        
        for (let i = 1; i < players.length; i++) {
            const opponent = players[i];
            const opponentIndex = i;
            
            const oppField = document.createElement('div');
            oppField.className = 'field-container';
            oppField.style.background = pendingSabotageCard ? 'rgba(255, 87, 34, 0.2)' : 'rgba(255, 0, 0, 0.08)';
            
            oppField.style.cursor = pendingSabotageCard ? 'pointer' : 'default';
            oppField.onclick = () => {
                if (pendingSabotageCard && currentPlayerIndex === 0) {
                    executeSabotageOnTarget(opponentIndex);
                }
            };

            let buildingCount = opponent.backLine.filter(c => c !== null).length;
            let backImg = typeof CARD_BACK_IMAGE !== 'undefined' ? CARD_BACK_IMAGE : CARD_BACK_IMG;
            
            let oppHandHtml = '';
            for (let h = 0; h < opponent.hand.length; h++) {
                oppHandHtml += `<img src="${backImg}" class="ai-hand-card-img" style="width: 30px; height: 45px; margin-right: 3px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">`;
            }

            oppField.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 5px;">
                    <p class="zone-title" style="margin: 0; ${pendingSabotageCard ? 'color: #ff5722; font-weight: bold;' : ''}">🛡️ ${opponent.name} (${txt.building}: ${buildingCount}/7) ${pendingSabotageCard ? '👉 [KLIK HIER ALS DOELWIT]' : ''}</p>
                    <div style="display: flex; align-items: center; background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 6px;">
                        <span style="font-size: 11px; margin-right: 5px; color: #fff; font-weight: bold;">Hand (${opponent.hand.length}):</span>
                        <div style="display: flex;">${oppHandHtml}</div>
                    </div>
                </div>
                <div class="card-slots" id="opp-${opponentIndex}-back"></div>
                <p class="zone-title" style="margin-top: 4px;">🛡️ Front Line (${txt.monster})</p>
                <div class="card-slots" id="opp-${opponentIndex}-front"></div>
            `;
            aiContainer.appendChild(oppField);

            const oppBackSlots = document.getElementById(`opp-${opponentIndex}-back`);
            for (let b = 0; b < 7; b++) {
                const slot = document.createElement('div');
                slot.className = 'slot';
                
                if ((selectedAttacker || pendingSabotageCard) && opponent.backLine[b] && currentPlayerIndex === 0) {
                    slot.style.border = "3px dashed #ff3333";
                    slot.style.cursor = "pointer";
                }

                if (opponent.backLine[b]) {
                    const img = document.createElement('img');
                    img.src = opponent.backLine[b].image;
                    img.className = 'ai-card-img';
                    img.onclick = (e) => {
                        e.stopPropagation();
                        if (currentPlayerIndex === 0) {
                            if (pendingSabotageCard) {
                                executeSabotageOnTarget(opponentIndex, 'building', b);
                            } else {
                                handleTargetClick('building', opponentIndex, b);
                            }
                        }
                    };
                    slot.appendChild(img);
                } else {
                    slot.innerText = txt.building;
                }
                oppBackSlots.appendChild(slot);
            }

            const oppFrontSlots = document.getElementById(`opp-${opponentIndex}-front`);
            for (let f = 0; f < 3; f++) {
                const slot = document.createElement('div');
                slot.className = 'slot';

                if ((selectedAttacker || pendingSabotageCard) && opponent.frontLine[f] && currentPlayerIndex === 0) {
                    slot.style.border = "3px dashed #ff3333";
                    slot.style.cursor = "pointer";
                }

                if (opponent.frontLine[f]) {
                    const monster = opponent.frontLine[f];
                    const img = document.createElement('img');
                    img.src = monster.image;
                    img.className = 'ai-card-img';
                    img.title = `${monster.name} (LV ${monster.level || 1}) - ${txt.hpText}: ${monster.currentHp}/${monster.maxHp}`;
                    img.onclick = (e) => {
                        e.stopPropagation();
                        if (currentPlayerIndex === 0) {
                            handleTargetClick('monster', opponentIndex, f);
                        }
                    };
                    slot.appendChild(img);
                } else {
                    slot.innerText = txt.monster;
                }
                oppFrontSlots.appendChild(slot);
            }
        }
    }

    // --- 2. DE MENSELIJKE SPELER ---
    const humanPlayer = players[0];

    const handEl = document.getElementById('player-hand');
    if (handEl) {
        handEl.innerHTML = '';
        humanPlayer.hand.forEach((card, index) => {
            const img = document.createElement('img');
            img.src = card.image;
            img.className = 'card-img';
            img.title = `${card.name} (${card.type})`;
            img.onclick = () => {
                if (currentPlayerIndex === 0) playCardFromHand(index);
            };
            handEl.appendChild(img);
        });
    }

    const frontEl = document.getElementById('front-line');
    if (frontEl) {
        frontEl.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';

            if (selectedAttacker && selectedAttacker.slotIndex === i) {
                slot.style.border = "3px solid #ffeb3b";
                slot.style.background = "rgba(255, 235, 59, 0.3)";
                slot.style.boxShadow = "0 0 12px #ffeb3b";
            }

            if (humanPlayer.frontLine[i]) {
                const monster = humanPlayer.frontLine[i];
                const img = document.createElement('img');
                img.src = monster.image;
                img.className = 'card-img';
                img.style.cursor = "pointer";
                img.title = `${monster.name} (LV ${monster.level || 1}) - ${txt.hpText}: ${monster.currentHp}/${monster.maxHp}`;
                img.onclick = () => {
                    if (currentPlayerIndex === 0) toggleAttackerSelection(i);
                };
                slot.appendChild(img);
            } else {
                slot.innerText = `${txt.monster} ${i+1}`;
            }
            frontEl.appendChild(slot);
        }
    }

    const backEl = document.getElementById('back-line');
    if (backEl) {
        backEl.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            if (humanPlayer.backLine[i]) {
                slot.innerHTML = `<img src="${humanPlayer.backLine[i].image}" class="card-img" title="${humanPlayer.backLine[i].name}">`;
            } else {
                slot.innerText = `${txt.building} ${i+1}`;
            }
            backEl.appendChild(slot);
        }
    }

    const bCount = document.getElementById('player-building-count');
    if (bCount) bCount.innerText = humanPlayer.backLine.filter(c => c !== null).length;
}

function toggleAttackerSelection(slotIndex) {
    if (currentPlayerIndex !== 0) return;
    const txt = getGameText();
    const activePlayer = players[currentPlayerIndex];
    if (!activePlayer.frontLine[slotIndex]) return;

    pendingSabotageCard = null;

    if (selectedAttacker && selectedAttacker.slotIndex === slotIndex) {
        selectedAttacker = null;
        showStatus(`${activePlayer.name}: ${txt.yourTurn}`);
    } else {
        selectedAttacker = {
            slotIndex: slotIndex,
            card: activePlayer.frontLine[slotIndex]
        };
        showStatus(`🎯 ${selectedAttacker.card.name} - ${txt.selectAttacker}`);
    }
    renderBoard();
}

function handleTargetClick(targetType, targetAiIndex, targetIndex) {
    if (!selectedAttacker || currentPlayerIndex !== 0) return;
    const txt = getGameText();

    const targetPlayer = players[targetAiIndex];
    const activePlayer = players[0];
    let attackerCard = activePlayer.frontLine[selectedAttacker.slotIndex];

    if (targetType === 'monster') {
        let targetMonster = targetPlayer.frontLine[targetIndex];
        if (!targetMonster) return;

        let attackerLevel = attackerCard.level || 1;
        let targetLevel = targetMonster.level || 1;

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
                showStatus(`⚔️ ${txt.hitStatus} ${targetMonster.name} (${txt.hpText}: ${targetMonster.currentHp}/${targetMonster.maxHp})`, false);
            }
        }
    } 
    else if (targetType === 'building') {
        let targetHasMonsters = targetPlayer.frontLine.some(m => m !== null);
        if (targetHasMonsters) {
            showStatus(`🛡️ ${txt.goldenShield}`, true);
            selectedAttacker = null;
            setTimeout(renderBoard, 2000);
            return;
        }

        let targetBuilding = targetPlayer.backLine[targetIndex];
        if (!targetBuilding) return;

        showStatus(`🏙️ ${txt.buildingDestroyed} (${targetBuilding.name})`, false);
        discardPile.push(targetBuilding);
        targetPlayer.backLine[targetIndex] = null;
    }

    selectedAttacker = null;
    setTimeout(endTurn, 1500);
}

function playCardFromHand(index) {
    if (currentPlayerIndex !== 0) return;
    const txt = getGameText();
    const activePlayer = players[0];

    selectedAttacker = null;
    const card = activePlayer.hand[index];

    if (card.type === 'building') {
        pendingSabotageCard = null;
        const alreadyHas = activePlayer.backLine.some(c => c && c.name === card.name);
        if (alreadyHas) {
            showStatus(`${txt.alreadyHasBuilding} ${card.name}! ${txt.uniqueBuilding}`, true);
            return;
        }

        const emptyIndex = activePlayer.backLine.indexOf(null);
        if (emptyIndex !== -1) {
            activePlayer.backLine[emptyIndex] = card;
            activePlayer.hand.splice(index, 1);
            showStatus(`🏙️ ${card.name}`);
            setTimeout(endTurn, 1000);
        } else {
            showStatus(txt.buildingZoneFull, true);
        }
    } 
    else if (card.type === 'monster') {
        pendingSabotageCard = null;
        const emptyIndex = activePlayer.frontLine.indexOf(null);
        if (emptyIndex !== -1) {
            card.level = card.level || 1;
            card.maxHp = card.level;
            card.currentHp = card.maxHp;

            activePlayer.frontLine[emptyIndex] = card;
            activePlayer.hand.splice(index, 1);
            showStatus(`👾 ${txt.monsterSummoned}: ${card.name} (LV ${card.level})`);
            setTimeout(endTurn, 1000);
        } else {
            showStatus(txt.frontLineFull, true);
        }
    } 
    else {
        pendingSabotageCard = {
            cardIndex: index,
            card: card
        };
        showStatus(`⚡ ${card.name} - ${txt.sabotageSelected}`, true);
        renderBoard();
    }
}

function executeSabotageOnTarget(targetAiIndex, targetType = null, targetIndex = null) {
    if (!pendingSabotageCard || currentPlayerIndex !== 0) return;
    const txt = getGameText();

    const activePlayer = players[0];
    let card = activePlayer.hand.splice(pendingSabotageCard.cardIndex, 1)[0];
    discardPile.push(card);

    let targetPlayer = players[targetAiIndex];
    let cardNameLower = card.name.toLowerCase();

    if (cardNameLower.includes('demolish') || cardNameLower.includes('slopen')) {
        let bIndex = targetIndex !== null ? targetIndex : targetPlayer.backLine.findIndex(b => b !== null);
        if (bIndex !== -1 && targetPlayer.backLine[bIndex]) {
            let destroyedBuilding = targetPlayer.backLine[bIndex];
            targetPlayer.backLine[bIndex] = null;
            discardPile.push(destroyedBuilding);
            showStatus(`💥 ${txt.demolishDone} (${destroyedBuilding.name})`, true);
        } else {
            showStatus(`${targetPlayer.name} ${txt.noBuildingsToDemolish}`, true);
        }
    } 
    else if (cardNameLower.includes('draw') || cardNameLower.includes('trek')) {
        for (let d = 0; d < 2; d++) {
            if (deck.length > 0) targetPlayer.hand.push(deck.pop());
        }
        showStatus(`🃏 ${txt.drawTwoDone} (${targetPlayer.name})`);
    } 
    else if (cardNameLower.includes('swap') || cardNameLower.includes('wissel')) {
        let tempHand = activePlayer.hand;
        activePlayer.hand = targetPlayer.hand;
        targetPlayer.hand = tempHand;
        showStatus(`🔄 ${txt.handSwapDone} (${targetPlayer.name})`);
    } 
    else {
        targetPlayer.skipNextTurn = true;
        showStatus(`⚡ ${card.name}! ${targetPlayer.name} ${txt.skipTurnDone}`, true);
    }

    pendingSabotageCard = null;
    setTimeout(endTurn, 2000);
}

function endTurn() {
    const txt = getGameText();
    selectedAttacker = null;
    pendingSabotageCard = null;

    do {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        if (players[currentPlayerIndex].skipNextTurn) {
            players[currentPlayerIndex].skipNextTurn = false;
            showStatus(`⏩ ${players[currentPlayerIndex].name} ${txt.skipTurnDone}`, true);
        } else {
            break;
        }
    } while (true);

    let p = players[currentPlayerIndex];

    if (pendingWinPlayer !== null && currentPlayerIndex === pendingWinPlayer) {
        showStatus(`🎉 ${p.name} ${txt.winAlert}`, false);
        alert(`🎉 ${p.name} ${txt.winAlert}`);
        initGame(players.length, p.isAI ? 'ai' : 'multiplayer');
        return;
    }

    while (p.hand.length < 5 && deck.length > 0) {
        p.hand.push(deck.pop());
    }

    checkWinCondition();
    renderBoard();

    if (players[currentPlayerIndex].isAI) {
        setTimeout(playAITurn, 1500);
    }
}

function playAITurn() {
    let ai = players[currentPlayerIndex];
    let actionDone = false;
    const txt = getGameText();

    if (pendingWinPlayer === ai.id) {
        showStatus(`🏆 ${ai.name} ${txt.winAlert}`, true);
        alert(`🏆 ${ai.name} ${txt.winAlert}`);
        initGame(players.length, 'ai');
        return;
    }

    let aiHasMonsters = ai.frontLine.some(m => m !== null);
    if (aiHasMonsters) {
        let opponents = players.filter(p => p.id !== ai.id);
        let targetOpponent = opponents[Math.floor(Math.random() * opponents.length)];

        if (targetOpponent) {
            let opponentHasMonsters = targetOpponent.frontLine.some(m => m !== null);

            if (opponentHasMonsters) {
                let mIndex = targetOpponent.frontLine.findIndex(m => m !== null);
                if (mIndex !== -1) {
                    let targetMonster = targetOpponent.frontLine[mIndex];
                    targetMonster.currentHp--;
                    showStatus(`🤖 ${ai.name} -> ${targetOpponent.name} (${targetMonster.name})`, true);
                    
                    if (targetMonster.currentHp <= 0) {
                        discardPile.push(targetMonster);
                        targetOpponent.frontLine[mIndex] = null;
                    }
                    actionDone = true;
                }
            } else {
                let bIndex = targetOpponent.backLine.findIndex(b => b !== null);
                if (bIndex !== -1) {
                    let targetBuilding = targetOpponent.backLine[bIndex];
                    showStatus(`🤖 ${ai.name} -> ${targetOpponent.name} (${targetBuilding.name})`, true);
                    discardPile.push(targetBuilding);
                    targetOpponent.backLine[bIndex] = null;
                    actionDone = true;
                }
            }
        }
    }

    if (!actionDone) {
        for (let i = 0; i < ai.hand.length; i++) {
            let card = ai.hand[i];
            if (card.type === 'building') {
                let alreadyHas = ai.backLine.some(c => c && c.name === card.name);
                let emptySlot = ai.backLine.indexOf(null);
                if (!alreadyHas && emptySlot !== -1) {
                    ai.backLine[emptySlot] = ai.hand.splice(i, 1)[0];
                    showStatus(`🤖 ${ai.name} ${txt.aiPlacedBuilding}: ${card.name}`);
                    actionDone = true;
                    break;
                }
            }
        }
    }

    if (!actionDone) {
        for (let i = 0; i < ai.hand.length; i++) {
            let card = ai.hand[i];
            if (card.type === 'monster') {
                let emptySlot = ai.frontLine.indexOf(null);
                if (emptySlot !== -1) {
                    card.level = card.level || 1;
                    card.maxHp = card.level;
                    card.currentHp = card.maxHp;

                    ai.frontLine[emptySlot] = ai.hand.splice(i, 1)[0];
                    showStatus(`🤖 ${ai.name} ${txt.aiSummonedMonster}: ${card.name} (LV ${card.level})`);
                    actionDone = true;
                    break;
                }
            }
        }
    }

    if (!actionDone) {
        let sabotageIndex = ai.hand.findIndex(c => c.type !== 'building' && c.type !== 'monster');
        if (sabotageIndex !== -1) {
            let sCard = ai.hand.splice(sabotageIndex, 1)[0];
            discardPile.push(sCard);

            let opponents = players.filter(p => p.id !== ai.id);
            let targetOpponent = opponents[Math.floor(Math.random() * opponents.length)];
            let cardNameLower = sCard.name.toLowerCase();

            if (cardNameLower.includes('demolish') || cardNameLower.includes('slopen')) {
                let bIndex = targetOpponent.backLine.findIndex(b => b !== null);
                if (bIndex !== -1 && targetOpponent.backLine[bIndex]) {
                    let destroyedBuilding = targetOpponent.backLine[bIndex];
                    targetOpponent.backLine[bIndex] = null;
                    discardPile.push(destroyedBuilding);
                    showStatus(`💥 ${ai.name} speelt DEMOLISH! Gebouw (${destroyedBuilding.name}) van ${targetOpponent.name} is vernietigd!`, true);
                } else {
                    showStatus(`🤖 ${ai.name} speelt ${sCard.name}, maar ${targetOpponent.name} heeft geen gebouwen om te slopen.`, true);
                }
            } 
            else if (cardNameLower.includes('draw') || cardNameLower.includes('trek')) {
                for (let d = 0; d < 2; d++) {
                    if (deck.length > 0) targetOpponent.hand.push(deck.pop());
                }
                showStatus(`🃏 ${ai.name} geeft ${targetOpponent.name} 2 extra kaarten via ${sCard.name}!`);
            } 
            else if (cardNameLower.includes('swap') || cardNameLower.includes('wissel')) {
                let tempHand = ai.hand;
                ai.hand = targetOpponent.hand;
                targetOpponent.hand = tempHand;
                showStatus(`🔄 ${ai.name} heeft de handkaarten gewisseld met ${targetOpponent.name} via ${sCard.name}!`, true);
            } 
            else {
                targetOpponent.skipNextTurn = true;
                showStatus(`⚡ ${ai.name} speelt ${sCard.name}! ${targetOpponent.name} moet de volgende beurt overslaan!`, true);
            }

            actionDone = true;
        }
    }

    if (!actionDone && ai.hand.length > 0) {
        discardPile.push(ai.hand.splice(0, 1)[0]);
        showStatus(`🤖 ${ai.name} ${txt.aiDiscarded}.`);
    }

    setTimeout(endTurn, 1500);
}

function checkWinCondition() {
    const txt = getGameText();
    for (let p of players) {
        const uniqueBuildings = new Set(p.backLine.filter(c => c !== null).map(c => c.name));
        if (uniqueBuildings.size >= 7) {
            if (pendingWinPlayer === null) {
                pendingWinPlayer = p.id;
                showStatus(`🏆 ${p.name} ${txt.winWarning}!`, true);
            }
            return;
        }
    }
}