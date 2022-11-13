/* 
 * Search functions for main bar and toggling tags
 * Narrowing the recipe Ids to display
*/
import { recipes } from '/data/recipes.js';
import { searchTags } from './index.js'; 

// Going through each tag, user entry included
export const searchByTags = (recipeIds) => {
  let narrowedIds = [...recipeIds];

  for(let i = 0, n = searchTags.length; i < n; i++) {
    narrowedIds = narrowIdsByTag(searchTags[i].tag, searchTags[i].tagType, narrowedIds);
  }
  return narrowedIds;
};

// Reduce the recipe Ids given by single tag
export const narrowIdsByTag = (tag, tagType, currentIds) => {
  let narrowedIds = [];

  let recipe;
  for (let i = 0, n = currentIds.length; i < n; i++) {

    for(let j = 0, m = recipes.length; i < m; j++) {

      if(recipes[j].id === currentIds[i]) {
        recipe = recipes[j];

        switch(tagType) {
          case 'ingredients': 
            if(searchThroughIngredients(recipe, tag)) narrowedIds.push(recipe.id);
            break;
          case 'appliance': 
            if(searchThroughAppliance(recipe, tag)) narrowedIds.push(recipe.id);
            break;
          case 'ustensils': 
          if(searchThroughUstensils(recipe, tag)) narrowedIds.push(recipe.id);
            break;
          default: 
            if(searchThroughRecipe(recipe, tag)) narrowedIds.push(recipe.id);
        } 
        // break;
      }
    }
  }

  console.log(`Looking for ${tag} -> ${tagType}`);
  console.log(currentIds);
  console.log(narrowedIds);
  console.log(recipes.filter(recipe => narrowedIds.includes(recipe.id)));
  return narrowedIds;
};

// 
const searchThroughIngredients = (recipe, tag) => {
  let ingredientArray = recipe.ingredients;

  for(let i = 0, n = ingredientArray.length; i < n; i++) {
    if(isIncluded(ingredientArray[i].ingredient, tag)) 
    {
      return true;
    }
  }
  return false;
};

// 
const searchThroughAppliance = (recipe, tag) => {
  return isIncluded(recipe.appliance, tag);
};

// 
const searchThroughUstensils = (recipe, tag) => {
  let ustensils = recipe.ustensils;

  for(let i = 0, n = ustensils.length; i < n; i++) {
    if(isIncluded(ustensils[i], tag))
    {
      return true;
    }
  }
  return false;
};

// 
const searchThroughRecipe = (recipe, tag) => {
  return (isIncluded(recipe.name, tag) ||
          isIncluded(recipe.description, tag) ||
          searchThroughIngredients(recipe, tag));
};

const isIncluded = (entry, tag) => {
  return entry.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(tag);
};