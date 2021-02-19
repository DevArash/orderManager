/*
 * The module to handle the errors 
*/

export const throwError = (message?: string) => {
    throw new Error(message)
}