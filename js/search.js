/* 
 * Search function
*/
import { recipes } from '/data/recipes.js';
import { searchTags } from './index.js'; 

// List of words of length >= 3 removed
const removedWords = ['les','des','aux','dans','une','par'];

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
       isEntryInIngredients(recipe.ingredients, searchEntry)) 
    {
      filteredRecipesIds.push(recipe.id);
    }
    return filteredRecipesIds;
  }, []);
};

const isEntryInIngredients = (ingredients, searchEntry) => {
  ingredients.forEach(ingredient => {
    return ingredient.ingredient.toLowerCase().includes(searchEntry);
  });
};

export const searchByTag = (tag, tagType, currentIds) => {
  let narrowedIds = [];

  currentIds.forEach(recipeId => {
    let index = recipes.findIndex(recipe => recipe.id === recipeId);

    switch(tagType) {
      case 'ingredients': 
        recipes[index].ingredients.forEach(ingredient => {
          if(ingredient.ingredient.toLowerCase().includes(tag)) {
            narrowedIds.push(recipes[index].id);
          }
        });
        break;
      case 'appliance': 
        if(recipes[index].appliance.toLowerCase().includes(tag)) {
          narrowedIds.push(recipes[index].id);
        } 
        break;
      case 'ustensils': 
        recipes[index].ustensils.forEach(ustensil => {
          if(ustensil.toLowerCase().includes(tag)) {
            narrowedIds.push(recipes[index].id);
          }
        });
        break;
      default: break; // TO DO add keyword search
    }
  }); 
  console.log(narrowedIds);
  return narrowedIds;
};

export const searchByTags = (recipeIds) => {
  console.log(recipeIds, searchTags);
  let newRecipeIds = [...recipeIds];

  searchTags.forEach(tag => {
    newRecipeIds = searchByTag(tag.tag, tag.tagType, newRecipeIds);
  });
  console.log(newRecipeIds);
  return newRecipeIds;
};