const useStoredArticle_AddStoredArticleMock = jest.fn(() => new Promise<void>((resolve, rejects) => resolve()));
const useStoredArticle_DeleteStoredArticleMock = jest.fn(() => new Promise<void>((resolve, rejects) => resolve()));

export const useStoredArticleMock = () => { return {
    addStoredArticle: useStoredArticle_AddStoredArticleMock,
    deleteStoredArticle: useStoredArticle_DeleteStoredArticleMock
}}
