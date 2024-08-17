import getPaginationRange from "@/utils/getPaginationRange";
import { useEffect, useState } from "react";

// Define the types for the props
interface PaginationProps {
  setCurrPage: (pageNo: number) => void;
  currPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ setCurrPage, currPage, totalPages }) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    // Function to update state with the current window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }); 

  // Get the range of pages
  const array = getPaginationRange(currPage, totalPages, windowWidth);

  return (
    <div className="d-flex mt-4 justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              disabled={currPage === 1}
              onClick={() => setCurrPage(currPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {array.map((page:number, index:number) => (
            <li key={index} className={`page-item`}>
              <button className={`btn ${page === currPage && "btn-primary"}`} style={{borderRadius:'0', border:'0.5px solid rgb(0, 0, 0, 0.2)'}} onClick={() => setCurrPage(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              disabled={currPage === totalPages}
              onClick={() => setCurrPage(currPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
