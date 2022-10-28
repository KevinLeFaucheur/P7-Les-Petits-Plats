export const getRecipes = async () => {
  let response = await fetch('data/recipe.js');

  if(response.ok) {
    console.log(response.json());
  }
  else {
    console.error(response.status);
  }
};