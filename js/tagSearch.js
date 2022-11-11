import { recipes } from '/data/recipes.js';

export const getIngredients = (filter) => {
  let filteredIngredients = [];

  recipes.filter(recipe => {
    recipe.ingredients.forEach(ingredient => {
      let recipeIngredient = ingredient.ingredient.toLowerCase();
      
      if(recipeIngredient.includes(filter) && !filteredIngredients.includes(recipeIngredient)) {
        filteredIngredients.push(recipeIngredient);
      }
    });
  });
  return filteredIngredients;
};

export const getAppliances = (filter) => {
  let filteredAppliances = [];

  recipes.filter(recipe => {
    let recipeAppliance = recipe.appliance.toLowerCase();

    if(recipeAppliance.includes(filter) && !filteredAppliances.includes(recipeAppliance)) {
      filteredAppliances.push(recipeAppliance);
    }
  });
  return filteredAppliances;
};

export const getUstensils = (filter) => {
  let filteredUstensils = [];

  recipes.filter(recipe => {
    recipe.ustensils.forEach(ustensil => {
      let recipeUstensil = ustensil.toLowerCase();

      if(recipeUstensil.includes(filter) && !filteredUstensils.includes(recipeUstensil)) {
        filteredUstensils.push(recipeUstensil);
      }
    });
  });
  return filteredUstensils;
};

export const getTagsByTypeAndFilter = (tagType, filter) => {
  switch(tagType) {
    case 'ingredients': return getIngredients(filter);
    case 'appliance': return getAppliances(filter);
    case 'ustensils': return getUstensils(filter);
  }
};

export const narrowTagSelection = (recipeIds) => {
  let filteredRecipes = recipes.filter(recipe => recipeIds.includes(recipe.id));

  let filteredApplianceTags = [];
  let filteredUstensilTags = [];
  let filteredIngredientTags = [];

  filteredRecipes.forEach(recipe => {
    if(!filteredApplianceTags.includes(recipe.appliance.toLowerCase())) {
      filteredApplianceTags.push(recipe.appliance.toLowerCase());
    }
    recipe.ustensils.forEach(ustensil => {
      let recipeUstensil = ustensil.toLowerCase();

      if(!filteredUstensilTags.includes(recipeUstensil)) {
        filteredUstensilTags.push(recipeUstensil);
      }
    });
    recipe.ingredients.forEach(ingredient => {
      let recipeIngredient = ingredient.ingredient.toLowerCase();
      
      if(!filteredIngredientTags.includes(recipeIngredient)) {
        filteredIngredientTags.push(recipeIngredient);
      }
    });
  });
  return [filteredIngredientTags, filteredApplianceTags, filteredUstensilTags];
};