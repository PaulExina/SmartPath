package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import apirequest.Gas;
import apirequest.Navitia;


@WebServlet("/GasServlet")
public class GasServlet extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
    
    public GasServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		
		String value_date = request.getParameter("date");
		//date format 20141020 aaaammjj
		
		PrintWriter out  = response.getWriter();
		
		try {
			JSONObject result = Gas.sendGet(value_date);
			out.print(result.toString());
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			out.println("{error : "+e.getMessage()+"}");
		}
		out.flush();
		out.close();
	}


}
