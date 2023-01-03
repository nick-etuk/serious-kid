import { useAppDispatch, useAppSelector } from "store/hooks";
import { setCurrentSnippetId } from "store/current-snippet-id-slice";
import { showQuestionsAction } from "store/show-questions-slice";

const dispatch = useAppDispatch();

export function navigateNext(pageLastSnippetId: number, lastStep: number) {
  if (pageLastSnippetId === lastStep) {
    dispatch(showQuestionsAction());
    return;
  }
  dispatch(setCurrentSnippetId(pageLastSnippetId + 1));
}
