// any random funciton that dont belong anywhere else
// that we can apply to anywhere in our app is added here

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2); // Zero fill right shift operator to accomodate the possibility that a filename can be a filename
}
