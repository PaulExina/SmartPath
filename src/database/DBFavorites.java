package database;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;

import org.json.JSONException;
import org.json.JSONObject;

public class DBFavorites extends DBConnection{

	public DBFavorites() throws InstantiationException, IllegalAccessException,
			ClassNotFoundException, SQLException, NamingException {
		super();
	}
	
	public JSONObject addAddress (String email, String address) throws JSONException{
		JSONObject resultJSON = new JSONObject();
		if(email != null && !email.isEmpty() && address != null && !address.isEmpty()){
			String query = "INSERT INTO favorites VALUES('"+email+"','"+address+"') ON DUPLICATE KEY UPDATE address='"+address+"'";
			
			try {
				super.execQuery(query);
				resultJSON.put("error", "");
				resultJSON.put("message", "success");
			} catch (SQLException e) {
				e.printStackTrace();
				resultJSON.put("error", e.getMessage());
				resultJSON.put("message", "");
			}
			
		}else{
			resultJSON.put("error", "insert failed, check your parameters");
			resultJSON.put("message", "");
		}
		
		return resultJSON;
	}
	
	
	public JSONObject getAddress (String email) throws JSONException{
		JSONObject resultJSON = new JSONObject();
		if(email != null && !email.isEmpty()){
			String query = "SELECT * FROM favorites WHERE email='"+email+"'";
			
			try {
				ResultSet result_query = super.execQuery(query);
				JSONObject myJSON = new JSONObject();
				if(result_query.next())
					myJSON.put("address", new JSONObject(result_query.getString("address")));
				else
					myJSON.put("address", new JSONObject());
				resultJSON.put("result", myJSON);
				resultJSON.put("error", "");
				
			} catch (SQLException e) {
				e.printStackTrace();
				resultJSON.put("result", "");
				resultJSON.put("error", e.getMessage());
			}
		}else{
			resultJSON.put("result", "");
			resultJSON.put("error", "Email empty");
		}
				
		return resultJSON;
	}
}
