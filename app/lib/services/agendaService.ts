
export const toHeading = ( input: string ): string => {
  // Add a space before each capital letter (except the first one)
  const spacedString = input.replace( /([a-z])([A-Z])/g, "$1 $2" );

  // Capitalize the first letter of each word
  const heading = spacedString.replace( /\b\w/g, ( match ) => match.toUpperCase() );

  return heading;
};