import { readLinesFromInputFile } from "../utils";

type Player = number[];

function convertToPlayer(lines: string[]): Player {
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

function doAllRounds(player1: number[], player2: number[]) {
  while (player1.length > 0 && player2.length > 0) {
    const val1 = player1.shift();
    const val2 = player2.shift();
    if (val1 > val2) {
      player1.push(val1, val2);
    } else {
      player2.push(val2, val1);
    }
  }
  return player1.length > 0 ? 1 : 2;
}

function calculateScoreOfWinner(winner: number[]) {
  return winner
    .reverse()
    .reduce((acc, val, index) => acc + val * (index + 1), 0);
}

export function solvePart1(filename: string): number {
  const { player1, player2 } = readPlayers(filename);
  const winner = doAllRounds(player1, player2);
  return calculateScoreOfWinner(winner === 1 ? player1 : player2);
}
/*

WIP part 2

const oldPlayer1 = [];
const oldPlayer2 = [];

function alreadySeen(player: number[], oldPlayer: any[]) {
  for (const deck of oldPlayer) {
    if (deck == player) return true;
  }
  return false;
}

function areDecksAreAlreadySeen(player1: number[], player2: number[]) {
  console.log("areDecksAreAlreadySeen:");
  console.log({ player1 });
  console.log({ player2 });
  return alreadySeen(player1, oldPlayer1) && alreadySeen(player2, oldPlayer2);
}

function doAllRoundsWithSubPlay(player1: number[], player2: number[]) {
  let round = 1;
  while (player1.length > 0 && player2.length > 0) {
    const val1 = player1.shift();
    const val2 = player2.shift();
    if (player1.length >= val1 && player2.length >= val2) {
      console.log(`sub game !`);
      process.exit();
    }
    if (val1 > val2) {
      console.log(`${val1} / ${val2} : player 1 win !`);
      player1.push(val1, val2);
    } else {
      console.log(`${val1} / ${val2} : player 2 win !`);
      player2.push(val2, val1);
    }
    if (areDecksAreAlreadySeen(player1, player2)) {
      console.log(`RECURS !`);
      return;
    }
    oldPlayer1.push(player1);
    oldPlayer2.push(player2);
  }
}
 */

export function solvePart2(filename: string): number {
  const { player1, player2 } = readPlayers(filename);
  // doAllRoundsWithSubPlay(player1, player2);
  return 0;
}

if (require.main === module) {
  console.log(
    "Day22 - Part 1 : answer is : " + solvePart1("day22/data/mydata")
  );
  console.log(
    "Day22 - Part 2 : answer is : " + solvePart2("day22/data/mydata")
  );
}
