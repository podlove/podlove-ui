    /**
     * Uses fetch to request the given URL
     * @returns{(null|string)} The text field of the response or null if status != 200 or content type not 'text/html'
     * 
     * @param templateUrl The url to get
     */
    export function html(templateUrl: string):Promise<string>;

