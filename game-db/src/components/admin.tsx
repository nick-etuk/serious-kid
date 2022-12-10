import React from 'react';
import { resetDB, syncDB } from '../services/data/watermelon-db/sync-db';

export function Admin () {
  return (
    <div>
      <h1>Admin</h1>
      <button onClick={resetDB}>Reset Database</button>
      <button onClick={syncDB}>Sync Database</button>
    </div>
  )
}