import os
from typing import List
from dictionary.world_hard_words import world_hard_words

from dictionary_lemmatize import lemmatize
from dictionary_filter_stopwords import filter_stopwords
from tests_data_para import raw_para

from config import data_dir
from icecream import ic


def snippet_significant_words(lemmas: List[tuple[str, str]], frequency_file: str) -> List[tuple[str, str]]:
    hard_words = []
    all_hard_words = world_hard_words(frequency_file)
    for lemma in lemmas:
        if lemma[0] in all_hard_words:
            hard_words.append(lemma)

    ic(hard_words)
    return hard_words


if __name__ == "__main__":
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    lemmas = lemmatize(filter_stopwords(raw_para))
    actual = snippet_significant_words(lemmas, frequency_file)
    ic(actual)
