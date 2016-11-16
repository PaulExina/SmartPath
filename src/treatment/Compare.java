package treatment;

import java.util.ArrayList;
import java.util.Date;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import database.DBGas;
import apirequest.CGoogleGeo;
import apirequest.Gas;

public class Compare {
	
	
	private static double [][] tarification_taxi = {   { 2.1 ,	1.74 ,	2.58 ,	23.5 ,	23.5 },
        {2 ,	1.8 ,	2.7 ,	24.4 ,	24.4 },
        {1.8 ,	1.94 ,	2.91 ,	19.8 ,	19.8 },
        {1.7 ,	1.96 ,	2.94 ,	20.40 ,	20.40 },
        {2.23 ,	1.84 ,	2.76 ,	19 ,	19 },
        {3 ,	2.08 ,	2.6 ,	26 ,	26 },
        {1.6 ,	1.94 ,	2.91 ,	24.6 ,	24.6 },
        {2.5 ,	1.76 ,	2.64 ,	18.8 ,	18.8 },
        {2.3 ,	1.66 ,	2.49 ,	23.74 ,	23.74 },
        {2.7 ,	1.66 ,	2.48 ,	20.65 ,	20.65 },
        {2.2 ,	1.7 ,	2.55 ,	24.5 ,	24.5 },
        {1.8 ,	1.8 ,	2.7 ,	24.5 ,	24.5 },
        {2 ,	1.7 ,	2.2 ,	27.6 ,	27.6 },
        {2.4 ,	1.66 ,	2.48 ,	23.68 ,	23.68 },
        {2.1 ,	1.84 ,	2.28 ,	21.3 ,	21.3 },
        {2.66 ,	1.68 ,	2.45 ,	17.48 ,	17.48 },
        {2.5 ,	1.7 ,	2.42 ,	20.5 ,	20.5 },
        {2 ,	1.88 ,	2.8 ,	19.3 ,	19.3 },
        {2 ,	1.8 ,	2.7 ,	23.4 ,	31.12 },
        {2 ,	1.82 ,	2.72 ,	22.41 ,	22.41 },
        {2.1 ,	1.78 ,	2.66 ,	22.13 ,	22.13 },
        {1.73 ,	1.88 ,	2.82 ,	22.2 ,	28.86 },
        {2.4 ,	1.76 ,	2.64 ,	19.4 ,	19.4 },
        {2.2 ,	1.72 ,	2.5 ,	23.4 ,	23.4 },
        {2.1 ,	1.82 ,	2.74 ,	23 ,	23 },
        {2 ,	1.8 ,	2.38 ,	23.78 ,	27.69 },
        {2 ,	1.76 ,	2.64 ,	24 ,	24 },
        {2.1 ,	1.7 ,	2.56 ,	24.6 ,	24.6 },
        {1.85 ,	2.08 ,	3.12 ,	30.15 ,	30.15 },
        {2.3 ,	2.06 ,	2.9 ,	27.8 ,	27.8 },
        {2.2 ,	1.7 ,	2.56 ,	23.2 ,	23.2 },
        {1.9 ,	1.60 ,	2.24 ,	30.5 ,	30.5 },
        {2.1 ,	1.78 ,	2.3 ,	22.3 ,	22.3 },
        {2 ,	1.66 ,	2.5 ,	32.6 ,	32.6 },
        {2 ,	1.8 ,	2.7 ,	24.4 ,	24.4 },
        {2.4 ,	1.6 ,	2.4 ,	25.4 ,	25.4 },
        {1.7 ,	1.98 ,	2.98 ,	19.6 ,	19.6 },
        {2 ,	1.82 ,	2.74 ,	21.96 ,	21.96 },
        {2.5 ,	1.84 ,	2.76 ,	26.25 ,	26.25 },
        {2.2 ,	1.72 ,	2.56 ,	23.4 ,	23.4 },
        {2 ,	1.88 ,	2.82 ,	20.3 ,	20.3 },
        {2 ,	1.8 ,	2.7 ,	23.2 ,	23.2 },
        {2.5 ,	1.72 ,	2.58 ,	24.5 ,	24.5 },
        {2 ,	1.92 ,	2.70 ,	18.2 ,	18.2 },
        {2.2 ,	1.66 ,	2.49 ,	25.34 ,	25.34 },
        {2.3 ,	1.7 ,	2.38 ,	22.6 ,	22.6 },
        {2.63 ,	1.82 ,	2.74 ,	15.3 ,	15.3 },
        {2.4 ,	1.76 ,	2.64 ,	19.8 ,	19.8 },
        {0.5 ,	2.08 ,	3.12 ,	27.6 ,	27.6 },
        {2.5 ,	1.68 ,	2.52 ,	22.2 ,	22.2 },
        {2 ,	1.96 ,	2.94 ,	16.9 ,	16.9 },
        {1.8 ,	1.9 ,	2.86 ,	21 ,	21 },
        {1.8 ,	1.9 ,	2.86 ,	21 ,	21 },
        {2.5 ,	1.66 ,	2.49 ,	23.9 ,	23.9 },
        {2.8 ,	1.7 ,	2.36 ,	17.5 ,	17.5 },
        {2.6 ,	1.76 ,	2.64 ,	17.5 ,	17.5 },
        {2.2 ,	1.7 ,	1.55 ,	24.7 ,	24.7 },
        {2.7 ,	1.68 ,	2.38 ,	19.3 ,	19.3 },
        {2 ,	1.9 ,	2.86 ,	19.8 ,	19.8 },
        {2 ,	1.9 ,	2.44 ,	20.7 ,	26.6 },
        {2 ,	1.82 ,	2.34 ,	23.5 ,	26.1 },
        {2 ,	1.76 ,	2.64 ,	23.8 ,	23.8 },
        {2 ,	1.9 ,	2.44 ,	20.7 ,	26.6 },
        {2 ,	1.82 ,	2.74 ,	22 ,	22 },
        {2.2 ,	1.82 ,	2.42 ,	18.4 ,	18.4 },
        {2.39 ,	1.7 ,	2.54 ,	21 ,	21 },
        {2.3 ,	1.82 ,	2.73 ,	17.65 ,	17.65 },
        {1.9 ,	1.7 ,	2.42 ,	27 ,	27 },
        {2.3 ,	1.62 ,	2.26 ,	25.8 ,	25.8 },
        {2 ,	1.5 ,	2.25 ,	34.35 ,	34.35 },
        {1.9 ,	1.72 ,	2.4 ,	26.3 ,	33.1 },
        {2.1 ,	1.78 ,	2.66 ,	17.9 ,	17.9 },
        {2.17 ,	1.66 ,	2.48 ,	23.75 ,	23.75 },
        {2.40 ,	1.72 ,	2.58 ,	28.3 ,	28.3 },
        {3.15 ,	1.96 ,	2.94 ,	17.3 ,	17.3 },
        {2.6 ,	1.27 ,	1.54 ,	29.9 ,	29.9 },
        {2 ,	1.9 ,	2.44 ,	20.7 ,	26.6 },
        {2.2 ,	1.6 ,	2.2 ,	29.45 ,	29.45 },
        {2.25 ,	1.58 ,	2.37 ,	33.3 ,	33.3 },
        {2.3 ,	1.8 ,	2.6 ,	18.7 ,	18.7 },
        {2 ,	1.9 ,	2.44 ,	20.7 ,	26.6 },
        {2.6 ,	1.6 ,	2.24 ,	24.2 ,	24.2 },
        {2.78 ,	1.7 ,	2.36 ,	17.85 ,	17.85 },
        {3.4 ,	1.8 ,	2.5 ,	21.8 ,	21.8 },
        {1.9 ,	1.88 ,	2.64 ,	21.4 ,	21.4 },
        {2.4 ,	1.68 ,	2.52 ,	22.40 ,	22.4 },
        {2.4 ,	1.78 ,	2.66 ,	19.5 ,	24 },
        {2.2 ,	1.72 ,	2.58 ,	22.4 ,	29.1 },
        {2.47 ,	1.74 ,	2.6 ,	19.2 ,	19.2 },
        {2.2 ,	1.82 ,	2.72 ,	19.3 ,	19.3 },
        {2.2 ,	1.72 ,	2.4 ,	22.9 ,	26 },
        {2.2 ,	1.6 ,	2.4 ,	33.6 ,	33.6 },
        {2.3 ,	1.52 ,	2.06 ,	32.7 ,	32.7 },
        {2.35 ,	1.54 ,	2.3 ,	31.6 ,	31.6 },
        {1.8 ,	1.66 ,	2.49 ,	33.35 ,	33.35 },
        {2.8 ,	1.52 ,	2.28 ,	30 ,	30 }};
	
