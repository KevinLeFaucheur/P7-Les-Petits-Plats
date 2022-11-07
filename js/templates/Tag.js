/*
 * Constructor for a tag element, receives name and type
*/
import { removeSearchTag } from "../index.js";

export class Tag {

  constructor(tagName, tagType, tagId) {
    this.tagName = tagName;
    this.tagType = tagType;
    this.tagId = tagId;
    this.color = tagType === 'ingredients' ? 'blue' : tagType === 'ustensils' ? 'red' : 'green';
  }

  createTag = () => {

    const tagFragment = document.createRange().createContextualFragment(
      `
      <div class="search__tag search__tag--${this.color}">
        <p>${this.tagName}</p><i class="close fa-regular fa-circle-xmark"></i>
      </div>`);

    tagFragment
      .querySelector('.close')
      .addEventListener('click', (event) => {
        event.target.parentElement.remove();
        removeSearchTag(this.tagName, this.tagType);
        document.getElementById(this.tagId).style.display = 'block';
    });

    return tagFragment;
  };
}