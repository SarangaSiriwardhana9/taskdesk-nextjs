'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';

interface TaskPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function TaskPagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: TaskPaginationProps) {
  const {
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setPage,
    getPageNumbers,
  } = usePagination({
    totalItems,
    itemsPerPage,
    initialPage: currentPage,
  });

  React.useEffect(() => {
    setPage(currentPage);
  }, [currentPage, setPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
    onPageChange(page);
  };

  const handlePrevious = () => {
    if (hasPreviousPage) {
      const newPage = currentPage - 1;
      handlePageChange(newPage);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      const newPage = currentPage + 1;
      handlePageChange(newPage);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="text-sm text-muted-foreground">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} tasks
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              className={!hasPreviousPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {pageNumbers.map((pageNumber, index) => (
            <PaginationItem key={index}>
              {pageNumber === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNumber);
                  }}
                  isActive={pageNumber === currentPage}
                  className="cursor-pointer"
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className={!hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
