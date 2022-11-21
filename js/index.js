/*
 * JavaScript entry point for the index.html page
*/
import { recipes } from '/data/recipes.js';
import { RecipeCard } from './templates/RecipeCard.js';
import { Select } from './templates/Select.js';
import { narrowIdsByTag, searchByTags } from './search.js';
import { narrowTagSelection } from './tagSearch.js';

export const searchTags = [];
export let currentlyShownRecipesIds = recipes.map(recipe => recipe.id);
export let recipeIds = [];

const searchInput = document.getElementById('search__input');

export const addSearchTag = (tag, tagType) => {
  searchTags.push( {'tag': tag, 'tagType': tagType } );
  recipeIds = narrowIdsByTag(tag, tagType, currentlyShownRecipesIds);
  updateRecipes(recipeIds);
  updateTags(narrowTagSelection(recipeIds));
};

export const removeSearchTag = (tag) => {
  searchTags.splice(searchTags.findIndex(item => item.tag === tag), 1);
  recipeIds = [...searchByTags(recipes.map(recipe => recipe.id))];
  updateRecipes(recipeIds);
  updateTags(narrowTagSelection(recipeIds));
};

export const updateRecipes = (recipeIds) => {
  document.getElementById('recipes').innerHTML = '';
  displayRecipes(recipeIds);
}

// Calls the RecipeCard constructor for each corresponding ID
const displayRecipes = (recipeIds = []) => {

  // Initially display all recipes
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

// Calls the Select constructor for each type of select
const displaySelectors = () => {
  const searchTags = document.getElementById('search__selects');

  ['ingredients', 'appliance', 'ustensils'].forEach(tagType => {
      let select = new Select(tagType).createSelect();
      searchTags.appendChild(select);
    }
  );
};

// Setup events for main search bar input field
const setupSearchBar = () => {
  searchInput.addEventListener('input', (event) => {
    let searchEntry = event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if(searchEntry === '') {
      searchTags.splice(searchTags.findIndex(tag => tag.tagType === ''), 1);
      let recipeIds = searchByTags([...recipes.map(recipe => recipe.id)]);
      updateRecipes(recipeIds);
      updateTags(narrowTagSelection(recipeIds));
    }

    if(searchEntry.length >= 3) {
      searchTags.splice(searchTags.findIndex(tag => tag.tagType === ''), 1);
      searchTags.push( {'tag': searchEntry, 'tagType': '' } );
      let recipeIds = searchByTags(currentlyShownRecipesIds);
      updateRecipes(recipeIds);
      updateTags(narrowTagSelection(recipeIds));
      // console.log((narrowTagSelection(recipeIds)));
    }
  });
};

/* Updates each tag to display block or none if tag is present or not
 * This updates tags for all 3 selectors
*/
const updateTags = (tagsArray) => {
  let ingredientTags = document.querySelectorAll('.select__tags--blue > li');
  let applianceTags = document.querySelectorAll('.select__tags--green > li');
  let ustensilTags = document.querySelectorAll('.select__tags--red > li');

  let pinnedTags = searchTags.map(tag => tag.tag);

  ingredientTags.forEach(li => {
    if(!tagsArray[0].includes(li.innerText) || pinnedTags.includes(li.innerText)) li.style.display = 'none';
    else li.style.display = 'block';
  });
  applianceTags.forEach(li => {
    if(!tagsArray[1].includes(li.innerText) || pinnedTags.includes(li.innerText)) li.style.display = 'none';
    else li.style.display = 'block';
  });
  ustensilTags.forEach(li => {
    if(!tagsArray[2].includes(li.innerText) || pinnedTags.includes(li.innerText)) li.style.display = 'none';
    else li.style.display = 'block';
  });
};

const initialize = () => {
  displaySelectors();
  displayRecipes(currentlyShownRecipesIds);
  setupSearchBar();
};

initialize();