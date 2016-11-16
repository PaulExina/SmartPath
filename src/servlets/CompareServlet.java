package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import treatment.Compare;

/**
 * Servlet implementation class CompareServlet
 */
@WebServlet("/CompareServlet")
public class CompareServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CompareServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		JSONObject result = new JSONObject();
		PrintWriter out = response.getWriter();
		
		String json_car = request.getParameter("json_car");
		String json_train = request.getParameter("json_train");
		String car_str = request.getParameter("car");
		String bike_str = request.getParameter("bike");
		String walk_str = request.getParameter("walk");
		String train_str = request.getParameter("train");
		
		
		String by = request.getParameter("by");//type of comparison 
			
		if(by.contentEquals("cost")){
			car_str="0";
			bike_str="0";
			walk_str="0";
			train_str="0";
		}
		else{
			json_car=" ";
			json_train=" ";
		}
		
		if(car_str != null && !car_str.isEmpty() && bike_str != null && !bike_str.isEmpty() 
				&& walk_str != null && !walk_str.isEmpty() && train_str != null && !train_str.isEmpty() && json_car != null && !json_car.isEmpty()){
			// get request parameters for userID and password
	        try {
				double car = Double.parseDouble(car_str);
				double bike = Double.parseDouble(bike_str);
				double walk = Double.parseDouble(walk_str);
		        double train = Double.parseDouble(train_str);
		        
		        switch(by){
		        case "time":
		        	result.put("result", Compare.compareByTime(car, bike, walk, train));
		        	break;
		        
		        case "cost":
		        	
		        	JSONObject jcar = new JSONObject(json_car);
		        	JSONArray jtrain;
		        	if(json_train == null){
		        		jtrain = null;
		        	}
		        	else{
		        		jtrain = new JSONArray(json_train);
		        	}
		        	
		        	result.put("result", Compare.compareByCost(jcar,jtrain));
		        	break;
		        	
		        case "distance":
		        	result.put("result", Compare.compareByDistance(car, bike, walk, train));
		        	break;
		        }
		        
		        result.put("message", "success");
		        result.put("error", "");
		        
		        response.setStatus(200);
		        
		        out.print(result);
		        out.flush();
		        
			} catch (Exception e) {
				e.printStackTrace();
				response.setStatus(500);
				out.print("{error : "+e.getMessage()+"}");
				
			}
		}else{
			response.setStatus(400);
			out.print("{error : 'Bad arguments'}");
		}
       
        out.close();
        
	}

}
