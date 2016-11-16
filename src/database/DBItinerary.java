package database;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class DBItinerary extends DBConnection{

	public DBItinerary() throws InstantiationException, IllegalAccessException,
			ClassNotFoundException, SQLException, NamingException {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * Return json corresponding to the results of asking the database about itinerary between two points (origin, destination) 
	 * using a transport mode (can be null)
	 * @param origin 
	 * @param destination
	 * @param mode : can be set to null 
	 * @return
	 * @throws JSONException 
	 */
	public JSONObject getItinerary (String origin, String destination, String mode) throws JSONException{
		JSONObject resultJSON = new JSONObject();
		if(origin != null && !origin.isEmpty() && destination != null && !destination.isEmpty()){
			String query = "SELECT * FROM itinerary WHERE origin='"+origin+"' AND destination='"+destination+"' ";
			if(mode != null && !mode.isEmpty())
				query += "AND mode='"+mode+"'";
			
			try {
				ResultSet result_query = super.execQuery(query);
				int rows = 0;
				JSONArray jarray = new JSONArray();
				while(result_query.next()){
					JSONObject j = new JSONObject();
					j.put("origin", result_query.getString("origin"));
					j.put("destination", result_query.getString("destination"));
					j.put("mode", result_query.getString("mode"));
					j.put("content", result_query.getString("content"));
					
					jarray.put(j);
					rows++;
				}
				
				resultJSON.put("results", jarray);
				resultJSON.put("rows", rows);
				resultJSON.put("error", "");
				
			} catch (SQLException e) {
				resultJSON.append("error", e.getMessage());
			}
		}else
			resultJSON.put("error", "invalide origin or destination, cannot execute query");
		
		return resultJSON;
	}
	
	/**
	 * Insert a row in the database with the values in parameter 
	 * @param origin
	 * @param destination
	 * @param mode
	 * @param content
	 * @return boolean 
	 * @throws JSONException 
	 */
	public JSONObject setItinerary(String origin, String destination, String mode, String content) throws JSONException{
		JSONObject resultJSON  = new JSONObject();
		if(origin != null && !origin.isEmpty() && destination != null && !destination.isEmpty() && mode != null
			&& !mode.isEmpty() && content != null && !content.isEmpty()
			){
			String query = "INSERT INTO itinerary VALUES ('"+origin+"','"+destination+"','"+mode+"','"+content+"') "
							+"ON DUPLICATE KEY UPDATE content='"+content+"'";
			try{
				super.execQuery(query);
				resultJSON.append("error", "");
				resultJSON.append("message", "insert success");
			}catch(SQLException e){
				resultJSON.append("error", e.getMessage());
				resultJSON.append("message", "");
			}
		}else{
			resultJSON.append("error", "insert failed, check your parameters");
			resultJSON.append("message", "");
		}
		
		return resultJSON;
	}
	
}
