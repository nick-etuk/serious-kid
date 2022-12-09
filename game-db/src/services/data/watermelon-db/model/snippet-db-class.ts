import { Model, Q } from "@nozbe/watermelondb";
import { children, lazy } from "@nozbe/watermelondb/decorators";

export default class SnippetDbClass extends Model {
  static table = "snippet";
  list() {
    Q.where("snippet_id", Q.between(1, 3));
  }
}
