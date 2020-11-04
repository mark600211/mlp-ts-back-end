export const getDataServiceToken = (prifix: string) => `DataService${prifix}`;

export const getDataServiceTokens = (prefixes: string[]) => {
  return prefixes.map(prefix => getDataServiceToken(prefix));
};

export const getResolverToken = (prefix: string) => `${prefix}BaseResolver`;

export const getResolverTokens = (prefixes: string[]) => {
  return prefixes.map(prefix => getResolverToken(prefix));
};
