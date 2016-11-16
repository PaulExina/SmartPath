package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import database.DBCoordinates;
import apirequest.CGoogleGeo;

@WebServlet("/CoordServlet")
public class CoordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 /**
     * @see HttpServlet#HttpServlet()
     */
    public CoordServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");

		String address = request.getParameter("address");
		
		PrintWriter out  = response.getWriter();
		try {
			JSONObject final_result;
			
			if(address != null && !address.isEmpty()){
				
				DBCoordinates coordinates = new DBCoordinates();
				JSONObject db_result = coordinates.getCoordinate(address);
				
				if(db_result.getString("message").equals("success")){
					out.print(db_result);
				}else{
					//getting coordinates from google
					JSONObject google_result;
					google_result = CGoogleGeo.sendGet(address);
					String latitude = google_result.getJSONArray("results").getJSONObject(0).getJSONObject("geometry").getJSONObject("location").getDouble("lat")+"";
					String longitude = google_result.getJSONArray("results").getJSONObject(0).getJSONObject("geometry").getJSONObject("location").getDouble("lng")+"";
					//adding to the database
					coordinates.addAccount(address, latitude, longitude);
					//constructing the final result
					final_result= new JSONObject();
					final_result.put("message", "success");
					final_result.put("error", "");
					JSONObject coord_json = new JSONObject();
					coord_json.put("address", address);
					coord_json.put("latitude", latitude);
					coord_json.put("longitude", longitude);
					final_result.put("result", coord_json);
					out.print(final_result);
				}
				coordinates.destroy();
			}else{
				final_result = new JSONObject();
				final_result.put("message", "fail");
				final_result.put("error", "empty address, please check your parameters");
				final_result.put("result", new JSONObject());
				out.print(final_result);
			}
			
			response.setStatus(HttpServletResponse.SC_OK);
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			out.println("{error :"+e.getMessage()+"}");
		}
		
		out.flush();
		out.close();
	
	}
	
}
