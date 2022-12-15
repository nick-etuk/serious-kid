import React from 'react';
import { Snippet } from '../services/data';
import { listSnippetsDB, listSnippetsDB3 } from '../services/data/list-snippets';
import { resetDB, syncDB } from '../services/data/watermelon-db/sync-db';

const snippets = await listSnippetsDB(1, 3).then((x) => x);

function ViewSnippets() {
    return (
    <div>
        {snippets.map(s =>
            <p key={s.snippetId}>{s.snippetId}. {s.descr}</p>
        )}
    </div>
    )
}
export function Admin () {
  return (
    <div>
        <h1>Admin</h1>
        <button onClick={resetDB}>Reset Database</button>
        <button onClick={syncDB}>Sync Database</button>
        <br />
        <ViewSnippets/>
    </div>
  )
}