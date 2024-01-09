import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query Books {
    Books {
      catagory
      createdAt
      desc
      id
      img
      price
      title
      updatedAt
    }
  }
`;

const GET_UNIQUE_BOOK = gql`
  query Books {
    Books {
      catagory
      createdAt
      desc
      id
      img
      price
      title
      updatedAt
    }
  }
`;

export default function useBooks() {
  // const { data, loading, error } = useQuery(GET_Book);

  // console.log("🚀 ~ useBooks ~ data:", data);
  // const books = data?.Books;
  // console.log("🚀 ~ useBooks ~ data?.books:", data?.Books);

  // return [books, loading, error];

  const {
    data: allBooksData,
    loading: allBooksLoading,
    error: allBooksError,
  } = useQuery(GET_BOOKS);

  const {
    data: uniqueBookData,
    loading: uniqueBookLoading,
    error: uniqueBookError,
  } = useQuery(GET_UNIQUE_BOOK, {
    variables: { bookId: 3 },
  });

  function getAllBooks() {
    return {
      data: allBooksData,
      loading: allBooksLoading,
      error: allBooksError,
    };
  }

  function getUniqueBook() {
    return {
      data: uniqueBookData,
      loading: uniqueBookLoading,
      error: uniqueBookError,
    };
  }
  return { getAllBooks, getUniqueBook };
}
