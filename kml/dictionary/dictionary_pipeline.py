import os
from kml.dictionary.save_significant_word import save_significant_word
from kml.dictionary.lemmatize import lemmatize
from kml.dictionary.filter_stopwords import filter_stopwords
from kml.dictionary.snippet_significant_words import snippet_significant_words
from kml.tests.data.para import raw_para

from kml.utils.config import data_dir
from icecream import ic


def dictionary_pipeline(subject_id: int, snippet_id: int, text: str):
    level_id = 'HS'
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    original_words = filter_stopwords(text)
    lemmas = lemmatize(original_words)
    significant = snippet_significant_words(
        original_words=original_words, lemmas=lemmas, frequency_file=frequency_file)

    for word in significant:
        ic(word)
        save_significant_word(subject_id=subject_id, snippet_id=snippet_id,
                              word=word['original_word'], lemma=word['lemma'][0], pos=word['lemma'][1])

    return


if __name__ == "__main__":
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    original_words = filter_stopwords(raw_para)
    lemmas = lemmatize(original_words)
    significant = snippet_significant_words(
        original_words=original_words, lemmas=lemmas, frequency_file=frequency_file)
    ic(significant)
