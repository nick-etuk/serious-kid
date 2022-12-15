import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from ".";

export async function resetDB() {
  await database.write(async () => {
    await database.unsafeResetDatabase();
  });
}

export async function syncDB() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
        JSON.stringify(migration)
      )}`;
      const response = await fetch(`http://localhost:3000/pull?${urlParams}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const x = await response.json();
      const { changes, timestamp } = x.body;
      return { changes, timestamp };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await fetch(
        `http://localhost:3000/push?last_pulled_at=${lastPulledAt}`,
        {
          method: "POST",
          body: JSON.stringify(changes),
        }
      );
      /*if (!response.ok) {
        throw new Error(await response.text());
      }*/
    },
    migrationsEnabledAtVersion: 1,
  });
}
