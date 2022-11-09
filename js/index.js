/*
 *
*/
import { recipes } from '/data/recipes.js';
import { RecipeCard } from './templates/RecipeCard.js';
import { Select } from './templates/Select.js';
import { narrowIdsByTag, searchByTags } from './search.js';

export const searchTags = [];
export let currentlyShownRecipesIds = recipes.map(recipe => recipe.id);
export let recipeIds = [];

const searchInput = document.getElementById('search__input');

export const addSearchTag = (tag, tagType) => {
  searchTags.push( {'tag': tag, 'tagType': tagType } );
  recipeIds = narrowIdsByTag(tag, tagType, currentlyShownRecipesIds);
  updateRecipes(recipeIds);
};

export const removeSearchTag = (tag) => {
  searchTags.splice(searchTags.findIndex(item => item.tag === tag), 1);
  recipeIds = [...searchByTags(recipes.map(recipe => recipe.id))];
  updateRecipes(recipeIds);
};

export const updateRecipes = (recipeIds) => {
  document.getElementById('recipes').innerHTML = '';
  displayRecipes(recipeIds);
}

const displayRecipes = (recipeIds = []) => {

  // Debug / Initial display
  if(recipeIds.length === 0) {

    let fragment = document.createRange().createContextualFragment(
    `Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.`);

    document.getElementById('recipes').appendChild(fragment);

  } else {

    recipes.forEach(recipe => {
      if(recipeIds.includes(recipe.id)) {
        let recipeCard = new RecipeCard(recipe).createRecipeCard();
        document.getElementById('recipes').appendChild(recipeCard);
      }
    });
    currentlyShownRecipesIds = [...recipeIds];
    recipeIds = [];
  }
};

export const updateSelectors = (updatedTags) => {
  document.getElementById('search__selects').innerHTML = '';
  displaySelectors(updatedTags);
}

const displaySelectors = () => {
  const searchTags = document.getElementById('search__selects');

  ['ingredients', 'appliance', 'ustensils'].forEach(tagType => {
      let select = new Select(tagType).createSelect();
      searchTags.appendChild(select);
    }
  );
};

const setupSearchBar = () => {
  searchInput.addEventListener('input', (event) => {
    let searchEntry = event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if(searchEntry === '') {
      let recipeIds = [...recipes.map(recipe => recipe.id)]; // TODO caching all ids
      updateRecipes(recipeIds);
    }

    if(searchEntry.length >= 3) {
      searchTags.push( {'tag': searchEntry, 'tagType': '' } );
      let recipeIds = searchByTags(currentlyShownRecipesIds);
      updateRecipes(recipeIds);
    }
  });
};

const initialize = () => {
  displaySelectors();
  displayRecipes(currentlyShownRecipesIds);
  setupSearchBar();
};

initialize();