import java.util.Arrays;

public class integral {
	
	public static final double stepSize = 1E-5;
	public static void main(String[] args) {
		System.out.println(integrate(0, 4, -1, 4, 0));
		System.out.println(integrate(3, 7, 1, -10, 21));
		System.out.println(integrate(3, 8, -1, 6, 30));
		/*double[] temp = solveQuadratic(-1, 4, 0);
		System.out.println(Arrays.toString(temp));*/
		System.out.println(integrate(solveQuadratic(-1, 4, 0)[0], solveQuadratic(-1, 4, 0)[1], -1, 4, 0));
		
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
}
