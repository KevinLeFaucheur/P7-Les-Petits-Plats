/* 
 * Search functions for main bar and toggling tags
 * Narrowing the recipe Ids to display
*/
import { recipes } from '/data/recipes.js';
import { searchTags } from './index.js'; 

// Going through each tag, user entry included
export const searchByTags = (recipeIds) => {
  let narrowedIds = [...recipeIds];

  searchTags.forEach(tag => {
    narrowedIds = narrowIdsByTag(tag.tag, tag.tagType, narrowedIds);
  });
  return narrowedIds;
};

// Reduce the recipe Ids given by single tag
export const narrowIdsByTag = (tag, tagType, currentIds) => {
  let narrowedIds = [];

  currentIds.forEach(currentId => {
    let recipe = recipes.find(recipe => recipe.id === currentId);

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
  }); 
  console.log(`Looking for ${tag} -> ${tagType}`);
  console.log(currentIds);
  console.log(narrowedIds);
  console.log(recipes.filter(recipe => narrowedIds.includes(recipe.id)));
  return narrowedIds;
};

// 
const searchThroughIngredients = (recipe, tag) => {
  return recipe.ingredients
          .map(item => item.ingredient)
          .some(ingredient => ingredient
                                .toLowerCase()
                                .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                                .includes(tag));
};

// 
const searchThroughAppliance = (recipe, tag) => {
  return recipe.appliance.toLowerCase().includes(tag);
};

// 
const searchThroughUstensils = (recipe, tag) => {
  return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag) );
};

// 
const searchThroughRecipe = (recipe, tag) => {
  return (recipe.name.toLowerCase().includes(tag) ||
    recipe.description.toLowerCase().includes(tag) ||
    searchThroughIngredients(recipe, tag));
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