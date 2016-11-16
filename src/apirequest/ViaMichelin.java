package apirequest;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.json.JSONObject;

public class ViaMichelin {
	private static final String RELATIVE_URI_Direction = "http://apir.viamichelin.com/apir/1/";
	private static final String API_KEY = "RESTGP20141030185043745493055899";

	// HTTP GET request
	
	
	public static JSONObject sendGet(String pays, String ville)
			throws Exception {

		String url = RELATIVE_URI_Direction + "geocode4f.xml?country="
				+ URLEncoder.encode(pays, "UTF-8") + "&city="
				+ URLEncoder.encode(ville, "UTF-8") + "&authkey="
				+ URLEncoder.encode(API_KEY, "UTF-8");
		URL obj = new URL(url);

		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");
		// con.setRequestProperty("Authorization", API_KEY);

		int responseCode = con.getResponseCode();
		

		BufferedReader in = new BufferedReader(new InputStreamReader(
				con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//System.out.println(response);

		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(new ByteArrayInputStream(response
				.toString().getBytes()));
		Element root = doc.getRootElement();

		Element lon = root.getChild("locationList").getChild("item")
				.getChild("location").getChild("coords").getChild("lon");

		Element lat = root.getChild("locationList").getChild("item")
				.getChild("location").getChild("coords").getChild("lat");

		JSONObject result = new JSONObject();
		result.append("lon", lon.getValue());
		result.append("lat", lat.getValue());

		//System.out.println("JSON construit : " + result.toString());

		return result;

	}
	
	public static JSONObject sendGet(String pays, String ville, String adresse)
			throws Exception {

		// http://apir.viamichelin.com/apir/1/geocode4f.xml?country=fra&city=nice&address=10%20promenade%20des%20anglais&authkey=MY_ID
		// String url
		// =RELATIVE_URI_Direction+"?from="+origin+"&to="+destination+"datetime="+departTime+"&datetime_represents=departure&key="+API_KEY;
		String url = RELATIVE_URI_Direction + "geocode4f.xml?country="
				+ URLEncoder.encode(pays, "UTF-8") + "&city="
				+ URLEncoder.encode(ville, "UTF-8") + "&address="
				+ URLEncoder.encode(adresse, "UTF-8") + "&authkey="
				+ URLEncoder.encode(API_KEY, "UTF-8");
		URL obj = new URL(url);

		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");
		// con.setRequestProperty("Authorization", API_KEY);

		int responseCode = con.getResponseCode();
		

		BufferedReader in = new BufferedReader(new InputStreamReader(
				con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//System.out.println(response);

		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(new ByteArrayInputStream(response
				.toString().getBytes()));
		Element root = doc.getRootElement();

		Element lon = root.getChild("locationList").getChild("item")
				.getChild("location").getChild("coords").getChild("lon");

		Element lat = root.getChild("locationList").getChild("item")
				.getChild("location").getChild("coords").getChild("lat");

		JSONObject result = new JSONObject();
		result.append("lon", lon.getValue());
		result.append("lat", lat.getValue());

		//System.out.println("JSON construit : " + result.toString());

		return result;

	}

	// http://apir.viamichelin.com/apir/1/route.{output}/{lg}[/{data}]?steps={dep};[{steps};]{arr}&veht={veht}&itit={itit}&favMotorways={favMotorways}&avoidBorders={avoidBorders}&avoidTolls={avoidTolls}&avoidCCZ={avoidCCZ}&avoidORC={avoidORC}&multipleIti={multipleIti}&itiIdx={itiIdx}&distUnit={distUnit}&fuelConsump={fuelConsump}&fuelCost={fuelCost}&date={date}¤cy={currency}&authkey={authkey}&charset={charset}&ie={ie}&callback={callback}&signature={signature}

	// http://apir.viamichelin.com/apir/1/route.xml/FRA/?steps=3:e:MY_LOCID;2:e:MY_DB:MY_POIID&authkey=MY_KEY

	// HTTP GET request
	public static JSONObject sendGet(String dep_lon, String dep_lat,
			String ar_lon, String ar_lat, String critere) throws Exception {

		// http://apir.viamichelin.com/apir/1/geocode4f.xml?country=fra&city=nice&address=10%20promenade%20des%20anglais&authkey=MY_ID
		// String url
		// =RELATIVE_URI_Direction+"?from="+origin+"&to="+destination+"datetime="+departTime+"&datetime_represents=departure&key="+API_KEY;

		String url = RELATIVE_URI_Direction + "route.xml/fra/?steps=1:e:"
				+ URLEncoder.encode(dep_lon, "UTF-8") + ":"
				+ URLEncoder.encode(dep_lat, "UTF-8") + ";1:e:"
				+ URLEncoder.encode(ar_lon, "UTF-8") + ":"
				+ URLEncoder.encode(ar_lat, "UTF-8") + "&itit="
				+ URLEncoder.encode(critere, "UTF-8")
				// +"&fuelConsump="+Float.toString(fuel50)+":"+Float.toString(fuel90)+":"+Float.toString(fuel120)
				+ "&authkey=" + URLEncoder.encode(API_KEY, "UTF-8");
		URL obj = new URL(url);

		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");
		
		// con.setRequestProperty("Authorization", API_KEY);

		int responseCode = con.getResponseCode();


		/*BufferedReader in = new BufferedReader(new InputStreamReader(
				con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();*/
		
		
		
		InputStream is = con.getInputStream();
		InputStreamReader streader = new InputStreamReader(is,"ISO-8859-1");
		StringWriter swriter = new StringWriter();
		char[] buf = new char[4096];
		int len;
		while((len=streader.read(buf)) >= 0){
			swriter.write(buf,0,len);
		}
		
		StringBuffer response = swriter.getBuffer();
		
		SAXBuilder builder = new SAXBuilder();
		/*Document doc = builder.build(new ByteArrayInputStream(response
				.toString().getBytes()));*/
		Document doc = builder.build(new StringReader(response.toString()));

		Element root = doc.getRootElement();
		JSONObject result = new JSONObject();

		Element distTotale = root.getChild("iti").getChild("header").getChild("summaries")
				.getChild("summary").getChild("totalDist");

		result.append("distTotale", distTotale.getValue());

		Element tempsTotal = root.getChild("iti").getChild("header").getChild("summaries")
				.getChild("summary").getChild("totalTime");

		result.append("tempsTotal", tempsTotal.getValue());

		Element quantiteEssence = root.getChild("iti").getChild("header").getChild("summaries")
				.getChild("summary").getChild("consumption");
		result.append("quantiteEssence", quantiteEssence.getValue());
		
		Element prixPeages = root.getChild("iti").getChild("header").getChild("summaries")
				.getChild("summary").getChild("tollCost").getChild("car");
		result.append("prixPeages", prixPeages.getValue());

		List<Element> steps = root.getChild("iti").getChild("roadSheet")
				.getChild("roadSheetStepList").getChildren("roadSheetStep");
		JSONObject etapes = new JSONObject();
		for (int i = 0; i < steps.size(); i++) {
			JSONObject etape = new JSONObject();
			Element e = steps.get(i);
			Element lon = e.getChild("coords").getChild("lon");
			Element lat = e.getChild("coords").getChild("lat");
			Element dist = e.getChild("distance");
			Element duree = e.getChild("duration");
			Element instr = e.getChild("instructions");
			etape.append("lon", lon.getValue());
			etape.append("lat", lat.getValue());
			etape.append("distance", dist.getValue());
			etape.append("duree", duree.getValue());
			etape.append("instruction", instr.getValue());
			etapes.append("etape", etape);
		}
		result.append("etapes", etapes);

		return result;

	}
}
