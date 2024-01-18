import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query Books {
    books {
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
  query Book($bookId: Int!) {
    book(id: $bookId) {
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

// const GET_UNIQUE_BOOK = gql`
//   query Books {
//     books {
//       catagory
//       createdAt
//       desc
//       id
//       img
//       price
//       title
//       updatedAt
//     }
//   }
// `;

export default function useBooks(id) {
  console.log("🚀 ~ useBooks ~ id:", id);
  // const { data, loading, error } = useQuery(GET_Book);

  // console.log("🚀 ~ useBooks ~ data:", data);
  // const books = data?.Books;
  // console.log("🚀 ~ useBooks ~ data?.books:", data?.Books);

  // return [books, loading, error];

  const [
    getAllBooks,
    { data: allBooksData, loading: allBooksLoading, error: allBooksError },
  ] = useLazyQuery(GET_BOOKS);

  const {
    data: uniqueBookData,
    loading: uniqueBookLoading,
    error: uniqueBookError,
  } = useQuery(GET_UNIQUE_BOOK, {
    variables: { bookId: parseInt(id) },
  });
  console.log("🚀 ~ useBooks ~ bookId: id:", id);
  // function getAllBooks() {
  //   return {
  //     data: allBooksData,
  //     loading: allBooksLoading,
  //     error: allBooksError,
  //   };
  // }

  // function getUniqueBook() {
  //   return {
  //     data: uniqueBookData,
  //     loading: uniqueBookLoading,
  //     error: uniqueBookError,
  //   };
  // }
  return {
    books: {
      data: allBooksData,
      loading: allBooksLoading,
      error: allBooksError,
    },
    book: {
      data: uniqueBookData,
      loading: uniqueBookLoading,
      error: uniqueBookError,
    },
  };
}
