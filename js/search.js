export const getIngredients = (filter, recipes) => {
  let filteredIngredients = [];

  recipes.filter(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if(ingredient.ingredient.toLowerCase().includes(filter)) {
        if(!filteredIngredients.includes(ingredient.ingredient.toLowerCase())) {
          filteredIngredients.push(ingredient.ingredient.toLowerCase());
        }
      }
    });
  });

  return filteredIngredients;
};