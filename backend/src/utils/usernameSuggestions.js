// utils/usernameSuggestions.js
const generateUsernameSuggestions = (baseName)=> {
  const suggestions = [];
  const randomNums = [123, 321, 999, 2025, Math.floor(Math.random() * 10000)];

  // Remove spaces & make lowercase
  const cleanName = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Variations
  suggestions.push(`${cleanName}_`);
  suggestions.push(`${cleanName}.${Math.floor(Math.random() * 100)}`);
  suggestions.push(`${cleanName}${randomNums[0]}`);
  suggestions.push(`${cleanName}_${randomNums[1]}`);
  suggestions.push(`${cleanName}${randomNums[2]}`);
  suggestions.push(`${cleanName}${randomNums[3]}`);
  suggestions.push(`${cleanName}_${randomNums[4]}`);

  // Add initials approach if name looks like "satyam pandey"
  const parts = cleanName.split(" ");
  if (parts.length > 1) {
    const initials = parts.map(p => p[0]).join("");
    suggestions.push(`${parts[0]}_${initials}`);
    suggestions.push(`${parts[0]}${initials}${Math.floor(Math.random() * 100)}`);
  }

  // Ensure unique set
  return [...new Set(suggestions)];
}
export default generateUsernameSuggestions;