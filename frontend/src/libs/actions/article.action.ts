"use server";

import axios from "axios";
import { ArticleProps } from "../types";
import { handleApiError } from "../utils";

const BASE_URL = "https://newsapi.org/v2";

export const getTopheadlinesArticles = async (query?: string, category = "general", country = "us", pageSize = 15, page = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        category,
        pageSize,
        page,
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
    });

    const articles = res.data.articles;
    const totalResults = res.data.totalResults;

    if (query) {
      const filteredArticles = articles.filter(
        (article: ArticleProps) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          (article.content && article.content.toLowerCase().includes(query.toLowerCase())) ||
          article.source.name.toLowerCase().includes(query.toLowerCase()) ||
          (article.description && article.description.toLowerCase().includes(query.toLowerCase()))
      );

      return { articles: filteredArticles, totalResults, pageSize, currentPage: page };
    } else {
      return { articles, totalResults, pageSize, currentPage: page };
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getEverythingArticles = async (q = "tesla", language = "en", sortBy = "popularity", pageSize = 15, page = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q,
        searchIn: "title,content",
        from: "2025-08-08",
        to: "2025-08-08",
        sortBy,
        language,
        pageSize,
        page,
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
    });

    const articles = res.data.articles;
    const totalResults = res.data.totalResults;

    return { articles, totalResults, pageSize, currentPage: page };
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getArticles = async (type: "top-headlines" | "everything", params: Record<string, string | undefined>) => {
  const page = params.page ? Number(params.page) : 1;

  const pageSize = params.pageSize ? Number(params.pageSize) : type === "top-headlines" ? 15 : 15;

  if (type === "top-headlines") {
    return await getTopheadlinesArticles(params.query as string | undefined, params.category as string | undefined, params.country as string | undefined, pageSize, page);
  } else {
    return await getEverythingArticles(params.query as string | undefined, params.language as string | undefined, params.sortBy as string | undefined, pageSize, page);
  }
};

export const getArticle = async (
  id: string | null,
  type: "top-headlines" | "everything" = "top-headlines",
  params: {
    query?: string;
    category?: string;
  } = {}
) => {
  try {
    const { articles } = await getArticles(type, params);

    const article = articles.find((article: ArticleProps) => article.source.name === id);

    return article;
  } catch (error) {
    console.log(error, "<---Error in getArticleAction");
  }
};

export const getOtherArticles = async (
  name: string | null,
  type: "top-headlines" | "everything" = "top-headlines",
  params: {
    query?: string;
    category?: string;
  } = {}
) => {
  try {
    const { articles } = await getArticles(type, params);

    const otherArticles = articles
      .filter((item: ArticleProps) => item.source.name !== name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return otherArticles;
  } catch (error) {
    console.log(error, "<---Error in getOtherArticlesAction");
  }
};
