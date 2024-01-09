// useBooks.js
import { useQuery } from "@apollo/client";
import { GET_BOOKS, GET_UNIQUE_BOOK } from "./queries";

export default function useBooks() {
  const { data: allBooksData, loading: allBooksLoading, error: allBooksError } = useQuery(GET_BOOKS);
  const { data: uniqueBookData, loading: uniqueBookLoading, error: uniqueBookError } = useQuery(GET_UNIQUE_BOOK, {
    variables: { bookId: /* provide the book ID here */ },
  });

  function getAllBooks() {
    return { data: allBooksData, loading: allBooksLoading, error: allBooksError };
  }

  function getUniqueBook() {
    return { data: uniqueBookData, loading: uniqueBookLoading, error: uniqueBookError };
  }

  return { getAllBooks, getUniqueBook };
}

import React, { useEffect } from 'react';
import useBooks from './useBooks';

function BookList() {
  const { getAllBooks, getUniqueBook } = useBooks();

  useEffect(() => {
    const { data, loading, error } = getAllBooks();
    if (loading) {
      // Handle loading state
    }
    if (error) {
      // Handle error state
    }
    if (data) {
      console.log(data);
      // Do something with the fetched books
    }
  }, [getAllBooks]);

  useEffect(() => {
    const { data, loading, error } = getUniqueBook();
    if (loading) {
      // Handle loading state
    }
    if (error) {
      // Handle error state
    }
    if (data) {
      console.log(data);
      // Do something with the fetched unique book
    }
  }, [getUniqueBook]);

  return <div>Book List</div>;
}

export default BookList;