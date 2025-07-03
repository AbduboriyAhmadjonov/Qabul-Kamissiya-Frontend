export default function lowercaseRoles(str) {
  if (str.length === 0) {
    return ''; // Handle empty string case
  }
  const firstChar = str.charAt(0);
  const restOfString = str.slice(1).toLowerCase();
  return firstChar + restOfString;
}
