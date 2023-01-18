import { client } from "./client";

import { Article } from "../types";

export const getAllArticles = async () => {
  try {
    return await client.get<never, Article[]>("/articles");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getArticle = async (id: number) => {
  try {
    return await client.get<never, Article>(`/articles/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
