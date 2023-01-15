# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class SongscraperItem(scrapy.Item):
    Singer = scrapy.Field()
    SongName = scrapy.Field()
    Lyricist = scrapy.Field()
    Composer = scrapy.Field()
