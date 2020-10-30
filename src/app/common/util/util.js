// any random funciton that dont belong anywhere else
// that we can apply to anywhere in our app is added here

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

