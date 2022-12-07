import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "snippet",
      columns: [
        { name: "level_id", type: "string" },
        { name: "subject_id", type: "string" },
        { name: "snippet_id", type: "number" },
        { name: "snippet_type", type: "string" },
        { name: "descr", type: "string" },
        { name: "descrlong", type: "string" },
        { name: "lexile_level", type: "number" },
        { name: "file_id", type: "number" },
        // { name: "created_at", type: "number", isOptional: true },
        // { name: "updated_at", type: "number", isOptional: true },
      ],
    }),
  ],
});
