package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import database.DBAccounts;
import database.DBFavorites;
import encrypt.HashEncrypt;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
    }


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		
		// get request parameters for userID and password
        String email = request.getParameter("email");
        String pwd = request.getParameter("pwd");
   
        PrintWriter out = response.getWriter();
        
        DBAccounts accounts;
		try {
			accounts = new DBAccounts();
			
			if(pwd != null)
				pwd = HashEncrypt.encrypt(pwd);
			
			JSONObject account_resp = accounts.getAccount(email, pwd); //check if the account exists 
			
			//getting addresses 
			if(account_resp.getString("message").equals("success")){
				DBFavorites favorites = new DBFavorites();
				JSONObject favorites_resp = favorites.getAddress(email);
				if(favorites_resp.getString("error").equals("")){
					JSONObject addressJSON = favorites_resp.getJSONObject("result").getJSONObject("address");
					account_resp.getJSONObject("result").put("address", addressJSON);
				}
			}
			
			response.setStatus(HttpServletResponse.SC_OK);
			
	        out.print(account_resp);
	        
			out.flush();
			
			accounts.destroy();
	        
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			out.print("{error : "+e.getMessage()+"}");
			out.flush();
		}
		
		out.close();
        
	}

}
