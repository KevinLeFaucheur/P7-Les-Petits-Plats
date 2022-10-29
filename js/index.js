// import * as Data from './utils/data.js';
import { recipes } from '../data/recipes.js';
import { Keyword } from './templates/Keyword.js';
import { RecipeCard } from './templates/RecipeCard.js';
import { Select } from './templates/Select.js';

const displayRecipes = (recipes) => {
  for (let i = 0; i < 6; i++) {
    let recipe = new RecipeCard(recipes[i]).createRecipeCard();
    document.getElementById('recipes').appendChild(recipe);
  }
};

const displaySelectors = () => {
  const searchTags = document.getElementById('search__tags');
  let testTags = ['farine', 'oeuf', 'vanille', 'chocolat', 'coco',
                  'farine', 'oeuf', 'vanille', 'chocolat', 'coco',
                  'farine', 'oeuf', 'vanille', 'chocolat', 'coco',
                  'farine', 'oeuf', 'vanille', 'chocolat', 'coco',
                  'farine', 'oeuf', 'vanille', 'chocolat', 'coco',
                  'farine', 'oeuf', 'vanille', 'chocolat', 'coco'];

  ['Ingrédients', 'Appareils', 'Ustensiles'].forEach(tagType => {
      let select = new Select(tagType, testTags).createSelect();
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
  displaySelectors();
  displayKeywords();
  displayRecipes(recipes);
};

initialize();