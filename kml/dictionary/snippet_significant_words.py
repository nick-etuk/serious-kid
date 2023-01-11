import os
from typing import List
from kml.dictionary.world_significant_words import world_significant_words

from kml.dictionary.lemmatize import lemmatize
from kml.dictionary.filter_stopwords import filter_stopwords
from kml.tests.data.para import raw_para

from kml.utils.config import data_dir
from icecream import ic


def snippet_significant_words(original_words: List[str], lemmas: List[tuple[str, str]], frequency_file: str):
    significant = []
    all_significant = world_significant_words(frequency_file)
    for index, lemma in enumerate(lemmas):
        if lemma[0] in all_significant:
            significant.append(
                {
                    'original_word': original_words[index][0],
                    'lemma': lemma
                }
            )

    ic(significant)
    return significant


if __name__ == "__main__":
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    lemmas = lemmatize(filter_stopwords(raw_para))
    actual = snippet_significant_words(lemmas, frequency_file)
    ic(actual)
