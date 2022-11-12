import { recipes } from '/data/recipes.js';

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

export const getTagsByTypeAndFilter = (tagType, filter) => {
  switch(tagType) {
    case 'ingredients': return getIngredientTags().filter(ingredient => ingredient.includes(filter.toLowerCase()));
    case 'appliance': return getApplianceTags().filter(ingredient => ingredient.includes(filter.toLowerCase()));
    case 'ustensils': return getUstensilTags().filter(ingredient => ingredient.includes(filter.toLowerCase()));
  }
};

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