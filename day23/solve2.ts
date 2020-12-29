import { readLinesFromInputFile } from "../utils";

/**
 * Le principe pour cette 2e solution est d'avoir un tableau de number, l'index
 * d'une cellule représente le numéro de la cup, et le contenu représente l'index
 * de la cup suivante. Le premier élément du tableau, à l'index 0, représente la
 * cup courante
 *
 * Par exemple, la suite de cupe "3, 8, 9, 1, 2, 5, 4, 6, 7" sera représentée
 * comme suit :
 *             [3, 2, 5, 8, 6, 4, 7, 3, 9, 1]
 * N° de cup :     1  2  3  4  5  6  7  8  9
 * Cup courante : 3
 * La cellule i=3 vaut 8 : c'est la cup suivante : 8
 * La cellule i=8 vaut 9 : c'est la cup suivante : 9
 * ...
 * La cellule i=6 vaut 7 : c'est la cup suivante : 7
 * La cellule i=7 vaut 3 : on reboucle au départ sur la cup suivante : 3
 * etc...
 */
type CupsLinkedList = number[];

export function convertToCupsArray(cups: string): number[] {
  return cups.split("").map((s) => parseInt(s));
}

export function labelsAfter1(cups: CupsLinkedList): string {
  let res = "";
  let next = 1;
  do {
    next = cups[next];
    res += next.toString();
  } while (cups[next] !== 1);
  return res;
}

/**
 * La cup courante est indiqué à i=0 : cups[0]
 *
 * On doit mettre de côté les 3 cups suivantes :
 * cups[current], cups[cups[current]], et cups[cups[cups[current]]],
 *
 * La cup après celles prélevés est donc cups[pickedUp[2]] et doit être
 * stockée comme nouvelle cup après la cup courante
 *
 * On calcule la nouvelle destination en partant de "current-1", en excluant
 * les 3 cups mises de côté, et en restant entre "min" et "max"
 *
 * On note le N° de la cup XX où il faut insérer les cups mises de côté.
 * Puis on branche la nouvelle cup mise de côté après la destination, et
 * on rebranche également la cup XX après la 3 cup mise de côté
 *
 * Enfin, on stocke à i=0 la nouvelle cup courante qui est la suivante
 */
export function move(cups: CupsLinkedList, min = -1, max = -1) {
  if (min === -1) min = Math.min(...cups);
  if (max === -1) max = Math.max(...cups);
  const current = cups[0];
  const pickedUp = [
    cups[current],
    cups[cups[current]],
    cups[cups[cups[current]]],
  ];
  const afterPickedUp = cups[pickedUp[2]];
  cups[current] = afterPickedUp;
  let dest = current - 1;
  if (dest < min) {
    dest = max;
  }
  while (pickedUp.indexOf(dest) !== -1) {
    dest--;
    if (dest < min) {
      dest = max;
    }
  }
  const tmp = cups[dest];
  cups[dest] = pickedUp[0];
  cups[pickedUp[2]] = tmp;
  cups[0] = afterPickedUp;
  return cups;
}

export function doMoves(
  cups: CupsLinkedList,
  movesCount: number,
  min = -1,
  max = -1
) {
  for (let i = 1; i <= movesCount; i++) {
    if (i % 1000000 === 0) {
      console.log(`move ${(i * 100) / movesCount} %`);
    }
    cups = move(cups, min, max);
  }
  return cups;
}

export function convertToLinkedList(arr: number[]) {
  const cups: CupsLinkedList = new Array(arr.length + 1);
  let i = 0;
  for (const n of arr) {
    cups[i] = n;
    i = n;
  }
  cups[arr[arr.length - 1]] = cups[0];
  return cups;
}

export function fromLinkedList(cups: CupsLinkedList): number[] {
  const arr: number[] = new Array(cups.length - 1);
  let i = 0;
  const start = cups[0];
  let next = start;
  do {
    arr[i++] = next;
    next = cups[next];
  } while (next && next != start);
  return arr;
}

function fromLinkedListToStr(cups: CupsLinkedList): string {
  return fromLinkedList(cups)
    .map((n) => n.toString())
    .join(" ");
}

export function solvePart1(filename: string): string {
  const arr = convertToCupsArray(readLinesFromInputFile(filename)[0]);
  const cups = convertToLinkedList(arr);
  const cupsAfter100Moves = doMoves(cups, 100);
  return labelsAfter1(cupsAfter100Moves);
}

export function solvePart2(filename: string): number {
  const arr = convertToCupsArray(readLinesFromInputFile(filename)[0]);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  for (let i = max + 1; i <= 1000000; i++) {
    arr.push(i);
  }
  const cups = convertToLinkedList(arr);
  // Pour cette partie 2, on connais le max, et en plus, un "Math.max(...cups)"
  // échoue car tableau trop grand, donc on le précise ici
  const cupsAfterMoves = doMoves(cups, 10000000, min, 1000000);
  const v1 = cupsAfterMoves[1];
  const v2 = cupsAfterMoves[v1];
  return v1 * v2;
}

if (require.main === module) {
  console.log(
    "Day23 - Part 1 : answer is : " + solvePart1("day23/data/mydata")
  );
  console.log(
    "Day23 - Part 2 : answer is : " + solvePart2("day23/data/mydata")
  );
}
