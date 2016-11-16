package database;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;

import org.json.JSONException;
import org.json.JSONObject;

public class DBCoordinates extends DBConnection {

	public DBCoordinates() throws InstantiationException,
			IllegalAccessException, ClassNotFoundException, SQLException,
			NamingException {
		super();
	}
	
	/**
	 * get the coordinates corresponding to the giving address
	 * @param email
	 * @param passwd
	 * @return
	 * @throws JSONException 
	 * @throws SQLException 
	 */
	public JSONObject getCoordinate (String address) throws JSONException {
		JSONObject resultJSON = new JSONObject();
		if(address != null && !address.isEmpty()){
			String query = "SELECT latitude, longitude FROM coordinates WHERE address='"+address+"'";
			
			try {
				ResultSet result_query = super.execQuery(query);
				if(result_query.next()){
					String latitude = result_query.getString(1);
					String longitude = result_query.getString(2);
					
					resultJSON.put("message", "success");
					JSONObject result = new JSONObject();
					result.put("address", address);
					result.put("latitude", latitude);
					result.put("longitude", longitude);
					resultJSON.put("result", result);
					
					resultJSON.put("error", "");
				}else {
					resultJSON.put("error", "");
					resultJSON.put("message", "not existing");
					resultJSON.put("result", new JSONObject());
				}
			} catch (SQLException e) {
				e.printStackTrace();
				resultJSON.put("error", e.getMessage());
				resultJSON.put("message", "fail");
				resultJSON.put("result", new JSONObject());
			}
			
		}else{
			resultJSON.put("error", "verification failed, check your parameters");
			resultJSON.put("message", "empty address");
			resultJSON.put("result", new JSONObject());
		}
		return resultJSON;
	}
	
	/**
	 * add address with coordinates to the database : table coordinates
	 * @param email
	 * @param passwd
	 * @throws SQLException
	 * @throws JSONException 
	 */
	public JSONObject addAccount (String address, String latitude, String longitude) throws SQLException, JSONException{
		JSONObject resultJSON = new JSONObject();
		if(address != null && !address.isEmpty() && latitude != null && !latitude.isEmpty() && longitude != null && !longitude.isEmpty()){
		
			String query = "INSERT INTO coordinates VALUES('"+address+"','"+latitude+"','"+longitude+"')";

			try{
				super.execQuery(query);
				resultJSON.put("error", "");
				resultJSON.put("message", "success");
			}catch(SQLException e){
				resultJSON.put("error", e.getMessage());
				resultJSON.put("message", "fail");
			}
			
		}else{
			resultJSON.put("error", "insert failed, check your parameters");
			resultJSON.put("message", "fail");
		}
		
		return resultJSON;
	}

}
