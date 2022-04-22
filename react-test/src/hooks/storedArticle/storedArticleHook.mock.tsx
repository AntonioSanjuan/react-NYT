const useStoredArticle_AddStoredArticleMock = jest.fn(() => new Promise<void>((resolve) => resolve()));
const useStoredArticle_DeleteStoredArticleMock = jest.fn(() => new Promise<void>((resolve) => resolve()));

export const useStoredArticleMock = () => ({
  addStoredArticle: useStoredArticle_AddStoredArticleMock,
  deleteStoredArticle: useStoredArticle_DeleteStoredArticleMock,
});
