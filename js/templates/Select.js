/*
 * Builds the select element, receives a tag type and tags array
*/
import { getIngredients } from "../search.js";
import { recipes } from '/data/recipes.js';
import { updateSelectors } from '../index.js';

export class Select {

  constructor(tagType, tagsArray) {
    this.tagType = tagType;
    this.tagsArray = tagsArray;
    this.color = tagType === 'Ingrédients' ? 'blue' : tagType === 'Ustensiles' ? 'red' : 'green';
    this.placeholder = tagType === 'Ingrédients' ? 'ingrédient' : tagType === 'Ustensiles' ? 'ustensile' : 'appareil';
  }

  createSelect = () => {

    const selectFragment = document.createRange().createContextualFragment(
      `
      <div class='select'>
        <input class='select__input select__input--${this.color}' placeholder='${this.tagType}'>
        <i class="select__icon fa-sharp fa-solid fa-angle-down"></i>

        <ul class='select__tags select__tags--${this.color}'>
          ${this.createTagSelection(this.tagsArray)}
        </ul>
      </div>`);

    const select = selectFragment.querySelector('.select');
    const selectInput = selectFragment.querySelector('.select__input');

    selectInput.addEventListener('focus', () => {
      selectInput.placeholder = `Recherche un ${this.placeholder}`;
      select.classList.add('active');
    });

    selectInput.addEventListener('focusout', () => {
      selectInput.placeholder = `${this.tagType}`;
      selectInput.value = '';
      select.classList.remove('active');
    });

    selectInput.addEventListener('input', (event) => {
      if(event.target.value.length >= 3) this.searchTag(event.target.value);
    });

    return selectFragment;
  };

  createTagSelection = (tagsArray) => {
    let tagSelection = '';

    tagsArray.forEach(tag => tagSelection += `<li class='select__tag'>${tag}</li>`);

    return tagSelection;
  };

  updateTagSelection = (filteredTags) => {
    let selectTags = document.querySelector(`.select__tags--${this.color}`);

    selectTags.innerHTML = '' + this.createTagSelection(filteredTags);
  };

  searchTag = (string) => {
    let filteredIngredients = getIngredients(string, recipes);
    console.log(filteredIngredients);
    this.updateTagSelection(filteredIngredients);
  };
}