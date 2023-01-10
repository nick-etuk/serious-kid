import os

from kml.dictionary.pipeline import pipeline
from kml.utils_get_last_snippet import get_last_snippet
from kml.utils_next_id import next_id
from kml.tests.data.para import raw_para

from kml.config import data_dir
from icecream import ic

import sqlite3 as sl
from kml.config import db
from kml.lib import named_tuple_factory


def test_pipeline():
    expected = expected = [
        ('classified', 'classify', 'VBN'),
        ('dormant', 'dormant', 'JJ'),
        ('extinct', 'extinct', 'JJ'),
        ('volcanoes', 'volcano', 'NNS'),
    ]

    subject_id = 'TST1'
    topic_id = 1
    snippet_id, discard_me = get_last_snippet(
        subject_id=subject_id, topic_id=topic_id, snippet_type='P')

    ic(subject_id)
    ic(snippet_id)

    delete_sql = """
    delete  from snippet_dictionary
    where subject_id = ?
    and snippet_id = ?
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute(delete_sql, (subject_id, snippet_id))

    pipeline(subject_id=subject_id, snippet_id=snippet_id, text=raw_para)

    actual = []
    sql = """
    select word, lemma, pos 
    from snippet_dictionary
    where subject_id = ?
    and snippet_id = ?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        rows = c.execute(sql, (subject_id, snippet_id)).fetchall()

    for row in rows:
        actual.append((row.word, row.lemma, row.pos))

    ic(expected)
    ic(actual)
    assert actual == expected


if __name__ == "__main__":
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
