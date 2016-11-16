package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import apirequest.ViaMichelin;

@WebServlet("/ViaMichelinServlet")
public class ViaMichelinServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ViaMichelinServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");

		String value_mode = request.getParameter("mode");
		String value_country = request.getParameter("pays");
		String value_city = request.getParameter("ville");
		String value_address = request.getParameter("adresse");
		String value_dep_lon = request.getParameter("deplon");
		String value_dep_lat = request.getParameter("deplat");
		String value_ar_lon = request.getParameter("arlon");
		String value_ar_lat = request.getParameter("arlat");
		String value_critere = request.getParameter("crit");


		PrintWriter out = response.getWriter();
		
		if (value_mode.contentEquals("adr_non_comp")) {
			try {
				
				JSONObject result = ViaMichelin.sendGet(value_country,
						value_city);
				JSONObject finalResult = new JSONObject();
				finalResult.append("error", "");
				finalResult.append("result", result);
				finalResult.append("status", 200);
				response.setStatus(HttpServletResponse.SC_OK);
				out.print(finalResult.toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setStatus(500);
				out.println("{error : " + e.getMessage() + "}");
			}
		}

		if (value_mode.contentEquals("adr_comp")) {
			try {
				JSONObject result = ViaMichelin.sendGet(value_country,
						value_city, value_address);
				JSONObject finalResult = new JSONObject();
				finalResult.append("error", "");
				finalResult.append("result", result);
				finalResult.append("status", 200);
				response.setStatus(HttpServletResponse.SC_OK);
				out.print(finalResult.toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setStatus(500);
				out.println("{error : " + e.getMessage() + "}");
			}
		}

		if (value_mode.contentEquals("coord")) {
			try {
				JSONObject result = ViaMichelin.sendGet(value_dep_lon,
						value_dep_lat, value_ar_lon, value_ar_lat,
						value_critere);
				JSONObject finalResult = new JSONObject();
				finalResult.append("error", "");
				finalResult.append("result", result);
				finalResult.append("status", 200);
				response.setStatus(HttpServletResponse.SC_OK);
				out.print(finalResult.toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.setStatus(500);
				out.println("{error : " + e.getMessage() + "}");
			}
		}
		out.close();
	}

}
