import { readLinesFromInputFile } from "../utils";

type ActionType = "N" | "S" | "E" | "W" | "L" | "R" | "F";

class Action {
  action: ActionType;
  count: number;

  constructor(action: string, count: number) {
    this.action = action as ActionType;
    this.count = count;
  }

  toString() {
    return `Action(${this.action},${this.count})`;
  }
}

function readActions(filename: string) {
  return readLinesFromInputFile(filename)
    .filter((s) => s.length > 0)
    .map((line) => {
      const [, action, count] = line.match(/^(.)(\d+)$/);
      return new Action(action, parseInt(count));
    });
}

type NSEW = "E" | "S" | "W" | "N";

interface Position {
  northPosition: number;
  eastPosition: number;
}

interface PositionAndDirection {
  direction: NSEW;
  northPosition: number;
  eastPosition: number;
}

export function newDirection(
  direction: NSEW,
  rotation: "L" | "R",
  countDegrees: number
): NSEW {
  const directions = ["E", "S", "W", "N"];
  const count = countDegrees / 90;
  const currentDirectionIndex = directions.indexOf(direction);
  let newDirectionIndex =
    rotation == "R"
      ? currentDirectionIndex + count
      : currentDirectionIndex - count;
  if (newDirectionIndex < 0) newDirectionIndex += 4;
  return directions[newDirectionIndex % 4] as NSEW;
}

function movePart1<T extends Position | PositionAndDirection>(
  position: T,
  direction: NSEW,
  count: number
): T {
  switch (direction) {
    case "N":
      position.northPosition += count;
      break;
    case "S":
      position.northPosition -= count;
      break;
    case "E":
      position.eastPosition += count;
      break;
    case "W":
      position.eastPosition -= count;
      break;
  }
  return position;
}

function getManhattanDistance(finalPosition: Position | PositionAndDirection) {
  return (
    Math.abs(finalPosition.northPosition) + Math.abs(finalPosition.eastPosition)
  );
}

export function solvePart1(filename: string): number {
  const actions = readActions(filename);
  const startPosition: PositionAndDirection = {
    direction: "E",
    eastPosition: 0,
    northPosition: 0,
  };
  const finalPosition = actions.reduce((currentPosition, action) => {
    switch (action.action) {
      case "N":
      case "S":
      case "E":
      case "W":
        currentPosition = movePart1(
          currentPosition,
          action.action,
          action.count
        );
        break;
      case "R":
        currentPosition.direction = newDirection(
          currentPosition.direction,
          "R",
          action.count
        );
        break;
      case "L":
        currentPosition.direction = newDirection(
          currentPosition.direction,
          "L",
          action.count
        );
        break;
      case "F": {
        currentPosition = movePart1(
          currentPosition,
          currentPosition.direction,
          action.count
        );
      }
    }
    return currentPosition;
  }, startPosition);
  return getManhattanDistance(finalPosition);
}

export function rotateWaypointCount(
  wayPoint: Position,
  rotation: "L" | "R"
): Position {
  return {
    eastPosition: -wayPoint.northPosition * (rotation === "R" ? -1 : 1),
    northPosition: wayPoint.eastPosition * (rotation === "R" ? -1 : 1),
  };
}

function rotateWaypointDegrees(
  wayPoint: Position,
  rotation: "L" | "R",
  degrees: number
) {
  const count = degrees / 90;
  for (let i = 0; i < count; i++) {
    wayPoint = rotateWaypointCount(wayPoint, rotation);
  }
  return wayPoint;
}

function movePart2(
  currentPosition: Position,
  wayPoint: Position,
  count: number
): Position {
  return {
    eastPosition: currentPosition.eastPosition + wayPoint.eastPosition * count,
    northPosition:
      currentPosition.northPosition + wayPoint.northPosition * count,
  };
}

export function solvePart2(filename: string): number {
  let wayPoint: Position = {
    eastPosition: 10,
    northPosition: 1,
  };
  const startPosition: Position = {
    eastPosition: 0,
    northPosition: 0,
  };
  const actions = readActions(filename);
  const finalPosition = actions.reduce((currentPosition, action) => {
    switch (action.action) {
      case "N":
      case "S":
      case "E":
      case "W":
        wayPoint = movePart1(wayPoint, action.action, action.count);
        break;
      case "R":
        wayPoint = rotateWaypointDegrees(wayPoint, "R", action.count);
        break;
      case "L":
        wayPoint = rotateWaypointDegrees(wayPoint, "L", action.count);
        break;
      case "F": {
        currentPosition = movePart2(currentPosition, wayPoint, action.count);
      }
    }
    return currentPosition;
  }, startPosition);
  return getManhattanDistance(finalPosition);
}

if (require.main === module) {
  console.log(
    "Day12 - Part 1 : answer is : " + solvePart1("day12/data/mydata")
  );
  console.log(
    "Day12 - Part 2 : answer is : " + solvePart2("day12/data/mydata")
  );
}
