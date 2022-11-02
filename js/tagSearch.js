import { recipes } from '/data/recipes.js';

export const getIngredients = (filter) => {
  let filteredIngredients = [];

  recipes.filter(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if(ingredient.ingredient.toLowerCase().includes(filter)) {
        if(!filteredIngredients.includes(ingredient.ingredient.toLowerCase())) {
          filteredIngredients.push(ingredient.ingredient.toLowerCase());
        }
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
    case 'Ingrédients': return getIngredients(filter);
    case 'Appareils': return getAppliances(filter);
    case 'Ustensiles': return getUstensils(filter);
  }
};