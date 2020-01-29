/**
 * Uses fetch to request html from the given URL
 * @returns{Promise<(null|string)>} The text field of the response or null if status != 200 or content type not 'text/html'
 * 
 * @param templateUrl The url to fetch
 */
export function html(templateUrl: string): Promise<string|null>;


/**
 * Uses fetch to request JSON from the given URL * 
 * @returns{Promise<T>} A promise of the json object typed by T
 * @param url The url to fetch
 */
export function json<T>(url: string): Promise<T>;