const isPathMatch = (matchPath: string, path: string) => {
  return matchPath === path || matchPath.startsWith(`${path}/`);
};

export const pathUtils = {
  isPathMatch,
};
