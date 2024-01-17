import { gql, useMutation } from "@apollo/client";

const delLike = gql`
  mutation DeleteLike($deleteLikeId: Int!) {
    deleteLike(id: $deleteLikeId) {
      id
    }
  }
`;

export default function useDelLike(id) {
  const [delLikeitem, { loading, error }] = useMutation(delLike, {
    variables: {
      deleteLikeId: parseInt(id),
    },
  });
  console.log("🚀 ~ useDelLike ~ id:", id);
  //   const newMessage = data?.createOneMessage;

  return [delLikeitem, loading, error];
}
