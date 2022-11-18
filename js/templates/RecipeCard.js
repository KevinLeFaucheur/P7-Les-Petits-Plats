/* 
 * Constructor for a recipe card, receives a recipe object
 * Builds a document fragment to append
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

  createIngredientList = () => {
    let ingredientList = '';
    this.recipe.ingredients.forEach(item => {
      ingredientList += `<li><p class="recipe__ingredients--name">${item.ingredient}:&nbsp;</p>`;

      if(item.quantity != undefined) {
        ingredientList += `<p class="recipe__ingredients--quantity">${item.quantity}`;
      }

      if(item.unit != undefined) {
        switch(item.unit) {
          case 'grammes': ingredientList += `g</p>`; break;
          case 'cuillères à soupe': ingredientList += ` cuillères</p>`; break;
          default: ingredientList += `${item.unit}</p>`;
        }
      }

      ingredientList += `</li>`;
    });
    return ingredientList;
  }
}