	public static JSONArray compareByTime (final double car, final double bike, final double walk, final double train) throws JSONException{
		JSONArray result = new JSONArray();
		double time_car = car;
		double time_bike = bike;
		double time_walk = walk;
		double time_train = train;
		TreeMap<Double, String> times = new TreeMap<>();
		times.put(time_car, "CAR");
		times.put(time_bike, "BIKE");
		times.put(time_walk, "WALK");
		times.put(time_train, "TRAIN");
		Set<Double> times_keys = new TreeSet<Double>(times.keySet());
		for(Double i : times_keys){
			String tmp = times.get(i);
			JSONObject jsontmp = new JSONObject();
			jsontmp.put("type", tmp);
			jsontmp.put("time", i);
			switch(tmp){
			case "CAR" : 
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_005_car.png");	
				break;
			case "BIKE" : 
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_306_bicycle.png");		
				break;
			case "WALK" :
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicon_walking_man_32px.png");
				break;
			case "TRAIN" :
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_031_bus.png");
				break;
			}
			
			result.put(jsontmp);
		}
		
		return result;
	}
	
	public static JSONArray compareByDistance  (final double car, final double bike, final double walk, final double train) throws JSONException{
		JSONArray result = new JSONArray();
		double distance_car = car;
		double distance_bike = bike;
		double distance_walk = walk;
		double distance_train = train;
		TreeMap<Double, String> distances = new TreeMap<>();
		distances.put(distance_car, "CAR");
		distances.put(distance_bike, "BIKE");
		distances.put(distance_walk, "WALK");
		distances.put(distance_train, "TRAIN");
		Set<Double> distances_keys = new TreeSet<Double>(distances.keySet());
		for(Double i : distances_keys){
			String tmp = distances.get(i);
			JSONObject jsontmp = new JSONObject();
			jsontmp.put("type", tmp);
			jsontmp.put("distance", i);
			switch(tmp){
			case "CAR" : 
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_005_car.png");
				jsontmp.put("content", car);
				break;
			case "BIKE" : 
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_306_bicycle.png");
				jsontmp.put("content", bike);
				break;
			case "WALK" :
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicon_walking_man_32px.png");
				jsontmp.put("content", walk);
				break;
			case "TRAIN" :
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_031_bus.png");
				jsontmp.put("content", train);
				break;
			}
			
			result.put(jsontmp);
		}
		
		return result;
	}
	
