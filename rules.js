// Volledige officiële spelregels van CITTY BUILDER
const GAME_RULES_HTML = `
    <h2>📜 CITTY BUILDER</h2>
    <p><i>The Ultimate Card Game of Building, Combat & Sabotage</i><br><b>2 - 4 Players</b></p>
    <hr style="border: 0; border-top: 1px solid #c19b47; margin: 15px 0;">

    <h3>🎯 OBJECTIVE OF THE GAME</h3>
    <p>Be the first player to have <b>7 different buildings</b> face-up in your backline and successfully defend them for a full round (until the start of your next turn).</p>

    <h3>🎴 THE DECK (112 Cards)</h3>
    <p>The game is played with a single central draw pile consisting of 112 cards, divided into three categories:</p>
    <ul>
        <li><b>Buildings (approx. 49 cards):</b> Unique locations. Bank, Hotel, Cathedral, Casino, House, Shopping Mall, International Airport[cite: 1].</li>
        <li><b>Monsters (approx. 33 cards):</b> Defenders featuring a Level (LV), Power, and a specific hit capacity (e.g., "Can be attacked 2 times before being defeated")[cite: 1].</li>
        <li><b>Sabotage (approx. 30 cards):</b> Action cards that break the rules and can be played at any time[cite: 1].</li>
    </ul>

    <h3>🗺️ THE BATTLEFIELD (Your Play Area)</h3>
    <p>Each player builds two distinct zones in front of them on the table[cite: 1]:</p>
    <p><b>Front Line (Monster Zone):</b> This is where your Monsters stand to guard your buildings[cite: 1].</p>
    <p><b>Back Line (Building Zone):</b> This is where your unique Buildings are placed[cite: 1].</p>

    <h3>🛡️ The Golden Shield Rule</h3>
    <p>As long as you have at least 1 Monster in your Front Line, all your Buildings are fully protected from standard attacks[cite: 1]. Opponents must fight through all your Monsters first before they can target your Buildings (unless a special card bypasses this rule)[cite: 1].</p>

    <h3>🚀 GAMEPLAY</h3>
    <p><b>Setup:</b></p>
    <ul>
        <li>Shuffle all 112 cards thoroughly and place them face down as the central draw pile in the middle[cite: 1].</li>
        <li>Each player is dealt 5 starting cards[cite: 1].</li>
        <li>The youngest player goes first. Play proceeds clockwise[cite: 1].</li>
    </ul>

    <p><b>Turn Structure:</b><br>When it is your turn, you perform 1 Main Action and finish by Refilling Your Hand[cite: 1]:</p>

    <p><b>STEP 1: Choose 1 Main Action</b><br>Choose one of the following three options[cite: 1]:</p>
    <ul>
        <li><b>Option A — BUILD:</b> Place 1 Building from your hand face-up into your Back Line. <i>(Note: You cannot have two identical buildings on your field; they must all be unique!)[cite: 1]</i></li>
        <li><b>Option B — SUMMON MONSTER:</b> Place 1 Monster from your hand face-up into your Front Line to protect your empire. <i>(Each player can have a maximum of 3 monsters on the field at the same time)[cite: 1].</i></li>
        <li><b>Option C — ATTACK:</b> Choose 1 Monster from your Front Line to attack an opponent's Monster[cite: 1].</li>
    </ul>

    <p><b>Combat & Destruction:</b></p>
    <ul>
        <li><b>Defeated:</b> If the defending monster is destroyed, it is sent to the discard pile[cite: 1].</li>
        <li><b>Empty Monster Zone?</b> If an opponent has no monsters left on the field, your attack goes straight through to destroy 1 Building in their Back Line[cite: 1]!</li>
    </ul>

    <p><b>STEP 2: Refill Hand (End of Your Turn)</b><br>At the end of your turn, draw cards from the deck until you have exactly 5 cards in your hand again[cite: 1].</p>

    <h3>⚡ SABOTAGE CARDS (Playing Out of Turn)</h3>
    <p>Sabotage cards are your tool to ruin everyone else's day. You may play them directly from your hand at any moment, even when it is not your turn[cite: 1]!</p>
    <ul>
        <li><b>Skip!:</b> Force a chosen player to skip their entire turn[cite: 1].</li>
        <li><b>Reverse!:</b> Immediately reverse the turn order around the table[cite: 1].</li>
        <li><b>Draw Two!:</b> Target opponent must draw 2 extra cards from the deck[cite: 1].</li>
        <li><b>Demolish! (Direct Destruction):</b> Bypasses all Monsters on the field! Directly destroy 1 Building of an opponent's choice[cite: 1].</li>
        <li><b>Hand Swap!:</b> Trade your entire hand of cards with the hand of any chosen player[cite: 1].</li>
    </ul>

    <h3>🏆 THE WINNER</h3>
    <p>As soon as a player manages to place <b>7 DIFFERENT BUILDINGS</b> in their Back Line, they must announce it out loud[cite: 1].</p>
    <p>If that set of 7 different buildings is still safely on the field at the start of your next turn (because no one managed to demolish or take them over)...[cite: 1]</p>
    <p><b>🎉 Then you are the absolute winner of CITTY BUILDER[cite: 1]!</b></p>
`;