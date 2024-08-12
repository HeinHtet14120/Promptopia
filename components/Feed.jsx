'use client';
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className=" mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json()
      setPosts(data);
    }

    fetchPosts();
  }, [])


  const searchFun = (searchText) => {

    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );

  }

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchText(searchQuery);

    if (searchText) {

      const searchResults = searchFun(searchText);

      setSearchPosts(searchResults);
    }
  }

  const handleTagClick = (tagText) => {
    setSearchText(tagText);
    const restult = searchFun(tagText);
    setSearchPosts(restult)
  }

  return (
    <section className="feed">
      <form className=" relative w-full flex-center">
        <input type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {
        searchText ?
          <PromptCardList
            data={searchPosts}
            handleTagClick={handleTagClick}
          /> :
          <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}
          />
      }

    </section>
  )
}

export default Feed