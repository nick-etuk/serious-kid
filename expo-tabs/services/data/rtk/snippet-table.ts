import { useGetSnippetsQuery } from "store/features/api/api-slice";

export function snippetTable() {
  const {
    data: snippets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSnippetsQuery("no args");

  /*
  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const content = posts;
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  */
}
