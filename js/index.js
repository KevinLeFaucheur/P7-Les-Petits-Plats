// import * as Data from './utils/data.js';
import { recipes } from '/data/recipes.js';
// import { Keyword } from './templates/Keyword.js';
import { RecipeCard } from './templates/RecipeCard.js';
import { Select } from './templates/Select.js';
import { search, searchByTag, searchByTags } from './search.js';

export const searchTags = [];
export let currentlyShownRecipesIds = recipes.map(recipe => recipe.id);
export let recipeIds = [];

const searchInput = document.getElementById('search__input');

export const addSearchKeyword = (tag, tagType) => {
  searchTags.push( {'tag': tag, 'tagType': tagType } );
  recipeIds = searchByTag(tag, tagType, currentlyShownRecipesIds);
  updateRecipes(recipeIds);
};

export const removeSearchKeyword = (tag) => {
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
  document.getElementById('search__tags').innerHTML = '';
  displaySelectors(updatedTags);
}

const displaySelectors = () => {
  const searchTags = document.getElementById('search__tags');

  ['ingredients', 'appliance', 'ustensils'].forEach(tagType => {
      let select = new Select(tagType).createSelect();
      searchTags.appendChild(select);
    }
  );
};

const setupSearchBar = () => {
  searchInput.addEventListener('input', (event) => {
    let searchEntry = event.target.value;

    if(searchEntry.length >= 3 || searchEntry === '') {
      let recipeIds = search(searchEntry, searchTags);
      updateRecipes(recipeIds);
    }
  });
};

// const displayKeywords = () => {
//   const searchTags = document.getElementById('search__keywords');
//   [['choco', 'Ingrédients'], 
//    ['four', 'Appareils'], 
//    ['couteau', 'Ustensiles']
//   ].forEach(element => {
//     let keyword = new Keyword(element[0], element[1]).createKeyword();
//     searchTags.appendChild(keyword);
//   });
// };

const initialize = () => {
  displaySelectors();
  // displayKeywords();
  displayRecipes(currentlyShownRecipesIds);
  setupSearchBar();
};

initialize();