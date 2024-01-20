import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query Books {
    books {
      createdAt
      desc
      id
      img
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
  const { data, loading, error } = useQuery(GET_BOOKS);

  console.log("🚀 ~ useBooks ~ data:", data);
  const books = data?.books;
  console.log("🚀 ~ useBooks ~ data?.books:", data?.Books);

  return [books, loading, error];

  // const {
  //   data: allBooksData,
  //   loading: allBooksLoading,
  //   error: allBooksError,
  // } = useQuery(GET_BOOKS);
  // return { allBooksData, allBooksLoading, allBooksError };
}

// import { gql, useQuery } from "@apollo/client";

// const GET_USER = gql`
//   query Users {
//     users {
//       name
//       messages {
//         id
//         body
//       }
//     }
//   }
// `;

// export default function useUsers() {
//   const { data, loading, error } = useQuery(GET_USER);
//   const users = data?.users;

//   return [users, loading, error];
// }
