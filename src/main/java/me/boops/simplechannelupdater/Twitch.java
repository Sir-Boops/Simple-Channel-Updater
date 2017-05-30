package me.boops.simplechannelupdater;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.conn.ssl.DefaultHostnameVerifier;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;

public class Twitch {
	
	private Config conf;
	
	public Twitch(Config confInt, String title, String game) throws Exception{
		
		// Load the config for this file
		this.conf = confInt;
		
		// Get the channel ID
		int channelID = getChannelID();
		
		// Try to set the title
		if(!title.isEmpty()){
			
			// We have a title to set
			setTitle(channelID, title);
		}
		
		// Try to set the title
		if(!game.isEmpty()){
			
			// We have a title to set
			setGame(channelID, game);
		}
		
	}
	
	private int getChannelID() throws Exception {
		
		// Get Twitch channel ID
		HttpClient client = HttpClients.custom().setSSLHostnameVerifier(new DefaultHostnameVerifier()).build();
		HttpGet get = new HttpGet("https://api.twitch.tv/kraken/channel");
		
		get.addHeader("Client-ID", conf.getTwitchClientID());
		get.addHeader("Authorization", "OAuth " + conf.getTwitchAuthToken());
		get.setHeader("Accept", "application/vnd.twitchtv.v5+json");
		
		HttpResponse res = client.execute(get);
		JSONObject meta = new JSONObject(new BasicResponseHandler().handleResponse(res));
		
		return meta.getInt("_id");
		
	}
	
	private void setTitle(int channelID, String channelTitle) throws Exception {
		
		// Set the channel title
		HttpClient client = HttpClients.custom().setSSLHostnameVerifier(new DefaultHostnameVerifier()).build();
		HttpPut get = new HttpPut("https://api.twitch.tv/kraken/channels/" + channelID);
		
		get.addHeader("Client-ID", conf.getTwitchClientID());
		get.addHeader("Authorization", "OAuth " + conf.getTwitchAuthToken());
		get.addHeader("Content-Type", "application/json");
		get.setHeader("Accept", "application/vnd.twitchtv.v5+json");
		
		// Create the JSON object
		JSONObject channel = new JSONObject();
		JSONObject status = new JSONObject();
		
		status.put("status", channelTitle);
		channel.put("channel", status);
		
		get.setEntity(new StringEntity(channel.toString()));
		HttpResponse res = client.execute(get);
		
		if(res.getStatusLine().getStatusCode() == 200){
			
			System.out.println("Twitch title set to: " + channelTitle);
			
		} else {
			System.out.println("Failed to set Twitch title!");
		}
		
	}
	
	private void setGame(int channelID, String game) throws Exception {
		
		// Set the channel title
		HttpClient client = HttpClients.custom().setSSLHostnameVerifier(new DefaultHostnameVerifier()).build();
		HttpPut get = new HttpPut("https://api.twitch.tv/kraken/channels/" + channelID);
		
		get.addHeader("Client-ID", conf.getTwitchClientID());
		get.addHeader("Authorization", "OAuth " + conf.getTwitchAuthToken());
		get.addHeader("Content-Type", "application/json");
		get.setHeader("Accept", "application/vnd.twitchtv.v5+json");
		
		// Create the JSON object
		JSONObject channel = new JSONObject();
		JSONObject status = new JSONObject();
		
		status.put("game", game);
		channel.put("channel", status);
		
		get.setEntity(new StringEntity(channel.toString()));
		HttpResponse res = client.execute(get);
		
		if(res.getStatusLine().getStatusCode() == 200){
			
			System.out.println("Twitch game set to: " + game);
			
		} else {
			System.out.println("Failed to set Twitch game!");
		}
		
	}
}
