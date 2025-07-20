from urllib.request import urlopen
from bs4 import BeautifulSoup

import re


def get_html(url):
    with urlopen(url) as response:
        soup = BeautifulSoup(response, "html.parser")
        for anchor in soup.find_all("a"):
            print(anchor.get("href", "/"))

            
get_html("https://www.myinstants.com/nl/index/be/")