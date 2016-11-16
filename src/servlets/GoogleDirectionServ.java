package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import database.DBItinerary;

/**
 * Servlet implementation class GoogleDirectionServ
 */
@WebServlet("/GoogleDirectionServ")
public class GoogleDirectionServ extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GoogleDirectionServ() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		
		String value_origin = request.getParameter("origin");
		String value_destination = request.getParameter("destination");
		String value_mode = request.getParameter("mode");
		
		PrintWriter out  = response.getWriter();
		
		
		try {
			DBItinerary itinerary = new DBItinerary();
			JSONObject jsonResult;
			
			jsonResult = itinerary.getItinerary(value_origin, value_destination, value_mode);	
			
			itinerary.destroy();
			response.setStatus(HttpServletResponse.SC_OK);
			out.print(jsonResult);
			out.flush();
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			out.println("{error :"+e.getMessage()+"}");
		}

		out.close();
	}
	
	protected void doPost (HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("application/json;charset=UTF-8");
		
		String value_origin = request.getParameter("origin");
		String value_destination = request.getParameter("destination");
		String value_mode = request.getParameter("mode");
		String value_content = request.getParameter("content");
				
		PrintWriter out  = response.getWriter();
		
		try {
			DBItinerary itinerary = new DBItinerary();
			JSONObject jsonResult;
			
			jsonResult = itinerary.setItinerary(value_origin, value_destination, value_mode, value_content);
			
			itinerary.destroy();
			response.setStatus(HttpServletResponse.SC_OK);
			out.print(jsonResult);
			out.flush();
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			out.println("{error :"+e.getMessage()+"}");
		}

		out.close();
	}

}
