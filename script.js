const suits = ["red", "yellow", "green", "blue"];
const specialCards = ["Draw Two", "Reverse", "Skip"];
const wildCards = ["Wild", "Wild Draw Four"];

let deck = [];
let discardPile = [];
let players = [];
let currentPlayerIndex = 0;
let direction = 1; // 1 for clockwise, -1 for counterclockwise

// カードデッキを作成する関数
function createDeck() {
    suits.forEach(suit => {
        for (let i = 0; i <= 9; i++) {
            deck.push({ value: i, suit: suit });
            if (i !== 0) deck.push({ value: i, suit: suit });
        }
        specialCards.forEach(card => {
            deck.push({ value: card, suit: suit });
            deck.push({ value: card, suit: suit });
        });
    });
    wildCards.forEach(card => {
        deck.push({ value: card });
        deck.push({ value: card });
    });
    shuffleDeck();
}

// デッキをシャッフルする関数
function shuffleDeck() {
    deck = deck.sort(() => Math.random() - 0.5);
}

// ゲームを開始する関数
function startGame(numPlayers) {
    createDeck();
    for (let i = 0; i < numPlayers; i++) {
        players.push({ hand: deck.splice(0, 7) });
    }
    discardPile.push(deck.pop());
    updateUI();
}

// UIを更新する関数
function updateUI() {
    // ここにUIを更新するコードを記述します
}

// 次のプレイヤーを決定する関数
function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + direction + players.length) % players.length;
    updateUI();
}

// カードをプレイする関数
function playCard(playerIndex, cardIndex) {
    const card = players[playerIndex].hand[cardIndex];
    discardPile.push(card);
    players[playerIndex].hand.splice(cardIndex, 1);
    applyCardEffect(card);
    nextPlayer();
}

// カード効果を適用する関数
function applyCardEffect(card) {
    switch (card.value) {
        case "Reverse":
            direction *= -1;
            break;
        case "Skip":
            nextPlayer();
            break;
        case "Draw Two":
            drawCards(nextPlayer(), 2);
            break;
        case "Wild":
        case "Wild Draw Four":
            // 色変更のロジックを実装
            break;
    }
}

// カードを引く関数
function drawCards(playerIndex, numCards) {
    for (let i = 0; i < numCards; i++) {
        players[playerIndex].hand.push(deck.pop());
    }
}

// ゲーム開始
startGame(4);

function updateUI() {
    const discardTopCard = discardPile[discardPile.length - 1];
    const cardImage = document.createElement('img');
    cardImage.src = `images/${discardTopCard.suit}_${discardTopCard.value}.png.jpg`;
    document.getElementById('discard-pile').appendChild(cardImage);
}
let unoCalled = false;

function checkUno() {
    if (playerHand.length === 1) {
        document.getElementById('unoButton').style.display = 'block';
        unoCalled = false;
        setTimeout(function() {
            if (!unoCalled) {
                drawCards(3); // 3枚カードを引く
                alert("UNOを押さなかったため、3枚のカードが追加されました。");
            }
            document.getElementById('unoButton').style.display = 'none';
        }, 3000); // 3秒以内にUNOボタンを押す必要がある
    }
}

function pressUno() {
    unoCalled = true;
    document.getElementById('unoButton').style.display = 'none';
    alert("UNOが宣言されました！");
}

// 例えば、カードを出す際にこのcheckUno関数を呼び出します
function playCard(card) {
    // カードをプレイする処理...
    checkUno();
}
