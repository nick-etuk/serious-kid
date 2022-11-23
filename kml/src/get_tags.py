from kml import KML
from save_tag import save_tag


def get_tags(content: str):
    # print(f"=>get_tags")

    result = []
    kml = KML(content)
    while kml.find_next(":"):
        kml.push()
        tag = kml.prev_word()
        kml.pop()
        content = kml.next_tag_content(tag)
        if content != 'unknown':
            result.append((kml.fullname(tag), content))

    if result:
        print(f'{result}')

    return result
