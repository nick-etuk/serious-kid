import sqlite3 as sl
from kml.utils.config import db
from kml.utils.lib import named_tuple_factory


def get_last_snippet(subject_id: str, snippet_type: str) -> str:

    sql = f"""
    select snippet_id as id, level_id, subject_id, descrlong as descr
    from snippet s
    where s.subject_id = ?
    and s.snippet_type = ?
    and s.snippet_id = (
        select max(snippet_id) from snippet
        where subject_id = s.subject_id
        and snippet_type = s.snippet_type
    )
    """
    args = (subject_id, snippet_type)

    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, args).fetchone()

    if row and row[0]:
        return row.id, row.descr

    return 0, ''


if __name__ == "__main__":
    print(get_last_snippet('GEOG', 1, 'P'))
