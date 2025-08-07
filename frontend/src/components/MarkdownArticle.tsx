"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownArticle = ({ content }: { content: string | null }) => {
  return <MDEditor.Markdown source={content || ""} style={{ backgroundColor: "transparent", color: "#1f2937", fontSize: "18px" }} />;
};

export default MarkdownArticle;
