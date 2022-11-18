/* 
 * Search functions for main search input field and tags
 * Narrowing the current shown recipe IDs to display
*/
import { recipes } from '/data/recipes.js';
import { searchTags } from './index.js'; 

// Looping through each tag, main search input included
export const searchByTags = (recipeIds) => {
  let narrowedIds = [...recipeIds];

  for(let i = 0, n = searchTags.length; i < n; i++) {
    narrowedIds = narrowIdsByTag(searchTags[i].tag, searchTags[i].tagType, narrowedIds);
  }
  return narrowedIds;
};

/* Reduce the current recipe IDs given, by single tag
 * Each tag type has its own search through a recipe
 * Default case runs for the main search input field
*/
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
      }
    }
  }
  return narrowedIds;
};

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

const searchThroughAppliance = (recipe, tag) => {
  return isIncluded(recipe.appliance, tag);
};

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

const searchThroughRecipe = (recipe, tag) => {
  return (isIncluded(recipe.name, tag) ||
          isIncluded(recipe.description, tag) ||
          searchThroughIngredients(recipe, tag));
};

export const isIncluded = (entry, tag) => {
  return format(entry).includes(format(tag));
};

// Format string to lower case, unicode normalization, diacritics are replaced
const format = (word) => {
  return word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
};