/*
 * Builds the select element, receives a tag type and tags array
*/
import { getTagsByTypeAndFilter } from "../tagSearch.js";
import { addSearchTag } from "../index.js";
import { Tag } from "./Tag.js";

export class Select {

  constructor(tagType) {
    this.tagType = tagType;
    this.tagsArray = getTagsByTypeAndFilter(tagType, '');
    this.color = tagType === 'ingredients' ? 'blue' : tagType === 'ustensils' ? 'red' : 'green';
    this.placeholder = tagType === 'ingredients' ? 'Ingrédients' : tagType === 'ustensils' ? 'Ustensiles' : 'Appareils';
  }

  createSelect = () => {

    const selectFragment = document.createRange().createContextualFragment(
      `
      <div class='select'>
        <input class='select__input select__input--${this.color}' placeholder='${this.placeholder}'>
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
      selectInput.placeholder = `${this.placeholder}`;
      // setTimeout because race condition with mousedown
      setTimeout(() => select.classList.remove('active'), 50); 
    });

    selectInput.addEventListener('input', (event) => this.searchTag(event.target.value));

    return selectFragment;
  };

  // Builds a list of tags from a given array
  createTagSelection = (tagsArray) => {
    let tagSelectionFragment = new DocumentFragment();

    tagsArray.forEach(tag => {
      let tagId = `${this.tagType}--${tagsArray.indexOf(tag)}`;
      let tagFragment = document.createRange().createContextualFragment(`<li id='${tagId}' class='select__tag'>${tag}</li>`);

      tagSelectionFragment.append(tagFragment);
    });

    tagSelectionFragment.querySelectorAll('.select__tag').forEach((element, index) => {
      let tagId = `${this.tagType}--${index}`;
      element.addEventListener('mousedown', () => {
        document.getElementById('search__tags').appendChild(new Tag(tagsArray[index], this.tagType, tagId).createTag());
        addSearchTag(tagsArray[index], this.tagType);
        document.getElementById(tagId).style.display = 'none';
      });
    });

    return tagSelectionFragment;
  };

  // Updates each tag to display block or none if tag is present or not
  updateTagSelection = (filteredTags) => {    
    let selectTags = document.querySelectorAll(`.select__tags--${this.color} > li`);
    selectTags.forEach(li => {
      if(!filteredTags.includes(li.innerText)) li.style.display = 'none';
      else li.style.display = 'block';
    });
  };

  searchTag = (filter) => {
    let filteredIngredients = getTagsByTypeAndFilter(this.tagType, filter);
    this.updateTagSelection(filteredIngredients);
  };
}