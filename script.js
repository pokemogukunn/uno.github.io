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
let deck = []; // 山札
const playerHand = [];
const ai1Hand = [];
const ai2Hand = [];
const ai3Hand = [];
let unoCalled = false;

// デッキを初期化する関数
function initializeDeck() {
    // ここにデッキのカードを初期化するコードを追加
}

// 初期手札を配る関数
function dealInitialHands() {
    for (let i = 0; i < 7; i++) {
        playerHand.push(deck.pop());
        ai1Hand.push(deck.pop());
        ai2Hand.push(deck.pop());
        ai3Hand.push(deck.pop());
    }
    updateHandDisplay();
}

// 手札を表示する関数
function updateHandDisplay() {
    const playerHandDiv = document.getElementById('playerHand');
    const ai1HandDiv = document.getElementById('ai1Hand');
    const ai2HandDiv = document.getElementById('ai2Hand');
    const ai3HandDiv = document.getElementById('ai3Hand');

    // プレイヤーの手札を表示
    playerHandDiv.innerHTML = '';
    playerHand.forEach(card => {
        const cardImg = document.createElement('img');
        cardImg.src = `images/${card}.png.jpg`; // カードの画像ファイル名を利用
        playerHandDiv.appendChild(cardImg);
    });

    // AIの手札を裏向きで表示
    const backCardImgSrc = 'images/back.png';
    ai1HandDiv.innerHTML = '';
    ai1Hand.forEach(() => {
        const cardImg = document.createElement('img');
        cardImg.src = backCardImgSrc;
        ai1HandDiv.appendChild(cardImg);
    });

    ai2HandDiv.innerHTML = '';
    ai2Hand.forEach(() => {
        const cardImg = document.createElement('img');
        cardImg.src = backCardImgSrc;
        ai2HandDiv.appendChild(cardImg);
    });

    ai3HandDiv.innerHTML = '';
    ai3Hand.forEach(() => {
        const cardImg = document.createElement('img');
        cardImg.src = backCardImgSrc;
        ai3HandDiv.appendChild(cardImg);
    });
}

// UNOボタンの処理
function callUno() {
    if (playerHand.length === 1) {
        alert("UNO! が宣言されました");
        unoCalled = true;
    } else {
        alert("手札が1枚ではありません！");
    }
}

// プレイヤーの手札が残り1枚になったかをチェックする
function checkUno() {
    if (playerHand.length === 1 && !unoCalled) {
        playerHand.push(deck.pop(), deck.pop(), deck.pop()); // 3枚追加
        alert("UNO を宣言しなかったため、ペナルティとして3枚引きました。");
        updateHandDisplay();
    }
}

function endTurn() {
    checkUno();
    // その後、ターンをAIなどに移す処理
}

// ゲームの開始
initializeDeck();
dealInitialHands();
let deck = []; // 山札
const playerHand = [];
const ai1Hand = [];
const ai2Hand = [];
const ai3Hand = [];
let discardPile = []; // 捨て札の山
let unoCalled = false;
let dealt = false; // カードが配られたかどうか
let firstDiscardMade = false; // 誰かが最初のカードを捨てたかどうか

// デッキを初期化する関数
function initializeDeck() {
    // ここにデッキのカードを初期化するコードを追加
}

// 初期手札を配る関数
function dealInitialHands() {
    // カードが既に配られている、または誰かがカードを捨てた場合は何もしない
    if (dealt || firstDiscardMade) {
        return;
    }

    // カードを配る
    for (let i = 0; i < 7; i++) {
        playerHand.push(deck.pop());
        ai1Hand.push(deck.pop());
        ai2Hand.push(deck.pop());
        ai3Hand.push(deck.pop());
    }

    // 最初の捨て札として1枚カードをデッキから出す
    discardPile.push(deck.pop());

    dealt = true;
    updateHandDisplay();
    updateDiscardPileDisplay();
}

// 手札を表示する関数
function updateHandDisplay() {
    const playerHandDiv = document.getElementById('playerHand');
    const ai1HandDiv = document.getElementById('ai1Hand');
    const ai2HandDiv = document.getElementById('ai2Hand');
    const ai3HandDiv = document.getElementById('ai3Hand');

    // プレイヤーの手札を表示
    playerHandDiv.innerHTML = '';
    playerHand.forEach(card => {
        const cardImg = document.createElement('img');
        cardImg.src = `images/${card}.png`; // カードの画像ファイル名を利用
        playerHandDiv.appendChild(cardImg);
    });

    // AIの手札を裏向きで表示
    const backCardImgSrc = 'images/back.png';
    ai1HandDiv.innerHTML = '';
    ai1Hand.forEach(() => {
        const cardImg = document.createElement('img');
        cardImg.src = backCardImgSrc;
        ai1HandDiv.appendChild(cardImg);
    });

    ai2HandDiv.innerHTML = '';
    ai2Hand.forEach(() => {
        const cardImg = document.createElement('img');
        cardImg.src = backCardImgSrc;
        ai2HandDiv.appendChild(cardImg);
    });

    ai3HandDiv.innerHTML = '';
    ai3Hand.forEach(() => {
        const cardImg = document.createElement('img');
        cardImg.src = backCardImgSrc;
        ai3HandDiv.appendChild(cardImg);
    });
}

// 捨て札を表示する関数
function updateDiscardPileDisplay() {
    const discardPileDiv = document.getElementById('discardPile');
    discardPileDiv.innerHTML = '';

    // 捨て札の一番上のカードを表示
    if (discardPile.length > 0) {
        const topCard = discardPile[discardPile.length - 1];
        const cardImg = document.createElement('img');
        cardImg.src = `images/${topCard}.png`; // カードの画像ファイル名を利用
        discardPileDiv.appendChild(cardImg);
    }
}

// カードを捨てる処理
function discardCard(player, cardIndex) {
    const card = player.splice(cardIndex, 1)[0];
    discardPile.push(card);
    firstDiscardMade = true; // 最初のカードが捨てられたことを記録
    updateDiscardPileDisplay();
    updateHandDisplay();
}

// UNOボタンの処理
function callUno() {
    if (playerHand.length === 1) {
        alert("UNO! が宣言されました");
        unoCalled = true;
    } else {
        alert("手札が1枚ではありません！");
    }
}

// プレイヤーの手札が残り1枚になったかをチェックする
function checkUno() {
    if (playerHand.length === 1 && !unoCalled) {
        playerHand.push(deck.pop(), deck.pop(), deck.pop()); // 3枚追加
        alert("UNO を宣言しなかったため、ペナルティとして3枚引きました。");
        updateHandDisplay();
    }
}

function endTurn() {
    checkUno();
    // その後、ターンをAIなどに移す処理
}

// ゲームの開始
initializeDeck();

