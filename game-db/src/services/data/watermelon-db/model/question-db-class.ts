import { Model, Q } from "@nozbe/watermelondb";
import { children, lazy } from "@nozbe/watermelondb/decorators";

export default class QuestionDbClass extends Model {
  static table = "question";
  list() {
    Q.where("snippet_id", Q.between(1, 3));
  }
}
