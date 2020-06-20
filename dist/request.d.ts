export default class Request {
    private request;
    private response;
    constructor(...args: [any | {
        request: any;
        res: any;
    }, any?, any?]);
    get body(): any;
    set body(body: any);
}
//# sourceMappingURL=request.d.ts.map