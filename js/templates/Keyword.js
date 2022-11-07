/*
 * Constructor for a keyword element, receives name and type
*/
import { removeSearchKeyword } from "../index.js";

export class Keyword {

  constructor(keywordName, keywordType, keywordId) {
    this.keywordName = keywordName;
    this.keywordType = keywordType;
    this.keywordId = keywordId;
    this.color = keywordType === 'ingredients' ? 'blue' : keywordType === 'ustensils' ? 'red' : 'green';
  }

  createKeyword = () => {

    const keywordFragment = document.createRange().createContextualFragment(
      `
      <div class="search__keyword search__keyword--${this.color}">
        <p>${this.keywordName}</p><i class="close fa-regular fa-circle-xmark"></i>
      </div>`);

    keywordFragment
      .querySelector('.close')
      .addEventListener('click', (event) => {
        event.target.parentElement.remove();
        removeSearchKeyword(this.keywordName, this.keywordType);
        document.getElementById(this.keywordId).style.display = 'block';
    });

    return keywordFragment;
  };
}