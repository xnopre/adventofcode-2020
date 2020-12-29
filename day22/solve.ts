import { clone, readLinesFromInputFile } from "../utils";

const LOG = false;

type Deck = number[];

enum Winner {
  ONE = "ONE",
  TWO = "TWO",
}

// Lecture et conversion des données

function convertToPlayer(lines: string[]): Deck {
  return lines
    .filter((line) => line.length > 0 && !line.startsWith("Player"))
    .map((line) => parseInt(line));
}

function readPlayers(filename: string) {
  const lines = readLinesFromInputFile(filename, false);
  const indexSep = lines.indexOf("");
  const lines2 = lines.splice(indexSep + 1);
  const player1 = convertToPlayer(lines);
  const player2 = convertToPlayer(lines2);
  return { player1, player2 };
}

// Part 1

export function doAllRounds(player1: Deck, player2: Deck): Winner {
  while (player1.length > 0 && player2.length > 0) {
    const val1 = player1.shift();
    const val2 = player2.shift();
    if (val1 > val2) {
      player1.push(val1, val2);
    } else {
      player2.push(val2, val1);
    }
  }
  return player1.length > 0 ? Winner.ONE : Winner.TWO;
}

function calculateScoreOfWinner(winner: Deck) {
  return winner
    .reverse()
    .reduce((acc, val, index) => acc + val * (index + 1), 0);
}

export function solvePart1(filename: string): number {
  const { player1, player2 } = readPlayers(filename);
  const winner = doAllRounds(player1, player2);
  return calculateScoreOfWinner(winner === Winner.ONE ? player1 : player2);
}

// Part 2

function areDeckEqual(deck1: Deck, deck2: Deck) {
  if (deck1.length !== deck2.length) {
    return false;
  }
  for (let i = 0; i < deck1.length; i++) {
    if (deck1[i] !== deck2[i]) {
      return false;
    }
  }
  return true;
}

function alreadySeen(player: Deck, oldPlayer: Deck[]) {
  for (const deck of oldPlayer) {
    if (areDeckEqual(deck, player)) return true;
  }
  return false;
}

function areDecksBothAlreadySeen(
  player1: Deck,
  player2: Deck,
  oldPlayer1: Deck[],
  oldPlayer2: Deck[]
) {
  return alreadySeen(player1, oldPlayer1) && alreadySeen(player2, oldPlayer2);
}

function getAreConditionsForASubGame(
  player1: Deck,
  val1: number,
  player2: Deck,
  val2: number
) {
  return player1.length >= val1 && player2.length >= val2;
}

export function doAllRoundsWithSubGame(
  player1: Deck,
  player2: Deck,
  gamecount = [true]
): Winner {
  const game = gamecount.length;
  let round = 1;
  const oldPlayer1: Deck[] = [];
  const oldPlayer2: Deck[] = [];
  while (player1.length > 0 && player2.length > 0) {
    oldPlayer1.push(clone(player1));
    oldPlayer2.push(clone(player2));
    if (LOG) console.log(`-------------`);
    if (LOG) console.log(`Round ${round} (Game ${game})`);
    if (LOG) console.log(`Payer 1's deck : ${player1}`);
    if (LOG) console.log(`Payer 2's deck : ${player2}`);
    const val1 = player1.shift();
    const val2 = player2.shift();
    if (LOG) console.log(`Payer 1 plays : ${val1}`);
    if (LOG) console.log(`Payer 2 plays : ${val2}`);
    if (getAreConditionsForASubGame(player1, val1, player2, val2)) {
      if (LOG) console.log(`sub game !`);
      const subPlayer1 = player1.slice(0, val1);
      const subPlayer2 = player2.slice(0, val2);
      gamecount.push(true);
      const winner = doAllRoundsWithSubGame(subPlayer1, subPlayer2, gamecount);
      if (LOG)
        console.log(
          `subgame round ${round} (Game ${game}) : winner = ${winner}`
        );
      if (winner === Winner.ONE) {
        player1.push(val1, val2);
      } else {
        player2.push(val2, val1);
      }
    } else if (val1 > val2) {
      if (LOG) console.log(`${val1} / ${val2} : player 1 win !`);
      player1.push(val1, val2);
    } else {
      if (LOG) console.log(`${val1} / ${val2} : player 2 win !`);
      player2.push(val2, val1);
    }
    if (areDecksBothAlreadySeen(player1, player2, oldPlayer1, oldPlayer2)) {
      if (LOG) console.log(`RECURSIVITY : player 1 win !`);
      return Winner.ONE;
    }
    round++;
  }
  return player1.length > 0 ? Winner.ONE : Winner.TWO;
}

export function solvePart2(filename: string): number {
  const { player1, player2 } = readPlayers(filename);
  const winner = doAllRoundsWithSubGame(player1, player2);
  return calculateScoreOfWinner(winner === Winner.ONE ? player1 : player2);
}

if (require.main === module) {
  console.log(
    "Day22 - Part 1 : answer is : " + solvePart1("day22/data/mydata")
  );
  console.log(
    "Day22 - Part 2 : answer is : " + solvePart2("day22/data/mydata")
  );
}
