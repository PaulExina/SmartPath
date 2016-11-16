package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import apirequest.Navitia;

/**
 * Servlet implementation class GoogleDirectionServ
 */
@WebServlet("/NavitiaServlet")
public class NavitiaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
       
    public NavitiaServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		
		String value_origin = request.getParameter("origin");
		String value_destination = request.getParameter("destination");
		String value_departTime = request.getParameter("datetime");
		//String value_mode = request.getParameter("mode");
		//String value_content = request.getParameter("content");
		
		PrintWriter out  = response.getWriter();
		
		
		try {
			JSONObject result = Navitia.sendGet(value_origin, value_destination, value_departTime);
			out.print(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			response.setStatus(500);
			out.println("{error : "+e.getMessage()+"}");
		}
		out.close();
	}

}
