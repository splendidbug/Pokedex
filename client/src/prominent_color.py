import xml.etree.ElementTree as ET
from collections import Counter
import re
import requests
from io import BytesIO


def get_color(svg_url):
    def extract_color_from_style(style):
        """Extracts color codes from style formatted string."""
        color_match = re.search(
            r'(?:stroke|fill|stop-color):(\s*#[0-9a-fA-F]{6}\b)', style)
        if color_match:
            return color_match.group(1).strip()
        return None

    def extract_colors(svg_content):
        """Extracts a list of color values (in #RRGGBB format) from an SVG file's XML content."""
        colors = []
        for elem in svg_content.iter():
            if 'style' in elem.attrib:
                style_color = extract_color_from_style(elem.attrib['style'])
                if style_color:
                    colors.append(style_color)
            for attr in ['fill', 'stroke', 'stop-color']:
                if attr in elem.attrib:
                    color = elem.attrib[attr].strip()
                    if re.match(r'^#(?:[0-9a-fA-F]{3}){1,2}$', color):
                        colors.append(color)
        return colors

    def most_frequent_color(svg_data, skip_color='#0d131a'):
        """Finds and returns the most frequently occurring color in the SVG data, skipping the specified color."""
        try:
            tree = ET.parse(BytesIO(svg_data))
            root = tree.getroot()
            colors = extract_colors(root)
            if colors:
                color_counts = Counter(colors)
                most_common = color_counts.most_common()
                for color, count in most_common:
                    if color.lower() != skip_color.lower():
                        return (color, count)
        except ET.ParseError as e:
            print(f"Error parsing SVG: {e}")
        return None

    try:
        response = requests.get(svg_url)
        response.raise_for_status()  # Raises HTTPError for bad responses
        svg_data = response.content
        result = most_frequent_color(svg_data)
        if result:
            return result[0]
        else:
            return "#ffffff"
    except requests.RequestException as e:
        print(f"Error fetching SVG: {e}")
        return "#ffffff"


# Example usage
svg_url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/14.svg'
print(get_color(svg_url))
