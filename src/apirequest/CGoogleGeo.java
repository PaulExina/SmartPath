package apirequest;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

public class CGoogleGeo {
	private static final String RELATIVE_URI_Direction = "https://maps.googleapis.com/maps/api/geocode/";
	private static final String API_KEY = "AIzaSyAKHfRAUvhsDEqiPKn852ACeMSv7scJ-DA";
 
 
	// HTTP GET request
	public static JSONObject sendGet(String lat, String lng) throws Exception {
		
		String url = RELATIVE_URI_Direction+"json?latlng="+lat+","+lng+"&key="+API_KEY;
		
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 
		// optional default is GET
		con.setRequestMethod("GET");
 
 
		int responseCode = con.getResponseCode();
		
 
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();
 
		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
 
		//return result
		return new JSONObject(response.toString());
 
	}
	

	// HTTP GET request
	public static JSONObject sendGet(String address) throws Exception {
		
		String url = RELATIVE_URI_Direction+"json?address="+address+"&key="+API_KEY;
		
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 
		// optional default is GET
		con.setRequestMethod("GET");
 
 
		int responseCode = con.getResponseCode();
		
 
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();
 
		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
 
		//return result
		return new JSONObject(response.toString());
 
	}
}
