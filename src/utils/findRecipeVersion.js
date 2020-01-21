const findRecipeVersion = (recipe, versionNumber) => {
  // because we don't know what version number a recipe is at with urls that include latest
  // wee need to find it from the returned versions
  if (versionNumber === 'latest') {
    return { ...recipe.latest }
  } else {
    return {
      ...recipe.versions.find(v => v.version == versionNumber),
    }
  }
}

export { findRecipeVersion }
