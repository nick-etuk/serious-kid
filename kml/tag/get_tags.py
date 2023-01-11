from kml.parse.parse import ParseKML


def get_tags(content: str):
    # print(f"=>get_tags")

    result = []
    kml = ParseKML(content)
    while kml.find_next(":"):
        kml.push()
        tag = kml.prev_word()
        tag_position = kml.get_pos()
        kml.pop()
        content = kml.next_tag_content(tag)
        child_tags, new_content = get_tags(content)
        if child_tags:
            content = new_content
            for child_tag in child_tags:
                if child_tag[1] != 'unknown':
                    result.append((kml.fullname(child_tag[0]), child_tag[1]))

        if content != 'unknown':
            result.append((kml.fullname(tag), content))
            kml.delete_chars(tag_position, len(tag) + 1)

    if result:
        print(f'{result}')

    return result, kml.get_content()
