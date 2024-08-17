

const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  windowWidth: number
): number[] => {

  // Intial values
  let start = 1;
  let end = windowWidth > 455 ? (totalPages > 10 ? 10 : totalPages) : (totalPages > 5 ? 5: totalPages);

  // Slide the window if there is enough pages after the current page
  if (windowWidth > 455) {
    if (currentPage > 6) {
      if (totalPages >= currentPage + 4) {
        start = currentPage - 5;
        end = currentPage + 4;
      } else {
        end = totalPages;
        start = Math.max(1, totalPages - 9);
      }
    }
  } else {
    if (currentPage > 3) {
      if (totalPages >= currentPage + 2) {
        start = currentPage - 2;
        end = currentPage + 2;
      } else {
        end = totalPages;
        start = Math.max(1, totalPages - 4);
      }
    }
  }

  const arr: number[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
};

export default getPaginationRange;
