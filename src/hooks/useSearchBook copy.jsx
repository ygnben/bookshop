import { gql, useQuery, useLazyQuery } from "@apollo/client";

const SEARCH_BOOK = gql`
  query SearchBooks($title: String!) {
    searchBooks(title: $title) {
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

export default function useSearchBook(title) {
  console.log("🚀 ~ useSearchBook ~ title:", title);
  //   const { data, loading, error } = useQuery(SEARCH_BOOK, {
  //     variables: { title },
  //   });
  //   const searchResult = data?.searchBooks;
  //   console.log(searchResult);

  const [
    searchBook,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(SEARCH_BOOK), {
    variables: { bookId: parseInt(id) },
  };
  console.log("bookdata", allBooksData);
  return { searchBook, searchLoading, searchError, searchData };
}
