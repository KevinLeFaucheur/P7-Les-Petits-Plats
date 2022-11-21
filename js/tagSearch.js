import { recipes } from '/data/recipes.js';
import { isIncluded } from './search.js';

export const getIngredientTags = () => {
  let filteredIngredients = [];

  recipes.filter(recipe => {
    recipe.ingredients.forEach(ingredient => {
      pushTagIntoArray(ingredient.ingredient, filteredIngredients);
    });
  });
  return filteredIngredients;
};

export const getApplianceTags = () => {
  let filteredAppliances = [];

  recipes.filter(recipe => {
    pushTagIntoArray(recipe.appliance, filteredAppliances);
  });
  return filteredAppliances;
};

export const getUstensilTags = () => {
  let filteredUstensils = [];

  recipes.filter(recipe => {
    recipe.ustensils.forEach(ustensil => {
      pushTagIntoArray(ustensil, filteredUstensils);
    });
  });
  return filteredUstensils;
};

/* Filters tags from all available, by a received filter
*  Each tag type has its own getter
*/
export const getTagsByTypeAndFilter = (tagType, filter) => {
  switch(tagType) {
    case 'ingredients': return getIngredientTags().filter(ingredient => isIncluded(ingredient, filter));
    case 'appliance': return getApplianceTags().filter(appliance => isIncluded(appliance, filter));
    case 'ustensils': return getUstensilTags().filter(ustensil => isIncluded(ustensil, filter));
  }
};

/* Receives array of current recipe IDs, and get tags from recipes.
 * Returns tags filtered into 3 arrays .
*/
export const narrowTagSelection = (recipeIds) => {
  let filteredRecipes = recipes.filter(recipe => recipeIds.includes(recipe.id));

  let filteredApplianceTags = [];
  let filteredUstensilTags = [];
  let filteredIngredientTags = [];

  filteredRecipes.forEach(recipe => {
    pushTagIntoArray(recipe.appliance, filteredApplianceTags);

    recipe.ustensils.forEach(ustensil => {
      pushTagIntoArray(ustensil, filteredUstensilTags);
    });

    recipe.ingredients.forEach(ingredient => {
      pushTagIntoArray(ingredient.ingredient, filteredIngredientTags);
    });
  });
  return [filteredIngredientTags, filteredApplianceTags, filteredUstensilTags];
};

const pushTagIntoArray = (tag, array) => {
  let newTag = tag.toLowerCase();
  if(!array.includes(newTag)) {
    array.push(newTag);
  }
};