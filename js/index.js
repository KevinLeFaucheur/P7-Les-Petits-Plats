// import * as Data from './utils/data.js';
import { recipes } from '/data/recipes.js';
import { Keyword } from './templates/Keyword.js';
import { RecipeCard } from './templates/RecipeCard.js';
import { Select } from './templates/Select.js';

const debugTags = ['farine', 'oeuf', 'vanille', 'chocolat', 'coco',
'farine', 'oeuf', 'vanille', 'chocolat', 'coco',
'farine', 'oeuf', 'vanille', 'chocolat', 'coco',
'farine', 'oeuf', 'vanille', 'chocolat', 'coco',
'farine', 'oeuf', 'vanille', 'chocolat', 'coco',
'farine', 'oeuf', 'vanille', 'chocolat', 'coco'];

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

const displaySelectors = (tags) => {
  const searchTags = document.getElementById('search__tags');

  ['Ingrédients', 'Appareils', 'Ustensiles'].forEach(tagType => {
      let select = new Select(tagType, tags).createSelect();
      searchTags.appendChild(select);
    }
  );
};

const displayKeywords = () => {
  const searchKeywords = document.getElementById('search__keywords');

  [['choco', 'Ingrédients'], 
   ['four', 'Appareils'], 
   ['couteau', 'Ustensiles']
  ].forEach(element => {
    let keyword = new Keyword(element[0], element[1]).createKeyword();
    searchKeywords.appendChild(keyword);
  });
};

const initialize = () => {
  displaySelectors(debugTags);
  // displayKeywords();
  displayRecipes(recipes);
};

initialize();