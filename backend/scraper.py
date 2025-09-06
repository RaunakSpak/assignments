import requests
from bs4 import BeautifulSoup

def scrape_news():
    url ="https://example.com"
    resposnse = requests.get(url)
    soup = BeautifulSoup(resposnse.text, 'html.parser')
    headlines = [a.get_text() for a in soup.select('.storylink')
[:10]]
    return headlines