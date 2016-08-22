# mbmbam
A tagger site for MBMBaM


## Architecture:

* RSS Parser will use the official MBMBaM rss feed for the source of episodes
* Duplicated into a database.

Episode schema:

* Title, string
* Number, number
* Description, string
* mp3 link, string
* date, date
* Clips, collection of Clips

Clip schema:

* Episode number, number
* In point (seconds from start), number
* Out point (seconds from start), number
* MVP, Brother

Brother schema:

* Name, string
* Best clips, collection of Clips
* Episodes, collection of Episodes
* Description, string
