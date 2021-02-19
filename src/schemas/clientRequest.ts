export interface body {
	wants: {
		model:
			| "Testing"
			| "Center"
			
		doit: string;
	};
	details: any;
}

/**
 * this interface inherits from body and make context and place token in context(in context we have token & user)
 * @interface
 */
export interface bodyAdditional extends body {
	context: {
		token: string | null;
		
	};
}