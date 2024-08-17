"use client";
import "./page.module.css";
import { useEffect, useState } from "react";
import SkeletonLoading from "@/components/Skeleton-loading";
import Pagination from "@/components/Pagination";

// Define the structure of a post
interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  // Store all fetched data
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  // Limit of content per page
  const [limit, setLimit] = useState<number>(5);

  // Total number of pages
  const [totalPages, setTotalPages] = useState<number>(0);

  // Current page number
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Current page's content
  const [currentContent, setCurrentContent] = useState<Post[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get all contents according to the current page number and limit
  const getContents = (currentPage: number, limit: number) => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    setCurrentContent([]);
    const array = allPosts.slice(startIndex, endIndex);
    setCurrentContent(array);
  };

  // Fetch api data when the page loads for the first time
  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data: Post[]) => {
        setAllPosts(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Calculating total number of pages needed
    let allPages = Math.ceil(allPosts.length / limit);
    setTotalPages(allPages);
  }, [allPosts, limit]);

  // Get contents when allPosts, currentPage and limit change
  useEffect(() => {
    if (allPosts.length > 0) {
      getContents(currentPage, limit);
    }
  }, [allPosts, currentPage, limit]);

  // Set the current page number
  const setCurrPage = (pageNo: number) => {
    setCurrentPage(pageNo);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h1 className="text-center mb-4">Get All Posts Here</h1>
        <div className="d-flex align-items-center gap-2 container-fluid justify-content-center mb-3">
          <label htmlFor="form_select">Set Content Limit</label>
          <select
            id="form_select"
            className="form-select w-25"
            aria-label="Default select example"
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 30, 50, 100].map((val, index) => {
              return (
                <option value={val} key={index}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        {isLoading ? (
          <SkeletonLoading number={limit} />
        ) : (
          currentContent.map((post, index) => (
            <div key={index} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  <span>{post.id}. </span>
                  {post.title}
                </h5>
                <p className="card-text">{post.body}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        setCurrPage={setCurrPage}
        currPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
