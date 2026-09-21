export function isValidTodoTitle( title ) {
  let trimmedTitle = title.trim();

  if (trimmedTitle.length > 0 && trimmedTitle.length <= 50 && isNaN(trimmedTitle)) { return true }

  return false;
}