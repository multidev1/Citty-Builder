let deck = [];
let discardPile = [];
let players = [];
let currentPlayerIndex = 0;
let pendingWinPlayer = null;

let selectedAttacker = null;
let pendingSabotageCard = null;

// De juiste achterkant van de kaart
const CARD_BACK_IMG = "0000_back.png";

function initGame(numPlayers = 3) {
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
        players.push({
            id: i,
            name: i === 0 ? "Jij" : `AI Speler ${i}`,
            isAI: i !== 0,
            hand: [],
            frontLine: [null, null, null],
            backLine: Array(7).fill(null),
            skipNextTurn: false
        });
    }

    for (let p of players) {
        for (let i = 0; i < 5; i++) {
            if (deck.length > 0) p.hand.push(deck.pop());
        }
    }

    renderBoard();
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
    const activePlayer = players[currentPlayerIndex];
    if (!selectedAttacker && !pendingSabotageCard) {
        showStatus(activePlayer.isAI ? `Beurt van ${activePlayer.name}...` : "Jouw Beurt (Speel een kaart of klik op je monster om aan te vallen)");
    }

    document.getElementById('deck-count').innerText = deck.length;
    document.getElementById('discard-count').innerText = discardPile.length;

    const drawPileEl = document.getElementById('draw-pile');
    if (drawPileEl) {
        let backImg = typeof CARD_BACK_IMAGE !== 'undefined' ? CARD_BACK_IMAGE : CARD_BACK_IMG;
        drawPileEl.innerHTML = deck.length > 0 ? `<img src="${backImg}" class="card-img" alt="Trekstapel">` : '<span>Leeg</span>';
    }

    const discardPileEl = document.getElementById('discard-pile');
    if (discardPileEl) {
        if (discardPile.length > 0) {
            const topCard = discardPile[discardPile.length - 1];
            discardPileEl.innerHTML = `<img src="${topCard.image}" class="card-img" alt="${topCard.name}">`;
        } else {
            discardPileEl.innerHTML = '<span>Leeg</span>';
        }
    }

    // AI spelers renderen bovenin met zichtbare handkaarten (0000_back.png)
    const aiContainer = document.getElementById('ai-container');
    if (aiContainer) {
        aiContainer.innerHTML = '';
        for (let i = 1; i < players.length; i++) {
            const ai = players[i];
            const aiField = document.createElement('div');
            aiField.className = 'field-container';
            aiField.style.background = pendingSabotageCard ? 'rgba(255, 87, 34, 0.2)' : 'rgba(255, 0, 0, 0.08)';
            
            aiField.style.cursor = pendingSabotageCard ? 'pointer' : 'default';
            aiField.onclick = () => {
                if (pendingSabotageCard) {
                    executeSabotageOnTarget(i);
                }
            };

            let buildingCount = ai.backLine.filter(c => c !== null).length;
            let backImg = typeof CARD_BACK_IMAGE !== 'undefined' ? CARD_BACK_IMAGE : CARD_BACK_IMG;
            
            let aiHandHtml = '';
            for (let h = 0; h < ai.hand.length; h++) {
                aiHandHtml += `<img src="${backImg}" class="ai-hand-card-img" style="width: 30px; height: 45px; margin-right: 3px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">`;
            }

            aiField.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 5px;">
                    <p class="zone-title" style="margin: 0; ${pendingSabotageCard ? 'color: #ff5722; font-weight: bold;' : ''}">🤖 ${ai.name} (Gebouwen: ${buildingCount}/7) ${pendingSabotageCard ? '👉 [KLIK HIER ALS DOELWIT]' : ''}</p>
                    <div style="display: flex; align-items: center; background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 6px;" title="Handkaarten van ${ai.name}">
                        <span style="font-size: 11px; margin-right: 5px; color: #fff; font-weight: bold;">Hand (${ai.hand.length}):</span>
                        <div style="display: flex;">${aiHandHtml}</div>
                    </div>
                </div>
                <div class="card-slots" id="ai-${i}-back"></div>
                <p class="zone-title" style="margin-top: 4px;">🤖 Front Line (Monsters)</p>
                <div class="card-slots" id="ai-${i}-front"></div>
            `;
            aiContainer.appendChild(aiField);

            // AI Back line (Gebouwen)
            const aiBackSlots = document.getElementById(`ai-${i}-back`);
            for (let b = 0; b < 7; b++) {
                const slot = document.createElement('div');
                slot.className = 'slot';
                
                if ((selectedAttacker || pendingSabotageCard) && ai.backLine[b]) {
                    slot.style.border = "3px dashed #ff3333";
                    slot.style.cursor = "pointer";
                }

                if (ai.backLine[b]) {
                    const img = document.createElement('img');
                    img.src = ai.backLine[b].image;
                    img.className = 'ai-card-img';
                    img.onclick = (e) => {
                        e.stopPropagation();
                        if (pendingSabotageCard) {
                            executeSabotageOnTarget(i, 'building', b);
                        } else {
                            handleTargetClick('building', i, b);
                        }
                    };
                    slot.appendChild(img);
                } else {
                    slot.innerText = `Gebouw`;
                }
                aiBackSlots.appendChild(slot);
            }

            // AI Front line (Monsters)
            const aiFrontSlots = document.getElementById(`ai-${i}-front`);
            for (let f = 0; f < 3; f++) {
                const slot = document.createElement('div');
                slot.className = 'slot';

                if ((selectedAttacker || pendingSabotageCard) && ai.frontLine[f]) {
                    slot.style.border = "3px dashed #ff3333";
                    slot.style.cursor = "pointer";
                }

                if (ai.frontLine[f]) {
                    const monster = ai.frontLine[f];
                    const img = document.createElement('img');
                    img.src = monster.image;
                    img.className = 'ai-card-img';
                    img.onclick = (e) => {
                        e.stopPropagation();
                        handleTargetClick('monster', i, f);
                    };
                    slot.appendChild(img);
                } else {
                    slot.innerText = `Monster`;
                }
                aiFrontSlots.appendChild(slot);
            }
        }
    }

    // Jouw Handkaarten
    const humanPlayer = players[0];
    const handEl = document.getElementById('player-hand');
    if (handEl) {
        handEl.innerHTML = '';
        humanPlayer.hand.forEach((card, index) => {
            const img = document.createElement('img');
            img.src = card.image;
            img.className = 'card-img';
            img.title = `${card.name} (${card.type})`;
            img.onclick = () => playCardFromHand(index);
            handEl.appendChild(img);
        });
    }

    // Jouw Front Line (Monsters)
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
                img.title = "Klik om dit monster te selecteren als aanvaller";
                img.onclick = () => toggleAttackerSelection(i);
                slot.appendChild(img);
            } else {
                slot.innerText = `Monster ${i+1}`;
            }
            frontEl.appendChild(slot);
        }
    }

    // Jouw Back Line (Gebouwen)
    const backEl = document.getElementById('back-line');
    if (backEl) {
        backEl.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            if (humanPlayer.backLine[i]) {
                slot.innerHTML = `<img src="${humanPlayer.backLine[i].image}" class="card-img" title="${humanPlayer.backLine[i].name}">`;
            } else {
                slot.innerText = `Gebouw ${i+1}`;
            }
            backEl.appendChild(slot);
        }
    }

    const bCount = document.getElementById('player-building-count');
    if (bCount) bCount.innerText = humanPlayer.backLine.filter(c => c !== null).length;
}

function toggleAttackerSelection(slotIndex) {
    if (currentPlayerIndex !== 0) return;
    const humanPlayer = players[0];
    if (!humanPlayer.frontLine[slotIndex]) return;

    pendingSabotageCard = null;

    if (selectedAttacker && selectedAttacker.slotIndex === slotIndex) {
        selectedAttacker = null;
        showStatus("Jouw Beurt (Speel een kaart of klik op je monster om aan te vallen)");
    } else {
        selectedAttacker = {
            slotIndex: slotIndex,
            card: humanPlayer.frontLine[slotIndex]
        };
        showStatus(`🎯 Aanvaller geselecteerd (${selectedAttacker.card.name}). Kies een doelwit!`);
    }
    renderBoard();
}

function handleTargetClick(targetType, aiIndex, targetIndex) {
    if (!selectedAttacker) return;

    const ai = players[aiIndex];
    const humanPlayer = players[0];
    let attackerCard = humanPlayer.frontLine[selectedAttacker.slotIndex];

    if (targetType === 'monster') {
        let targetMonster = ai.frontLine[targetIndex];
        if (!targetMonster) return;

        let attackerLevel = attackerCard.level || 1;
        let targetLevel = targetMonster.level || 1;

        if (attackerLevel === targetLevel) {
            showStatus(`⚠️ Gelijk Level (${attackerLevel})! Beide monsters vernietigd[cite: 1].`, true);
            discardPile.push(attackerCard);
            discardPile.push(targetMonster);
            humanPlayer.frontLine[selectedAttacker.slotIndex] = null;
            ai.frontLine[targetIndex] = null;
        } else {
            targetMonster.currentHp--;
            if (targetMonster.currentHp <= 0) {
                showStatus(`🎯 Hit! Vijandelijk monster (${targetMonster.name}) is verslagen[cite: 1]!`, false);
                discardPile.push(targetMonster);
                ai.frontLine[targetIndex] = null;
            } else {
                showStatus(`⚔️ Hit uitgevoerd op ${targetMonster.name} (HP: ${targetMonster.currentHp}/${targetMonster.maxHp})[cite: 1]`, false);
            }
        }
    } 
    else if (targetType === 'building') {
        let aiHasMonsters = ai.frontLine.some(m => m !== null);
        if (aiHasMonsters) {
            showStatus("🛡️ Gouden Schild Regel: Versla eerst alle monsters in de Front Line[cite: 1]!", true);
            selectedAttacker = null;
            setTimeout(renderBoard, 2000);
            return;
        }

        let targetBuilding = ai.backLine[targetIndex];
        if (!targetBuilding) return;

        showStatus(`🏙️ Doelwit geraakt! Gebouw (${targetBuilding.name}) is vernietigd[cite: 1].`, false);
        discardPile.push(targetBuilding);
        ai.backLine[targetIndex] = null;
    }

    selectedAttacker = null;
    setTimeout(endTurn, 1500);
}

function playCardFromHand(index) {
    if (currentPlayerIndex !== 0) return;

    selectedAttacker = null;
    const humanPlayer = players[0];
    const card = humanPlayer.hand[index];

    if (card.type === 'building') {
        pendingSabotageCard = null;
        const alreadyHas = humanPlayer.backLine.some(c => c && c.name === card.name);
        if (alreadyHas) {
            showStatus(`Je hebt al een ${card.name}! Gebouwen moeten uniek zijn[cite: 1].`, true);
            return;
        }

        const emptyIndex = humanPlayer.backLine.indexOf(null);
        if (emptyIndex !== -1) {
            humanPlayer.backLine[emptyIndex] = card;
            humanPlayer.hand.splice(index, 1);
            showStatus(`🏙️ Gebouwd: ${card.name}`);
            setTimeout(endTurn, 1000);
        } else {
            showStatus("Je Back Line zit vol met gebouwen!", true);
        }
    } 
    else if (card.type === 'monster') {
        pendingSabotageCard = null;
        const emptyIndex = humanPlayer.frontLine.indexOf(null);
        if (emptyIndex !== -1) {
            card.maxHp = card.maxHp || 2;
            card.currentHp = card.maxHp;
            card.level = card.level || 1;

            humanPlayer.frontLine[emptyIndex] = card;
            humanPlayer.hand.splice(index, 1);
            showStatus(`👾 Monster opgeroepen: ${card.name}`);
            setTimeout(endTurn, 1000);
        } else {
            showStatus("Je Front Line zit vol (maximaal 3 monsters)[cite: 1]!", true);
        }
    } 
    else {
        pendingSabotageCard = {
            cardIndex: index,
            card: card
        };
        showStatus(`⚡ Sabotage (${card.name}) geselecteerd! KLIK NU OP DE TEGENSTANDER om dit toe te passen.`, true);
        renderBoard();
    }
}

function executeSabotageOnTarget(targetAiIndex, targetType = null, targetIndex = null) {
    if (!pendingSabotageCard) return;

    const humanPlayer = players[0];
    let card = humanPlayer.hand.splice(pendingSabotageCard.cardIndex, 1)[0];
    discardPile.push(card);

    let targetAI = players[targetAiIndex];
    let cardNameLower = card.name.toLowerCase();

    if (cardNameLower.includes('demolish') || cardNameLower.includes('slopen')) {
        let bIndex = targetIndex !== null ? targetIndex : targetAI.backLine.findIndex(b => b !== null);
        if (bIndex !== -1 && targetAI.backLine[bIndex]) {
            let destroyedBuilding = targetAI.backLine[bIndex];
            targetAI.backLine[bIndex] = null;
            discardPile.push(destroyedBuilding);
            showStatus(`💥 DEMOLISH! Gebouw (${destroyedBuilding.name}) van ${targetAI.name} direct vernietigd[cite: 1]!`, true);
        } else {
            showStatus(`${targetAI.name} heeft geen gebouwen om te slopen!`, true);
        }
    } 
    else if (cardNameLower.includes('draw') || cardNameLower.includes('trek')) {
        for (let d = 0; d < 2; d++) {
            if (deck.length > 0) targetAI.hand.push(deck.pop());
        }
        showStatus(`🃏 DRAW TWO! ${targetAI.name} heeft 2 extra kaarten getrokken[cite: 1].`);
    } 
    else if (cardNameLower.includes('swap') || cardNameLower.includes('wissel')) {
        let tempHand = humanPlayer.hand;
        humanPlayer.hand = targetAI.hand;
        targetAI.hand = tempHand;
        showStatus(`🔄 HAND SWAP! Je hand is gewisseld met ${targetAI.name}[cite: 1]!`);
    } 
    else {
        targetAI.skipNextTurn = true;
        showStatus(`⚡ SABOTAGE: ${card.name}! ${targetAI.name} slaat zijn volgende beurt over[cite: 1].`, true);
    }

    pendingSabotageCard = null;
    setTimeout(endTurn, 2000);
}

function endTurn() {
    selectedAttacker = null;
    pendingSabotageCard = null;

    do {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        if (players[currentPlayerIndex].skipNextTurn) {
            players[currentPlayerIndex].skipNextTurn = false;
            showStatus(`⏩ ${players[currentPlayerIndex].name} slaat deze beurt over door Sabotage!`, true);
        } else {
            break;
        }
    } while (true);

    let p = players[currentPlayerIndex];

    if (currentPlayerIndex === 0 && pendingWinPlayer === 0) {
        showStatus("🎉 GEFELICITEERD! Je hebt 7 unieke gebouwen een volle ronde verdedigd en gewonnen[cite: 1]!", false);
        alert("🎉 GEFELICITEERD! Jij bent de absolute winnaar van CITTY BUILDER[cite: 1]!");
        initGame(players.length);
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

    if (pendingWinPlayer === ai.id) {
        showStatus(`🏆 ${ai.name} heeft gewonnen door 7 gebouwen een hele ronde te verdedigen[cite: 1]!`, true);
        alert(`🏆 ${ai.name} heeft gewonnen[cite: 1]!`);
        initGame(players.length);
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
                    showStatus(`🤖 ${ai.name} valt ${targetOpponent.name} zijn monster (${targetMonster.name}) aan[cite: 1]!`, true);
                    
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
                    showStatus(`🤖 ${ai.name} breekt door en vernietigt ${targetOpponent.name} zijn gebouw (${targetBuilding.name})[cite: 1]!`, true);
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
                    showStatus(`🤖 ${ai.name} heeft een gebouw geplaatst: ${card.name}`);
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
                    card.maxHp = card.maxHp || 2;
                    card.currentHp = card.maxHp;
                    card.level = card.level || 1;

                    ai.frontLine[emptySlot] = ai.hand.splice(i, 1)[0];
                    showStatus(`🤖 ${ai.name} heeft een monster opgeroepen: ${card.name}`);
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
            let randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
            randomOpponent.skipNextTurn = true;
            showStatus(`🤖 ${ai.name} speelt sabotagekaart (${sCard.name}) op ${randomOpponent.name}[cite: 1]!`, true);
            actionDone = true;
        }
    }

    if (!actionDone && ai.hand.length > 0) {
        discardPile.push(ai.hand.splice(0, 1)[0]);
        showStatus(`🤖 ${ai.name} heeft een kaart afgelegd.`);
    }

    setTimeout(endTurn, 1500);
}

function checkWinCondition() {
    for (let p of players) {
        let uniqueBuildings = p.backLine.filter(c => c !== null).length;
        if (uniqueBuildings >= 7) {
            if (pendingWinPlayer === null) {
                pendingWinPlayer = p.id;
                showStatus(`⚠️ ${p.name} heeft 7 unieke gebouwen! Verdedig ze tot de volgende beurt[cite: 1]!`, true);
            }
        }
    }
}