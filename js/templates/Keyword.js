/*
 * Constructor for a keyword element, receives name and type
*/
export class Keyword {

  constructor(keywordName, keywordType) {
    this.keywordName = keywordName;
    this.keywordType = keywordType;
    this.color = keywordType === 'Ingrédients' ? 'blue' : keywordType === 'Ustensiles' ? 'red' : 'green';
  }

  createKeyword = () => {

    const keywordFragment = document.createRange().createContextualFragment(
      `
      <div class="search__keyword search__keyword--${this.color}">
        <p>${this.keywordName}</p><i class="close fa-regular fa-circle-xmark"></i>
      </div>`);

    keywordFragment
      .querySelector('.close')
      .addEventListener('click', (event) =>  
        event.target.parentElement.remove()
      );

    return keywordFragment;
  };
}