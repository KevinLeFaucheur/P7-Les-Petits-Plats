/* 
 * Search functions for main bar and toggling tags
 * Narrowing the recipe Ids to display
*/
import { recipes } from '/data/recipes.js';
import { searchTags } from './index.js'; 

// Going through each tag, user entry included
export const searchByTags = (recipeIds) => {
  let narrowedIds = [...recipeIds];

  for(let tag of searchTags) {
    narrowedIds = narrowIdsByTag(tag.tag, tag.tagType, narrowedIds);
  }
  return narrowedIds;
};

// Reduce the recipe Ids given by single tag
export const narrowIdsByTag = (tag, tagType, currentIds) => {
  let narrowedIds = [];

  let recipe;
  for (let id of currentIds) {

    for(let i of recipes) {

      if(i.id === id) {
        recipe = i;

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

        break;
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

  for(let i in ingredientArray) {
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
  let ustensilArray = recipe.ustensils;

  for(let i in ustensilArray) {
    if(isIncluded(ustensilArray[i], tag)) 
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

//// - - - - - -

// List of words of length >= 3 removed
const removedWords = ['les','des','aux','dans','une','par'];

// Obsoloete
export const search = (searchEntry, searchKeywords) => {

  // split words of length >= 3 
  let splitEntries = searchEntry.match(/[\w]{3,}/ig) ?? [];

  // Normalize

  // Remove banned words
  if(splitEntries != null) {
    splitEntries.forEach(entry => {
      if(removedWords.includes(entry)) {
        splitEntries.splice(splitEntries.indexOf(entry), 1);
      }
    });
  }

  // Push into all tags
  let searchEntries = [...splitEntries, ...searchKeywords.map(x => x.tag) ];
  console.log(`Searching for ${searchEntries}`);

  // TODO: search with mutliple words
  return recipes.reduce((filteredRecipesIds, recipe) => {
    if(recipe.name.toLowerCase().includes(searchEntry) ||
       recipe.description.toLowerCase().includes(searchEntry) ||
       searchThroughRecipe(recipe, searchEntry)) 
    {
      filteredRecipesIds.push(recipe.id);
    }
    return filteredRecipesIds;
  }, []);
};