	public static JSONArray compareByCost (final JSONObject car, final JSONArray train) throws Exception{
		
		double cabCost = Compare.cabCost(car);
		double gasCost = Compare.gasCost(car);
		
		double walkCost = 0.001;
		double trainCost;
		
		if(train == null){
			trainCost = Double.MAX_VALUE;
		}
		else{
			trainCost = Compare.trainCost(train);
		}
		
		double bikeCost = 0.003;
	
		
		JSONArray result = new JSONArray();
		
		TreeMap<Double, String> costs = new TreeMap<>();
		costs.put(cabCost, "TAXI");
		costs.put(gasCost, "CAR");
		costs.put(bikeCost, "BIKE");
		costs.put(walkCost, "WALK");
		costs.put(trainCost, "TRAIN");
		Set<Double> distances_keys = new TreeSet<Double>(costs.keySet());
		for(Double i : distances_keys){
			String tmp = costs.get(i);
			JSONObject jsontmp = new JSONObject();
			jsontmp.put("type", tmp);
			jsontmp.put("cost", i);
			switch(tmp){
			case "CAR" : 
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_005_car.png");
				break;
			case "BIKE" : 
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_306_bicycle.png");
				break;
			case "WALK" :
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicon_walking_man_32px.png");
				break;
			case "TRAIN" :
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/glyphicons_031_bus.png");
				break;
			case "TAXI" :
				jsontmp.put("image", "css/Images/glyphicons_free/glyphicons/png/taxi-32.png");
				break;
			}	
			result.put(jsontmp);
		}
		
		return result;
	}
	
