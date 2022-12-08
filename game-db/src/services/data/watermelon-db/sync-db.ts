import { synchronize } from "@nozbe/watermelondb/sync";
import { getBackendChanges, saveChangesToBackend } from "../../../api";
import { database } from ".";

export async function syncDB() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
        JSON.stringify(migration)
      )}`;
      const response = await getBackendChanges();
      if (!response) {
        throw new Error(response);
      }

      const { changes, timestamp } = response;
      return { changes, timestamp };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await saveChangesToBackend(changes);
    },
    migrationsEnabledAtVersion: 1,
  });
}

syncDB();
