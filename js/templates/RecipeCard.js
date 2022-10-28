/* 
 * Constructor for a recipe card, receives a recipe object
*/
export class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  createRecipeCard() {
    const recipeCardFragment = document.createRange().createContextualFragment(
      `<div id="${this.recipe.id}" class="recipe__card">
        <div class="recipe__image">
        </div>
        <div class="recipe__body">
          <div class="recipe__header">
            <h2>${this.recipe.name}</h2>
            <p><i class="recipe__icon fa-regular fa-clock"></i>${this.recipe.time} min</p>
          </div>
          <div class="recipe__subbody">
            <div class="recipe__ingredients">
              <ul>
                ${this.createIngredientList()}
              </ul>                
            </div>
            <div class="recipe__description">
              ${this.recipe.description}
            </div>
          </div>
        </div>
      </div>`);

    return recipeCardFragment;
  }

  // TODO: check if ingredients.quantity / ingredients.unit are undefined
  createIngredientList = () => {
    let ingredientList = '';
    this.recipe.ingredients.forEach( i => {
      ingredientList += `<li><p class="recipe__ingredients--name">${i.ingredient}:&nbsp;</p>`;

      if(i.quantity != undefined) {
        ingredientList += `<p class="recipe__ingredients--quantity">${i.quantity}`;
      }

      if(i.unit != undefined) {
        switch(i.unit) {
          case 'grammes': ingredientList += `g</p>`; break;
          case 'cuillères à soupe': ingredientList += ` cuillères</p>`; break;
          default: ingredientList += `${i.unit}</p>`;
        }
      }

      ingredientList += `</li>`;
    });
    return ingredientList;
  }
}