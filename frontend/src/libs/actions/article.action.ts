import axios, { AxiosError } from "axios";
import { ArticleProps } from "../types";

const BASE_URL = "https://newsapi.org/v2";

export const getArticles = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/top-headlines?country=us&category=business&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);

    return res.data;
  } catch (error) {
    console.log(error, "<---Error in getArticlesAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getArticle = async (id: string | null) => {
  try {
    const res = await axios.get(`${BASE_URL}/top-headlines?country=us&category=business&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);

    const articles = res.data.articles;
    const article = articles.find((article: ArticleProps) => article.source.name === id);

    return article;
  } catch (error) {
    console.log(error, "<---Error in getArticlesAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
