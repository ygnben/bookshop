import { gql, useQuery, useLazyQuery } from "@apollo/client";

// const SEARCH_BOOK = gql`
//   query Query($title: String!) {
//     searchBooks(title: $title) {
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

const SEARCH_BOOK = gql`
  query Books($title: String!) {
    searchBooks(title: $title) {
      createdAt
      desc
      id
      img
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
    getSearchBook,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(SEARCH_BOOK);

  console.log("searchData123", searchData);
  return { getSearchBook, searchLoading, searchError, searchData };
}
