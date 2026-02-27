import React from 'react';

// Page navigation buttons, hidden when there is only one page
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 mb-8 ">
      <div className="join space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`join-item btn bg-[#77ACA2] text-[#031926] border-[#031926] shadow-none rounded-[1.5em] ${currentPage === page ? 'btn-active ' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
