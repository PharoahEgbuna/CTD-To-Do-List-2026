export function isValidTodoTitle( title ) {
  let trimmedTitle = title.trim();

  //Validate the todo, check if lenght is greate rthan 0, less than 51, and not entirely composed of numbers. 
  if (trimmedTitle.length > 0 && trimmedTitle.length <= 50 && isNaN(trimmedTitle)) { return true }

  return false;
}