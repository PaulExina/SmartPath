package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import database.DBAccounts;

/**
 * Servlet implementation class getEmailsServlet
 */
@WebServlet("/EmailsServlet")
public class EmailsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmailsServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		
		String email = request.getParameter("inputEmail");
				
		PrintWriter out = response.getWriter();
		
		DBAccounts accounts;
		
		try {
			
			accounts = new DBAccounts();
			
			out.print("{\"valid\" : "+accounts.emailExists(email)+"}");
			
			accounts.destroy();
			
		} catch (JSONException | InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException | NamingException e) {
			e.printStackTrace();
			out.print("{\"valid\" : false}");
		}
		
		out.flush();
		out.close();
		
	}

}
