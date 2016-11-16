package apirequest;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.json.JSONObject;

public class Navitia {
	private static final String RELATIVE_URI_Direction = "http://api.navitia.io/v1/journeys";
	private static final String API_KEY = "80e9e11b-dafa-499d-921f-88863a8a3b6b";
 
 
	// HTTP GET request
	public static JSONObject sendGet(String origin, String destination, String departTime) throws Exception {
		
		//String url =RELATIVE_URI_Direction+"?from="+origin+"&to="+destination+"datetime="+departTime+"&datetime_represents=departure&key="+API_KEY;
		String url = RELATIVE_URI_Direction+"?from="+URLEncoder.encode(origin, "UTF-8")+"&to="+URLEncoder.encode(destination, "UTF-8")+"&datetime="+URLEncoder.encode(departTime,"UTF-8")+"&datetime_represents=departure";
		
		URL obj = new URL(url);
		
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 
		// optional default is GET
		con.setRequestMethod("GET");
		con.setRequestProperty("Authorization", API_KEY);
 
 
		int responseCode = con.getResponseCode();
 
		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
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
