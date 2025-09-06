import requests
from bs4 import BeautifulSoup

def scrape_news():
    url = "https://news.ycombinator.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    headlines = [a.get_text() for a in soup.select(".titleline a")[:10]]
    return headlines