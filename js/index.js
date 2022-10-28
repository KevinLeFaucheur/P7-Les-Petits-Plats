// import * as Data from './utils/data.js';
import { recipes } from '../data/recipes.js';
import { RecipeCard } from './templates/RecipeCard.js';
import { Select } from './templates/Select.js';

const displayRecipes = (recipes) => {
  for (let i = 0; i < 6; i++) {
    let recipe = new RecipeCard(recipes[i]).createRecipeCard();
    // console.log(recipes[i]);
    document.getElementById('recipes').appendChild(recipe);
  }
};

const displaySelectors = () => {
  const searchTags = document.getElementById('search__tags');
  let testTags = ['farine', 'oeuf', 'vanille', 'chocolat', 'coco'];

  ['Ingredients', 'Appareils', 'Ustensiles'].forEach(tagType => {
      let select = new Select(tagType, testTags).createSelect();
      searchTags.appendChild(select);
    }
  );

};

const initialize = () => {
  displaySelectors();
  displayRecipes(recipes);
};

initialize();