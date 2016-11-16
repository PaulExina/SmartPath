package database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import javax.sql.DataSource;

public class DBConnection {
	
	private Connection connection;
	
	/**
	 * Construct a DBConnection 
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 * @throws NamingException 
	 */
	public DBConnection() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, NamingException{	
		Context initContext = new InitialContext();
		Context envContext  = (Context)initContext.lookup("java:/comp/env");
		DataSource ds = (DataSource)envContext.lookup("jdbc/darDB");
		this.connection = ds.getConnection();
	}
	
	/**
	 * Destroy connection to DB
	 * @throws SQLException
	 */
	public void destroy() throws SQLException{
		this.connection.close();
	}
	
	/**
	 * 
	 * @param query
	 * @return
	 * @throws SQLException 
	 */
	public ResultSet execQuery(String query) throws SQLException{
		Statement st = connection.createStatement();
		st.execute(query);	
		return st.getResultSet();
	}
	
	public static void main (String [] args) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, NamingException{
		DBConnection c = new DBConnection();
		
		//ResultSet result_query = c.execQuery("INSERT INTO itinerary VALUES ('Bruxelle', 'Paris', 'FOOT', '{this is just a test}')");
		
		ResultSet result_query2 = c.execQuery("SELECT * FROM itinerary");
		
		while(result_query2.next()){
			System.out.println("origine : "+result_query2.getString("origin")
					+"\ndestination : "+result_query2.getString("destination")
					+"\nmode : "+result_query2.getString("mode")
					+"\ncontent : "+result_query2.getString("content"));
		}
	}
	
}
