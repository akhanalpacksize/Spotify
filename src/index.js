//user authentication 

DOMO.log(metadata.account.accesstoken)

if (metadata.account.accesstoken){
  auth.authenticationSuccess();
}
else{
  auth.authenticationFailed('Authentication failed');
}


//setting values 

token = metadata.account.accesstoken;
// DOMO.log(metadata.account.accesstoken)

report = metadata.report;
url = "http://api.spotify.com"

// DOMO.log(metadata)

//http requests

httprequest.addHeader('Accept', 'application/json');
httprequest.addHeader('Content-Type', 'application/json');
httprequest.addHeader('Authorization', 'Bearer ' + token);

  switch (report) {
    case 'Me':
      url_me = "/v1/me";
      url_send= url+ url_me;
      user_str = httprequest.get(url_send);
      user_obj = JSON.parse(user_str)
      
      final = {
        name: user_obj.display_name,
        spotify_url: user_obj.external_url,
        followers: user_obj.followers.total,
        spotify_id: user_obj.id,
        image_url: user_obj.images[0].url
      }
      break;
  
  case "My Top Tracks": 
    url_tracks = "/v1/me/top/tracks"
    send_url = url + url_tracks;
    
    tracks_str = httprequest.get(send_url)
    tracks_obj = JSON.parse(tracks_str);
    
    final = tracks_obj.items
    
    break;
    }
    
DOMO.log(final)
datagrid.magicParseJSON(final);

