/* 
 * Search functions for main search input field and tags
 * Narrowing the current shown recipe IDs to display
*/
import { recipes } from '/data/recipes.js';
import { searchTags } from './index.js'; 

// Looping through each tag, main search input included
export const searchByTags = (recipeIds) => {
  let narrowedIds = [...recipeIds];

  searchTags.forEach(tag => {
    narrowedIds = narrowIdsByTag(tag.tag, tag.tagType, narrowedIds);
  });
  return narrowedIds;
};

/* Reduce the current recipe IDs given, by single tag
 * Each tag type has its own search through a recipe
 * Default case runs for the main search input field
*/
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

const searchThroughIngredients = (recipe, tag) => {
  return recipe.ingredients
          .map(item => item.ingredient)
          .some(ingredient => isIncluded(ingredient, tag));
};

const searchThroughAppliance = (recipe, tag) => {
  return isIncluded(recipe.appliance, tag);
};

const searchThroughUstensils = (recipe, tag) => {
  return recipe.ustensils.some(ustensil => isIncluded(ustensil, tag));
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