export class ApiController {
    handle(httpRequest: any): any {
        return {
            statusCode: 400,
            body: {
                "error_code": "INVALID_DATA",
                "error_description": "any_description"
            }
        }
    }
}