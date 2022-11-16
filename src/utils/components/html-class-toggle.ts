export function toggleHtmlClass(classesList: string[], className: string) {
  if (classesList.includes(className)) {
    classesList = classesList.filter((item) => item !== className);
  } else {
    classesList = [...classesList, className];
  }
}