	private static double cabCost (JSONObject car) throws Exception{
		
		JSONArray steps = car.getJSONArray("result").getJSONObject(0).getJSONArray("etapes").getJSONObject(0).getJSONArray("etape");
		
		double sum = 0;
	
		JSONObject geo_result = CGoogleGeo.sendGet(steps.getJSONObject(0).getJSONArray("lat").get(0).toString(), steps.getJSONObject(0).getJSONArray("lon").get(0).toString());			
		JSONArray add_cmp = geo_result.getJSONArray("results").getJSONObject(0).getJSONArray("address_components");
		int zipCode = Integer.parseInt(add_cmp.getJSONObject(add_cmp.length()-1).getString("short_name").substring(0,2))-1;
		double charges = tarification_taxi[zipCode-1][0];
		
		double[] table;
		table = tarification_taxi[zipCode-1];
		
		sum+= charges;
		
		Date d = new Date();
		
		int hours = d.getHours();
		int minuts = d.getMinutes();
		int seconds = d.getSeconds();
		
		boolean day;
		
		if(hours < 20 && hours > 8)
			day = true;
		else
			day = false;
		
		double priceKM;
		
		if(day){
			priceKM = table[1];
		}else{
			priceKM = table[2];
		}
	
		double distance = Double.parseDouble(car.getJSONArray("result").getJSONObject(0).getJSONArray("distTotale").get(0).toString())/1000;	
		sum += distance *priceKM;
	
		return sum;
	}
	
	private static double gasCost(JSONObject car) throws Exception{
		
		double cons = Double.parseDouble(car.getJSONArray("result").getJSONObject(0).getJSONArray("quantiteEssence").get(0).toString());
		
		Date d = new Date();
		//date format 20141020 aaaammjj
		String date = (d.getYear()+1900)+"";
		
		if((d.getMonth())<10){
			date +="0"+(d.getMonth());
		}
		else{
			date +=(d.getMonth());
		}
		
		if(d.getDate()<10){
			date += "0"+(d.getDate());
		}
		else{
			date += d.getDate();
		}
		
		DBGas gas = new DBGas();
		JSONObject jgas = gas.getGasPrice(date);
		
		double gasCost=0;
		if(jgas.getString("message").contentEquals("not existing")){
			gasCost = Gas.sendGet(date).getJSONArray("prix").getDouble(0);
			String price =gasCost +"";
			gas.addGasPrice(date, price);
		}
		else{
			gasCost = Double.parseDouble((gas.getGasPrice(date).getJSONObject("result").getString("price")));
		}	
		return gasCost*cons;
	}
	
	private static double trainCost(JSONArray train) throws JSONException{
		
		boolean ticket_ratp = false;
		double sum =0;
		double time_frame=0;
		
		for(int i = 0; i < train.length();i++){
			if(train.getJSONArray(i).get(0).toString().contentEquals("TRAIN")){
				if(train.getJSONArray(i).getJSONObject(1).getString("network").contentEquals("RATP")){
					if(!ticket_ratp){
						sum += 1.70;
						ticket_ratp = true;
						time_frame= train.getJSONArray(i).getJSONObject(1).getInt("duration");
					}
					else{
						time_frame+= train.getJSONArray(i).getJSONObject(1).getInt("duration");
						if(time_frame>5400){
							ticket_ratp = false;
						}
					}
				}
				else{
					double dist =train.getJSONArray(i).getJSONObject(1).getDouble("distance")/1000;
					
					if((dist >1)&&(dist < 16)){
						sum += 0.6356025 + dist*0.158875;
					}
					else if((dist >=17)&&(dist < 32)){
						sum += 0.2044875+ dist*0.1768125;
					}
					else if((dist >=32)&&(dist < 64)){
						sum += 1.68633+ dist*0.130175;
					}
					else if((dist >=64)&&(dist < 109)){
						sum += 2.3414075+ dist*0.12054;
					}
					else if((dist >=109)&&(dist < 149)){
						sum += 3.2895325+ dist*0.1148;
					}
					else if((dist >=149)&&(dist < 200)){
						sum += 6.403175+ dist*0.0944025;
					}
					else if((dist >=200)&&(dist < 300)){
						sum += 6.1429275+ dist*0.095735;
					}
					else if((dist >=300)&&(dist < 500)){
						sum += 10.833225+ dist*0.081795;
					}
					else if((dist >=500)&&(dist < 800)){
						sum += 14.637+ dist*0.07298;
					}
					else if((dist >=800)&&(dist < 2000)){
						sum += 25.55325+ dist*0.00597575;
					}			
				}
			}
		}
		return sum;
	}
	
	public static void main (String[] args) throws Exception{
		cabCost(null);
	}
	
}
