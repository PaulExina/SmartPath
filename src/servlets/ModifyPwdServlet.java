package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.DBAccounts;
import encrypt.HashEncrypt;

/**
 * Servlet implementation class ModifyPwdServlet
 */
@WebServlet("/ModifyPwdServlet")
public class ModifyPwdServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ModifyPwdServlet() {
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
			
			out.print(accounts.changePwd(email, pwd));
			response.setStatus(HttpServletResponse.SC_OK);
			
			accounts.destroy();
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			out.print("{error : "+e.getMessage()+"}");
			out.flush();
		}
        
        out.flush();
        out.close();
        
	}

}
