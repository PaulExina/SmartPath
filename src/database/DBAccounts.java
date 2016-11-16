package database;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;

import org.json.JSONException;
import org.json.JSONObject;

public class DBAccounts extends DBConnection{

	public DBAccounts() throws InstantiationException, IllegalAccessException,
			ClassNotFoundException, SQLException, NamingException {
		super();
	}
	
	/**
	 * change the password of the given email with the given password
	 * @param email
	 * @param pwd
	 * @return
	 * @throws JSONException 
	 */
	public JSONObject changePwd(String email, String pwd) throws JSONException{
		JSONObject resultJSON = new JSONObject();
		if(email != null && !email.isEmpty() && pwd != null && !pwd.isEmpty()){
			String query = "UPDATE accounts SET passwd='"+pwd+"' WHERE email='"+email+"'";
			
			
			try {
				super.execQuery(query);
				resultJSON.put("error", "");
				resultJSON.put("message", "success");
			} catch (SQLException e) {
				e.printStackTrace();
				resultJSON.put("error", e.getMessage());
				resultJSON.put("message", "fail");
			}
		}else{
			resultJSON.put("error", "insert failed, check your parameters");
			resultJSON.put("message", "");
		}
		
		return resultJSON;
	}
	
	/**
	 * confirm if this email exists or not
	 * @param email
	 * @return
	 * @throws JSONException
	 */
	public boolean emailExists(String email) throws JSONException{
		String query = "SELECT 1 FROM accounts WHERE email='"+email+"'";
		
		try {
			ResultSet result_query = super.execQuery(query);
			if(result_query.next()){
				return false;
			}else
				return true;
			
		} catch (SQLException e) {
			e.printStackTrace();
			return true;  
		}
		
	}
	
	
	/**
	 * tests if this account exists in the database
	 * @param email
	 * @param passwd
	 * @return
	 * @throws JSONException 
	 * @throws SQLException 
	 */
	public JSONObject getAccount (String email, String passwd) throws JSONException {
		JSONObject resultJSON = new JSONObject();
		if(email!= null && !email.isEmpty() && passwd != null && !passwd.isEmpty()){
			String query = "SELECT * FROM accounts WHERE email='"+email+"' AND passwd='"+passwd+"'";
			
			try {
				ResultSet result_query = super.execQuery(query);
				if(result_query.next()){
					String resp_email = result_query.getString(1);
					String resp_firstname = result_query.getString(3);
					String resp_lastname = result_query.getString(4);
					
					resultJSON.put("message", "success");
					JSONObject result = new JSONObject();
					result.put("email", resp_email);
					result.put("firstname", resp_firstname);
					result.put("lastname", resp_lastname);
					resultJSON.put("result", result);
					
					resultJSON.put("error", "");
				}else {
					resultJSON.put("error", "");
					resultJSON.put("message", "Wrong email or password");
					resultJSON.put("result", "");
				}
			} catch (SQLException e) {
				e.printStackTrace();
				resultJSON.put("error", e.getMessage());
				resultJSON.put("message", "");
				resultJSON.put("result", "");
			}
			
		}else{
			resultJSON.put("error", "verification failed, check your parameters");
			resultJSON.put("message", "Wrong email or password");
			resultJSON.put("result", "");
		}
		return resultJSON;
	}
	
	/**
	 * add accout to database
	 * @param email
	 * @param passwd
	 * @throws SQLException
	 * @throws JSONException 
	 */
	public JSONObject addAccount (String email, String passwd, String firstname, String lastname) throws SQLException, JSONException{
		JSONObject resultJSON = new JSONObject();
		if(email != null && !email.isEmpty() && passwd != null && !passwd.isEmpty()){
		
			String query = "INSERT INTO accounts VALUES('"+email+"','"+passwd+"','"+firstname+"','"+lastname+"')";

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
			resultJSON.put("message", "empty parameters");
		}
		
		return resultJSON;
	}
		
}
