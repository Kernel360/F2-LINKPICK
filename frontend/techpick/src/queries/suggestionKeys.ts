export const suggestionKeys = {
  all: ['suggestion'] as const,
  ranking: () => [...suggestionKeys.all, 'ranking'],
  article: () => [...suggestionKeys.all, 'articles'],
};
