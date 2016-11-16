package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import database.DBAccounts;
import encrypt.HashEncrypt;

/**
 * Servlet implementation class AddUser
 */
@WebServlet("/AddUserServlet")
public class AddUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddUserServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		
		// get request parameters for userID and password
        String email = request.getParameter("email");
        String pwd = request.getParameter("pwd");
        String firstname = request.getParameter("firstname");
        String lastname = request.getParameter("lastname");
   
        PrintWriter out = response.getWriter();
        
        DBAccounts accounts;
		try {
			accounts = new DBAccounts();
			
			if(pwd != null)
				pwd = HashEncrypt.encrypt(pwd);
			
			JSONObject resp = accounts.addAccount(email, pwd, firstname, lastname);
			
			if(resp.get("message").equals("success")){
	            HttpSession session = request.getSession();
	            session.setAttribute("user", email);
	            //setting session to expiry in 30 mins
	            session.setMaxInactiveInterval(30*60);
	            Cookie userName = new Cookie("user", email);
	            userName.setMaxAge(30*60);
	            response.addCookie(userName);
	            out.print(resp.toString());
		    }else
		        out.print(resp.toString());
		    
			accounts.destroy();
		} catch (Exception e) {
			e.printStackTrace();
			out.print("{error : "+e.getMessage()+"}");
		}
		
		out.close();
	}

}
