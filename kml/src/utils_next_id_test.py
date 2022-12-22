import pytest
from icecream import ic
from config import data_dir
import sqlite3 as sl
from config import db
from lib import named_tuple_factory
from utils_next_id import next_id


def test_utils_next_id():
    def test_next_snippet():
        sql = f"""
        select max(snippet_id) as next_id 
        from snippet
        where subject_id = 'GEOG' and topic_id = 1
        """
        with sl.connect(db) as conn:
            c = conn.cursor()
            row = c.execute(sql).fetchone()

        expected = int(row[0]) + 1
        actual = next_id('snippet', ['GEOG', '1'])

        ic(expected)
        ic(actual)
        assert expected == actual

    def test_next_kml_file():
        sql = f"""
        select max(file_id) as next_id 
        from kml_file
        """
        with sl.connect(db) as conn:
            c = conn.cursor()
            row = c.execute(sql).fetchone()

        expected = int(row[0]) + 1 if row and row[0] else 1
        actual = next_id('kml_file')

        ic(expected)
        ic(actual)
        assert expected == actual

    test_next_snippet()
    test_next_kml_file()


if __name__ == "__main__":
    test_utils_next_id()
    #print(next_id('snippet', ['OLIV', 1]))
