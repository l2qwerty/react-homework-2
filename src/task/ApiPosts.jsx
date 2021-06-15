import React, { useState, useEffect } from 'react';

export default function ApiPosts() {
  const [posts, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  function showMore() {
    setPostsPerPage((preValue) => preValue + 10);
  }

  function paginate(pageNum) {
    setCurrentPage(pageNum);
  }

  let pages = [];

  for (let i = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <button
        type='button'
        className='show-btn-style'
        onClick={() => {
          showMore(postPerPage);
        }}
      >
        SHOW MORE
      </button>
      <div>
        {currentPosts.map((post) => {
          return (
            <div className='post' key={post.id}>
              <h3 className='post-text'>UserId: {post.userId}</h3>
              <h5 className='post-text'>Title: {post.title}</h5>
              <p className='post-text'>{post.body}</p>
            </div>
          );
        })}
      </div>
      <div>
        {pages.map((num) => (
          <span key={num}>
            <button
              type='button'
              className='pag-btn-style'
              onClick={() => paginate(num)}
            >
              {num}*
            </button>
          </span>
        ))}
      </div>
    </>
  );
}
