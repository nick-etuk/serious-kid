def map_tag(tag):
    if tag.startswith('J'):
        return 'adjective'
    elif tag.startswith('V'):
        return 'verb'
    elif tag.startswith('N'):
        return 'noun'
    elif tag.startswith('R'):
        return 'adverb'
    else:
        raise Exception(
            f'Treebank to Oxford part-of-speech mapping failed for {tag}.')
