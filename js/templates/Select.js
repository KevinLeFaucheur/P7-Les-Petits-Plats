/*
 * Builds the select element, receives a tag type and tags array
*/
import { getTagsByTypeAndFilter } from "../search.js";
import { currentKeywords } from "../index.js";
import { Keyword } from "./Keyword.js";

export class Select {

  constructor(tagType) {
    this.tagType = tagType;
    this.tagsArray = getTagsByTypeAndFilter(tagType, '');
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
        </ul>
      </div>`);

    const select = selectFragment.querySelector('.select');
    const selectInput = selectFragment.querySelector('.select__input');

    select.querySelector('.select__tags').appendChild(this.createTagSelection(this.tagsArray));

    selectInput.addEventListener('focus', () => {
      selectInput.placeholder = `Recherche un ${this.placeholder}`;
      select.classList.add('active');
    });

    selectInput.addEventListener('focusout', () => {
      selectInput.placeholder = `${this.tagType}`;
      selectInput.value = '';
      setTimeout(() => select.classList.remove('active'), 50);
    });

    selectInput.addEventListener('input', (event) => {
      /*if(event.target.value.length >= 3)*/ this.searchTag(event.target.value);
    });

    return selectFragment;
  };

  createTagSelection = (tagsArray) => {
    let tagSelectionFragment = new DocumentFragment();

    tagsArray.forEach(tag => {
      let tagFragment = document.createRange().createContextualFragment(`<li class='select__tag'>${tag}</li>`);

      tagSelectionFragment.append(tagFragment);
    });

    tagSelectionFragment.querySelectorAll('.select__tag').forEach((element, index) => {
      element.addEventListener('mousedown', () => {
        console.log(`Adding ${tagsArray[index]} to keywords`); // Debug console
        document.getElementById('search__keywords').appendChild(new Keyword(tagsArray[index], this.tagType).createKeyword());
        currentKeywords.push(tagsArray[index]);
        tagsArray.splice(index, 1);
        this.updateTagSelection(tagsArray);
      });
    });

    return tagSelectionFragment;
  };

  updateTagSelection = (filteredTags) => {
    let selectTags = document.querySelector(`.select__tags--${this.color}`);
    selectTags.innerHTML = '';
    selectTags.appendChild(this.createTagSelection(filteredTags));
  };

  searchTag = (filter) => {
    let filteredIngredients = getTagsByTypeAndFilter(this.tagType, filter);
    console.log(filteredIngredients); // Debug console
    this.updateTagSelection(filteredIngredients);
  };
}