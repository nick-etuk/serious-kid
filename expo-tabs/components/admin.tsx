import React from 'react';
import { Snippet } from '../services/data';
import { listSnippetsDB, listSnippetsDB3 } from '../services/data/list-snippets';
import { resetDB, syncDB } from '../services/data/watermelon-db/sync-db';

const snippets = await listSnippetsDB(1, 3).then((x) => x);

function ViewSnippets() {
    return (
    <View>
        {snippets.map(s =>
            <p key={s.snippetId}>{s.snippetId}. {s.descr}</Text>
        )}
    </View>
    )
}
export function Admin () {
  return (
    <View>
        <h1>Admin</h1>
        <button onPress={resetDB}>Reset Database</Button>
        <button onPress={syncDB}>Sync Database</Button>
        <br />
        <ViewSnippets/>
    </View>
  )
}