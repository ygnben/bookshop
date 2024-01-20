import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_UNIQUE_BOOK = gql`
  query Book($bookId: Int!) {
    book(id: $bookId) {
      createdAt
      desc
      id
      img
      title
      updatedAt
    }
  }
`;

export default function useBook(id) {
  console.log("🚀 ~ useBooks ~ id:", id);
  // const { data, loading, error } = useQuery(GET_Book);

  // console.log("🚀 ~ useBooks ~ data:", data);
  // const books = data?.Books;
  // console.log("🚀 ~ useBooks ~ data?.books:", data?.Books);

  // return [books, loading, error];

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

  function getUniqueBook() {
    return {
      data: uniqueBookData?.book,
      loading: uniqueBookLoading,
      error: uniqueBookError,
    };
  }
  return { getUniqueBook };
}
