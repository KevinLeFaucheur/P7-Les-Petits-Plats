/* 
 * Search function
*/
import { recipes } from '/data/recipes.js';

export const search = (searchEntry) => {
  console.log(`Searching for ${searchEntry}`);

  return recipes.reduce((filteredRecipes, recipe) => {
    if(recipe.name.toLowerCase().includes(searchEntry) ||
       recipe.description.toLowerCase().includes(searchEntry) ||
       isEntryInIngredients(recipe.ingredients, searchEntry)) 
    {
      filteredRecipes.push(recipe.id);
    }
    return filteredRecipes;
  }, []);
}

const isEntryInIngredients = (ingredients, searchEntry) => {
  ingredients.forEach(ingredient => {
    return ingredient.ingredient.toLowerCase().includes(searchEntry);
  });
};