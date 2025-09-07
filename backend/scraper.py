import requests  # For making HTTP requests
from bs4 import BeautifulSoup  # For parsing HTML

def scrape_news():
    # URL of the website to scrape
    url = "https://news.ycombinator.com/"
    # Send a GET request to the URL
    response = requests.get(url)
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, "html.parser")
    # Extract the text of the first 10 news headlines
    headlines = [a.get_text() for a in soup.select(".titleline a")[:10]]
    return headlines  # Return the list of headlines