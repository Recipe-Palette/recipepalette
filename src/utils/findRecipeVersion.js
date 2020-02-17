const findRecipeVersion = (versions, latestVersion, versionNumber) => {
  // because we don't know what version number a recipe is at with urls that include latest
  // we need to find it from the returned versions
  if (versionNumber === 'latest') {
    return { ...latestVersion }
  } else if (versions) {
    return {
      ...versions.find(v => v.version == versionNumber),
    }
  } else {
    console.error('failed to find the proper recipe version')
    return {}
  }
}

export { findRecipeVersion }
