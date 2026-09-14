export function isValidTodoTitle( title ) {
  let trimmedTitle = title.trim();

  //Ensure the todo length is greater than 0, less than 20, and not entirely composed of numbers. 
  if (trimmedTitle.length > 0 && trimmedTitle.length <= 20 && isNaN(trimmedTitle)) { return true }

  return false;
}