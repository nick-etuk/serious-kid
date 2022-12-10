import sqlite3 as sl
from config import db
from lib import named_tuple_factory


def get_last_question(table: str, type: str, file_id: int) -> str:

    if table == 'question':
        sql = """
        select 
        """

    type_filter = f"and snippet_type = '{type}'" if type else ""
    sql = f"""
    select snippet_id, level_id, subject_id, descrlong
    from snippet s
    where s.snippet_id = (
        select max(snippet_id) from snippet
        where level_id = s.level_id
        and subject_id = s.subject_id
        and file_id = ?
        {type_filter}
    )
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, (file_id,)).fetchone()

    if row[0]:
        return row.snippet_id, row.descrlong

    return None


def get_last_item(table: str, type: str, level_id: str, subject_id: str, id: int) -> str:

    if table == 'question':
        sql = """
        select q.seq as id, q.descr
        from question q
        where q.level_id = ?
        and q.subject_id = ?
        and q.snippet_id = ?
        and q.seq = (
            select max(seq) from question
            where level_id = q.level_id
            and subject_id = q.subject_id
            and snippet_id = q.snippet_id
            )
        """
        args = (level_id, subject_id, id,)
    else:
        type_filter = f"and snippet_type = '{type}'" if type else ""
        sql = f"""
        select snippet_id as id, level_id, subject_id, descrlong as descr
        from snippet s
        where s.snippet_id = (
            select max(snippet_id) from snippet
            where level_id = s.level_id
            and subject_id = s.subject_id
            and file_id = ?
            {type_filter}
        )
        """
        args = (id,)
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, args).fetchone()

    if row and row[0]:
        return row.id, row.descr

    return 0, ''


if __name__ == "__main__":
    print(get_last_item('snippet', 'Q', 1))
