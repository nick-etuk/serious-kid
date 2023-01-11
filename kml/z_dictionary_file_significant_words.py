import os
from typing import List
from kml.dictionary.unique_words import unique_words
from kml.dictionary.world_significant_words import world_significant_words
from kml.utils.config import data_dir

from icecream import ic


def file_significant_words(kml_file: str, frequency_file: str) -> List[str]:
    hard_words = list(set(world_significant_words(frequency_file)) & set(
        unique_words(kml_file)))

    ic(hard_words)
    return hard_words


if __name__ == "__main__":
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    kml_file = os.path.join(data_dir, 'volcanoes.kml.txt')

    file_significant_words(kml_file, frequency_file)
