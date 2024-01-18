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

export default function useBooks() {
  // console.log("🚀 ~ useBooks ~ id:", id);
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
  return { allBooksData, allBooksLoading, allBooksError };
}
