import scrapy
from songscraper.items import SongscraperItem
from mtranslate import translate


def translation_array(stringArray):
    translated_array = []
    for string in stringArray:
        translated_array.append(translate(string, 'si', 'en'))
    return translated_array


class SongsScraper(scrapy.Spider):
    name = "my_scraper"
    initial_url = "https://www.lklyrics.com/artist"
    artists = ['edward_jayakody', 't_m_jayarathna',
               'sunil_edirisinghe', 'karunarathna_divulgane', 'amarasiri_peiris', 'amaradewa_w_d', 'nanda_malani', 'victor_rathnayake']

    start_urls = []

    for i in artists:
        start_urls.append(
            "https://www.lklyrics.com/artist/"+i)

    def parse(self, response):
        edward_songs = [23, 78]
        t_m_songs = [2, 8, 10, 12, 22, 27, 38, 61, 68, 72, 73]
        sunil_songs = [5, 15, 26, 28, 49, 58, 79, 103, 111]
        karunarathna_songs = [3, 5, 7, 11, 12,
                              21, 23, 31, 52, 60, 69, 84, 85, 97]
        amarasiri_songs = [4, 14, 16, 17, 24, 25, 31,
                           46, 47, 53, 54, 55, 62, 73, 78, 79, 80]
        amaradeva_songs = [10, 14, 25, 27, 28, 30, 42, 51, 52, 56, 61, 66, 67,
                           78, 79, 80, 88, 93, 94, 95, 97, 98, 101, 102, 113, 119, 137, 143, 144]
        nanda_malin_songs = [29, 48, 53, 71, 81, 106, 109, 133, 144, 156, 169]
        victor_songs = [3, 8, 12, 18, 20, 23, 26]
        song_indexes = []

        if ('edward_jayakody' in response.request.url):
            song_indexes = edward_songs
        elif ('t_m_jayarathna' in response.request.url):
            song_indexes = t_m_songs
        elif ('sunil_edirisinghe' in response.request.url):
            song_indexes = sunil_songs
        elif ('karunarathna_divulgane' in response.request.url):
            song_indexes = karunarathna_songs
        elif ('amarasiri_peiris' in response.request.url):
            song_indexes = amarasiri_songs
        elif ('amaradewa_w_d' in response.request.url):
            song_indexes = amaradeva_songs
        elif ('nanda_malani' in response.request.url):
            song_indexes = nanda_malin_songs
        elif ('victor_rathnayake' in response.request.url):
            song_indexes = victor_songs
        for i in song_indexes:
            for href in response.xpath("//div[3]//div[2]/a[" + str(i)+"]//@href"):
                url = href.extract()
                yield scrapy.Request(url, callback=self.parse_dir_contents)

    def parse_dir_contents(self, response):
        item = SongscraperItem()

	# Getting singer
        singer = response.xpath(
	    "//div[2]//div[1]//table//tbody//tr[1]//td//a/text()").extract()
        item['Singer'] = translation_array(singer)

        # Getting song name
        SongName = response.xpath("//div[2]//h1/text()").extract()
        item['SongName'] = translation_array(SongName)

        # Getting lyricist
        lyricist = response.xpath(
	    "//div[2]//div[1]//table//tbody//tr[3]//td//a/text()").extract()
        if len(lyricist) != 0:
            item['Lyricist'] = translation_array(lyricist)
        else:
            item['Lyricist'] = 'නොදනී'

        # Getting composer
        composer = response.xpath(
	    "//div[2]//div[1]//table//tbody//tr[2]//td//a/text()").extract()
        if len(composer) != 0:
            item['Composer'] = translation_array(composer)
        else:
            item['Composer'] = 'නොදනී'

        yield item
