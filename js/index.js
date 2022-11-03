// import * as Data from './utils/data.js';
import { recipes } from '/data/recipes.js';
// import { Keyword } from './templates/Keyword.js';
import { RecipeCard } from './templates/RecipeCard.js';
import { Select } from './templates/Select.js';
import { search } from './search.js';

const searchKeywords = [];
const searchInput = document.getElementById('search__input');

export const addSearchKeyword = (keyword) => {
  searchKeywords.push(keyword);
};

export const removeSearchKeyword = (keyword) => {
  searchKeywords.splice(searchKeywords.indexOf(keyword), 1);
};

export const updateRecipes = () => {
  document.getElementById('recipes').innerHTML = '';
  displayRecipes(recipes);
}

const displayRecipes = (recipes) => {
  for (let i = 0; i < 6; i++) {
    let recipe = new RecipeCard(recipes[i]).createRecipeCard();
    document.getElementById('recipes').appendChild(recipe);
  }
};

export const updateSelectors = (updatedTags) => {
  document.getElementById('search__tags').innerHTML = '';
  displaySelectors(updatedTags);
}

const displaySelectors = () => {
  const searchTags = document.getElementById('search__tags');

  ['Ingrédients', 'Appareils', 'Ustensiles'].forEach(tagType => {
      let select = new Select(tagType).createSelect();
      searchTags.appendChild(select);
    }
  );
};

const setupSearchBar = () => {
  searchInput.addEventListener('input', (event) => {
    let searchEntry = event.target.value;
    
    if(searchEntry.length >= 3 || searchEntry === '') {
      search(searchEntry);
    }
  });
};

// const displayKeywords = () => {
//   const searchKeywords = document.getElementById('search__keywords');
//   [['choco', 'Ingrédients'], 
//    ['four', 'Appareils'], 
//    ['couteau', 'Ustensiles']
//   ].forEach(element => {
//     let keyword = new Keyword(element[0], element[1]).createKeyword();
//     searchKeywords.appendChild(keyword);
//   });
// };

const initialize = () => {
  displaySelectors();
  // displayKeywords();
  displayRecipes(recipes);
  setupSearchBar();
};

initialize();