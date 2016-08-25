var FeedParser = require('feedparser')
  , request = require('request');

var feedReq = request('http://feeds.feedburner.com/mbmbam')
  , feedparser = new FeedParser();

feedReq.on('error', function (error) {
  // handle any request errors
});
feedReq.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
	console.log(error);
});
feedparser.on('readable', function() {
  // This is where the action is!
    
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;
	
  while (item = stream.read()) {

	  var formData = {
		  "title": item.title,
		  "description": item.description,
		  "mp3": item.enclosures[0].url,
		  "publication_date": item.pubDate
	  };
	  //console.log(postItem);
	  
	  
	  request({
		  uri: 'http://localhost:3000/parser',
		  method: 'POST',
		  form: {
			  title: item.title,
			  description: item.description,
			  mp3: item.enclosures[0].url,
			  publication_date: item.pubDate
		  }, function(error, response, body) {
			  if (err) {
				  return console.error('upload failed', err);
			  }
			  console.log(JSON.stringify(formData));
			  console.log('Upload successful! Server responded with: ', body);
		  }
	  });


  }
  
});