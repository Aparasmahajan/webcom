"use client";

import React from "react";
import NewsFeed from "./NewsFeed";

const Carousel: React.FC = () => {
  return <NewsFeed showViewAll limit={6} variant="carousel" />;
};

export default Carousel;
