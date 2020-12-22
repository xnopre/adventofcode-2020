import { readLinesFromInputFile } from "../utils";

type Ingredient = string;

type Allergen = string;

interface Food {
  ingredients: Ingredient[];
  allergens: Allergen[];
}
export function solvePart1(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  const foods: Food[] = lines.map((line) => {
    const [, ingredientsStr, allergensStr] = line.match(
      /^(.+)\(contains (.+)\)$/
    );
    return {
      ingredients: ingredientsStr.split(" "),
      allergens: allergensStr.split(", "),
    };
  });
  // console.log("foods=", JSON.stringify(foods, null, 2));
  const result: {
    [allergen: string]: Ingredient[];
  } = {};
  foods.forEach(({ ingredients, allergens }) => {
    for (const allergen of allergens) {
      if (result[allergen] === undefined) {
        result[allergen] = ingredients;
      } else {
        for (let i = result[allergen].length - 1; i > 0; i--) {
          if (ingredients.indexOf(result[allergen][i]) === -1) {
            result[allergen].splice(i, 1);
          }
        }
        // for (const ingredient of ingredients) {
        //   const index = result[allergen].indexOf(ingredient);
        //   if (index >= 0) {
        //     result[allergen].splice(index, 1);
        //   }
        // }
      }
    }
  });
  // console.log("result=", JSON.stringify(result, null, 2));
  return 0;
}

export function solvePart2(filename: string): number {
  return 0;
}

if (require.main === module) {
  console.log(
    "Day21 - Part 1 : answer is : " + solvePart1("day21/data/mydata")
  );
  console.log(
    "Day21 - Part 2 : answer is : " + solvePart2("day21/data/mydata")
  );
}
