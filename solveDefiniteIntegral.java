import java.util.Arrays;
import java.util.*;
import java.io.*;
public class integral {
	
	public static final double stepSize = 1E-4;
	
	public static void main(String[] args) {
		/*System.out.println(integrate(0, 4, -1, 4, 0));
		System.out.println(integrate(3, 7, 1, -10, 21));
		System.out.println(integrate(3, 8, -1, 6, 30));*/
		/*double[] temp = solveQuadratic(-1, 4, 0);
		System.out.println(Arrays.toString(temp));*/
		System.out.println(integrate(solveQuadratic(-1, 4, 0)[0], solveQuadratic(-1, 4, 0)[1], -1, 4, 0));
		
		System.out.println(integrate(-2, 5, -1, 4, 0));

		System.out.println(inside(-5, -5, -10, 10, -1, 4, 0));
	}
	static double integrate(double start, double end, int a, int b, int c) {
		
		double sum = 0;
		//double vertexX = -b/(2*a);
		double vertexY = a*-b/(2*a)* -b/(2*a) + b * -b/(2*a) + c;
		//System.out.println(vertexY);

		for( double i = start+stepSize; i < end ; i += stepSize) {
			//System.out.println( a*i*i + b *i + c);
			
			sum += stepSize*(a*i*i + b *i + c);
			if(a*i*i + b *i + c == vertexY) {
				sum += stepSize*(a*i*i + b *i + c);
				//System.out.println( a*i*i + b *i + c);
			}			
		}
		return sum;
	}
	
	static double[] solveQuadratic(int a, int b, int c) {
		double[] arr = new double[2];
		arr[0] = (-1*b + Math.sqrt(b*b - 4 * a * c))/(2*a);
		arr[1] = (-1*b - Math.sqrt(b*b - 4 * a * c))/(2*a);

		return arr;
	}
	
	//automatically scale y-axis
	static ArrayList<Double> getYCoordinates(double start, double end, int a, int b, int c) {
		ArrayList<Double> coordinatesY = new ArrayList<Double>();

		int step = 1;
		
		coordinatesY.add(a*start*start + b *start + c);
		coordinatesY.add(a*end*end + b *end + c);
		for( double i = start+step; i < end ; i += step) {
			coordinatesY.add(a*i*i + b *i + c);
		}
		return coordinatesY;
	}
	static ArrayList<Double> getXCoordinates(double start, double end, int a, int b, int c) {
		ArrayList<Double> coordinatesX = new ArrayList<Double>();

		int step = 1;
		
		coordinatesX.add(start);
		coordinatesX.add(end);
		for( double i = start+step; i < end ; i += step) {

			coordinatesX.add(i);
		}
		return coordinatesX;
	}
	
	static boolean inside(int x, int y, double minX, double maxX, int a, int b, int c) {
		ArrayList<Double> temp = getYCoordinates( minX,  maxX,  a, b,  c);
		Collections.sort(temp);
		//System.out.println(temp);
		if(y < temp.get(0) || y > temp.get(temp.size() -1)) {
			return false;
		}

		
		return true;
	}
}
