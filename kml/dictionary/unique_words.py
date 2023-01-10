from icecream import ic


def unique_words(filename: str):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # remove double new lines, colons, quotation marks
    eliminate = ['  ', "\n"]
    for c in range(1, 64):
        eliminate.append(chr(c))

    for char in eliminate:
        text = text.replace(char, ' ')

    words = text.split(' ')
    distinct = list(set(words))

    unique = []
    for word in distinct:
        if len(word) > 3:
            unique.append(word.lower())
    ic(unique)
    return unique
