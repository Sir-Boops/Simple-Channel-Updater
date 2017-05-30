package me.boops.simplechannelupdater;

public class Main {
	
	public static void main(String[] args) throws Exception{
		
		// Load the config
		Config conf = new Config();
		
		new Twitch(conf, "test2", "Yo Mamma");
		
	}
}
