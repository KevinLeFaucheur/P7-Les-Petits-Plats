/*
 * Builds the select element, receives a tag type and tags array
*/
export class Select {

  constructor(tagType, tagsArray) {
    this.tagType = tagType;
    this.tagsArray = tagsArray;
    this.color = tagType === 'Ingredients' ? 'blue' : tagType === 'Ustensiles' ? 'red' : 'green';
  }

  createSelect = () => {

    const selectFragment =document.createRange().createContextualFragment(
      `
      <div class='select-box'>
        <div class="selected search__tag search__tag--${this.color}">
          <p>${this.tagType}</p>
        </div>

        <div class='select__tags select__tags--${this.color}'>
          ${this.createTagSelection()}
        </div>
      </div>`);

    const selected = selectFragment.querySelector('.selected');
    const selectTags = selectFragment.querySelector('.select__tags');

    selected.addEventListener('click', () => {
      
      selectTags.classList.toggle('active')
    });

    return selectFragment;

  };

  createTagSelection = () => {
    let tagSelection = '';

    this.tagsArray.forEach(tag => tagSelection += `<div class=''>${tag}</div>`);

    return tagSelection;
  };
}