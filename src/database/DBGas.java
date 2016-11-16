package database;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;

import org.json.JSONException;
import org.json.JSONObject;

public class DBGas extends DBConnection {

	public DBGas() throws InstantiationException, IllegalAccessException,
			ClassNotFoundException, SQLException, NamingException {
		super();
	}
	
	/**
	 * get the price corresponding to the giving date
	 * @param email
	 * @param passwd
	 * @return
	 * @throws JSONException 
	 * @throws SQLException 
	 */
	public JSONObject getGasPrice (String date) throws JSONException {
		JSONObject resultJSON = new JSONObject();
		if(date != null && !date.isEmpty()){
			String query = "SELECT price FROM gas WHERE date='"+date+"'";
			
			try {
				ResultSet result_query = super.execQuery(query);
				if(result_query.next()){
					String price = result_query.getString(1);
					
					resultJSON.put("message", "success");
					JSONObject result = new JSONObject();
					result.put("price", price);
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
			resultJSON.put("message", "empty date");
			resultJSON.put("result", new JSONObject());
		}
		return resultJSON;
	}
	
	/**
	 * add date with corresponding price to the database
	 * @param email
	 * @param passwd
	 * @throws SQLException
	 * @throws JSONException 
	 */
	public JSONObject addGasPrice (String date, String price) throws SQLException, JSONException{
		JSONObject resultJSON = new JSONObject();
		if(date != null && !date.isEmpty() && price != null && !price.isEmpty()){
		
			String query = "INSERT INTO gas VALUES('"+date+"','"+price+"')";

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
