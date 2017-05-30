package me.boops.simplechannelupdater;

import java.io.BufferedReader;
import java.io.FileReader;

import org.json.JSONObject;

public class Config {
	
	private String twitchClientID;
	private String twitchClientSec;
	private String twitchAuthToken;
	
	
	public Config(){
		
		StringBuilder sb = new StringBuilder();
		
		try {
			
			BufferedReader br = new BufferedReader(new FileReader("config.json"));
			String line = br.readLine();
			while(line != null){
				sb.append(line);
				line = br.readLine();
			}
			
			br.close();
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		JSONObject config = new JSONObject(sb.toString());
		
		// Get Twitch Strings
		this.twitchClientID = config.getJSONObject("twitch").getString("clientID");
		this.twitchClientSec = config.getJSONObject("twitch").getString("clientSec");
		this.twitchAuthToken = config.getJSONObject("twitch").getString("authToken");
		
	}
	
	public String getTwitchClientID(){
		return this.twitchClientID;
	}
	
	public String getTwitchClientSec(){
		return this.twitchClientSec;
	}
	
	public String getTwitchAuthToken(){
		return this.twitchAuthToken;
	}
}
