from typing import Any, List
from icecream import ic
from kml.dictionary.filter_stopwords import filter_stopwords
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet


def wordnet_pos(tag):

    if tag.startswith('J'):
        return wordnet.ADJ
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('R'):
        return wordnet.ADV
    else:
        print(
            f'No Treebank to WordNet part-of-speech mapping for {tag}. Defaulting to Noun')
        return wordnet.NOUN


def lemmatize(tags: List[tuple[Any, str]]) -> List[tuple[str, str]]:
    lemmatizer = WordNetLemmatizer()
    result = [(lemmatizer.lemmatize(tag[0], pos=wordnet_pos(tag[1])), tag[1])
              for tag in tags]
    return result


if __name__ == "__main__":
    pass
