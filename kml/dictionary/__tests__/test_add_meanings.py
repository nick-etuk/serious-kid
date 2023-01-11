from icecream import ic
import sqlite3 as sl
from kml.utils.init import init
from kml.dictionary.add_meanings import add_meanings
from kml.dictionary.api.mock_oxford_api import MockOxfordAPI
from kml.utils.config import db
from kml.utils.lib import named_tuple_factory


def test_add_meanings():
    init()

    subject_id = 'TST1'
    level_id = 'HS'
    word = 'swimming'
    pos = 'NNS'

    expected_meanings = [
        'the sport or activity of propelling oneself through water using the limbs']
    expected_synonyms = [
        ('dip', 'A lower section of a road or geological feature.'),
        ('revolve', 'The rotation of part of the scenery within a theatrical production.'),
        ('spin', 'Rapid circular motion.'),
        ('swirl', 'A whirling eddy.'),
        ('twirl', 'A movement where a person spins round elegantly; a pirouette.'),
        ('wheel', 'A circular device capable of rotating on its axis, facilitating movement or transportation or performing labour in machines.')]

    delete_sql = """
    delete from dictionary
    where subject_id = ?
    and lemma = ?
    and pos = ? 
    """

    insert_sql = """
    insert into dictionary(subject_id, level_id, lemma, pos) 
    values(?,?,?,?)
    """
    with sl.connect(db) as conn:
        c = conn.cursor()
        c.execute(delete_sql, (subject_id, word, pos))
        c.execute(insert_sql, (subject_id, level_id, word, pos))

    add_meanings(MockOxfordAPI())

    actual_meanings = []
    sql = """
    select meaning 
    from dictionary
    where subject_id = ?
    and lemma = ?
    and pos = ?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        meaning_rows = c.execute(sql, (subject_id, word, pos)).fetchall()

    for row in meaning_rows:
        actual_meanings.append(row.meaning)

    actual_synonyms = []
    sql = """
    select synonym, meaning 
    from synonym
    where subject_id = ?
    and lemma = ?
    and pos = ?
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        syn_rows = c.execute(sql, (subject_id, word, pos)).fetchall()

    for row in syn_rows:
        actual_synonyms.append((row.synonym, row.meaning))

    ic(expected_meanings)
    ic(actual_meanings)
    ic(actual_synonyms)
    assert actual_meanings == expected_meanings
    assert actual_synonyms == expected_synonyms


if __name__ == "__main__":
    pass
