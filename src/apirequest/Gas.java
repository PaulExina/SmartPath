package apirequest;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.List;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.ProcessingInstruction;
import org.jdom2.input.SAXBuilder;
import org.json.JSONObject;

import UnzipUtility.UnzipUtility;

public class Gas {

	private static final String RELATIVE_URI_Direction = "http://donnees.roulez-eco.fr/opendata/jour/";

	// HTTP GET request
	public static JSONObject sendGet(String date) throws Exception {

		// http://apir.viamichelin.com/apir/1/geocode4f.xml?country=fra&city=nice&address=10%20promenade%20des%20anglais&authkey=MY_ID
		// String url
		// =RELATIVE_URI_Direction+"?from="+origin+"&to="+destination+"datetime="+departTime+"&datetime_represents=departure&key="+API_KEY;
		String url = RELATIVE_URI_Direction + URLEncoder.encode(date, "UTF-8");
		URL obj = new URL(url);
		//System.out.println(url);

		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestProperty("Accept-Charset", "gzip, deflate");
		con.setRequestProperty("Content-Type", "application/zip;charset=binary");

		// optional default is GET
		con.setRequestMethod("GET");
		// con.setRequestProperty("Authorization", API_KEY);

		int responseCode = con.getResponseCode();
		//System.out.println("\nSending 'GET' request to URL : " + url);
		//System.out.println("Response Code : " + responseCode);

		InputStream zip = con.getInputStream();

		InputStream unzipped = null;
		UnzipUtility unzipper = new UnzipUtility();
		try {
			unzipped = unzipper.unzip(zip);
		} catch (Exception ex) {
			// some errors occurred
			ex.printStackTrace();
		}
		// System.out.println("ICI "+unzipped.toString());
		/*
		 * BufferedReader in = new BufferedReader(new
		 * InputStreamReader(unzipped));
		 * 
		 * String inputLine; StringBuffer response = new StringBuffer();
		 * 
		 * BufferedWriter bwr = new BufferedWriter(new OutputStreamWriter(new
		 * FileOutputStream(
		 * "/home/meo/DAR_PROJET/webapp_project1/src/apirequest/test.xml"),
		 * "UTF-8")); while ((inputLine = in.readLine()) != null) {
		 * //inputLine.replaceAll(regex, replacement)
		 * response.append(inputLine); bwr.write(inputLine);
		 * System.out.println(inputLine); } in.close(); unzipped.close();
		 * 
		 * 
		 * 
		 * // write contents of StringBuffer to a file
		 * 
		 * 
		 * // flush the stream bwr.flush();
		 * 
		 * // close the stream bwr.close();
		 * //System.out.println(response.toString());
		 */

		InputStreamReader streader = new InputStreamReader(unzipped, "UTF-8");
		StringWriter swriter = new StringWriter();
		char[] buf = new char[4096];
		int len;
		while ((len = streader.read(buf)) >= 0) {
			swriter.write(buf, 0, len);
		}
		StringBuffer response = swriter.getBuffer();

		JSONObject result = new JSONObject();

		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(new StringReader(response.toString()));
		// doc.addContent(new ProcessingInstruction("encoding","ISO-8859-1"));
		// Document doc = builder.build(new ByteArrayInputStream(response
		// .toString().getBytes()));
		Element root = doc.getRootElement();
		double prix = 0;
		double pond = 0;
		List<Element> pdvs = root.getChildren("pdv");
		for (int i = 0; i < pdvs.size(); i++) {
			Element pdv = pdvs.get(i);
			List<Element> carbus = pdv.getChildren("prix");
			for (int j = 0; j < carbus.size(); j++) {
				Element carbu = carbus.get(j);
				// System.out.println(carbu.toString());
				if (carbu.getAttributeValue("nom") != null) {
					// System.out.println(carbu.getAttributeValue("nom").toString());

					if (carbu.getAttributeValue("nom").toString()
							.contentEquals("SP95")) {
						String val = carbu.getAttributeValue("valeur");
						prix += Double.parseDouble(val);
						pond += 1;
					}

				}
			}
		}
		prix = prix / 1000.0;
		prix = prix / pond;
		result.append("prix", prix);
		// System.out.println("JSON construit : " + result.toString());

		return result;

	}
}
