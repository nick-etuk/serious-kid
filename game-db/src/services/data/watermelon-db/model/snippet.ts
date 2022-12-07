import { Model, Q } from "@nozbe/watermelondb";
import { children, lazy } from "@nozbe/watermelondb/decorators";

export default class Snippet extends Model {
  static table = "snippet";
  // @lazy list = Q.where("snippet_id", Q.between(1, 3));
}
