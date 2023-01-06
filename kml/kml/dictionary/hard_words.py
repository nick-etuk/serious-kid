import os
from typing import List

from kml.dictionary.unique_words import unique_words
from kml.dictionary.world_hard_words import world_hard_words

from config import data_dir
import sqlite3 as sl
from config import db
from lib import named_tuple_factory

from icecream import ic


def hard_words(kml_file: str, frequency_file: str) -> List[str]:
    hard_words = list(set(world_hard_words(frequency_file)) & set(
        unique_words(kml_file)))

    ic(hard_words)
    return hard_words


if __name__ == "__main__":
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    kml_file = os.path.join(data_dir, 'volcanoes.kml.txt')

    hard_words(kml_file, frequency_file)
