// http://angularjs.org/
// v 1.0.2

// http://docs.angularjs.org/api/ng
declare module angular {
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // services
    interface Promise {
        then(callback : (value) => any, errback?: (reason) => any) : Promise;
    }
    interface Deferred {
        resolve(value): void;
        reject(reason): void;
    
        promise: Promise;
    }
    interface $q {
        all(promises:Promise[]) : Promise;
        defer(): Deferred;
        reject(reason): Promise;
        when(value): Promise;
    }
    
    interface HttpConfig {
        method : string;
        url : string;
        params? : any; 
        data? : any;
        headers? : Object;
        transformRequest? : any; // should be "((data, headersGetter) => any)[];" but TypeScript does not support "array of functions" type declaration so far
        transformResponse? : any;
        cache?:any;
        timeout? : number;
        withCredentials? :bool;
    }
    interface HttpPromise extends Promise{
        then(
            callback: (response: { data; status: number; headers?: (headerName: string) => string; }) => any,
            errback?: (response: { data; status: number; headers?: (headerName: string) => string; }) => any,
        ) : HttpPromise;
    
        success(fn: (data: any, status: number, headers: (headerName: string) => string, config: HttpConfig) => void ) : HttpPromise;
        error(fn: (data: any, status: number, headers: (headerName: string) => string, config: HttpConfig) => void ) : HttpPromise;
    }
    interface $http {
        (config:HttpConfig) : HttpPromise; 
    
        delete (url:string, config?: HttpConfig) : HttpPromise;
        get (url:string, config?: HttpConfig) : HttpPromise;
        head(url:string, config?: HttpConfig) : HttpPromise;
        jsonp(url:string, config?: HttpConfig) : HttpPromise;
        post(url:string, data, config?: HttpConfig) : HttpPromise;
        put(url:string, data, config?: HttpConfig) : HttpPromise;
        
        defaults: HttpConfig;
        pendingRequests: HttpConfig[];
    }
    
    interface $location {
        absUrl(): string;
        hash(): string;
        hash(hash: string): $location;
        host(): string;
        path(): string;
        path(path:string): $location;
        port(): number;
        protocol(): string;
        replace(): void;
        search(search:string, paramValue?: string): string;
        search(search:Object, paramValue?: string): string;
        url():string;
        url(url: string): $location;
    }
    
    interface $controller {
        (constructor:string, locals) : any;
        (constructor:Function, locals) : any;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // types
    interface Scope {
        $apply(exp?:string):any;
        $apply(exp?: (scope:Scope) => any ):any;
        
        $broadcast(name:string, ...args : any[] ) : Object;
        $destroy() : void;
        $digest(): void;
        $emit(name:string, ...args : any[] ) : Object;
    
        $eval(expression?:string):any;
        $eval(expression?: (scope:Scope) => any ):any;
    
        $evalAsync(expression?:string):void;
        $evalAsync(expression?: (scope:Scope) => any ):void;
        
        $new(isolate?: bool): Scope;
            
        $on(name: string, listener: (event : 
            { 
                targetScope: Scope;
                currentScope: Scope;
                name: string;
                stopPropagation?: () => void;
                preventDefault: () => void;
                defaultPrevented: bool;
            }, ...args: any[]) => any): () => void;
    
    
        $watch(watchExpression: string, listener?:string, objectEquality?:bool) : () => void;
        $watch(watchExpression: string, listener?:(newValue, oldValue, scope:Scope) => void, objectEquality?:bool) : () => void;
        $watch(watchExpression: (scope:Scope) => any, listener?:string, objectEquality?:bool) : () => void;
        $watch(watchExpression: (scope:Scope) => any, listener?:(newValue, oldValue, scope:Scope) => void, objectEquality?:bool) : () => void;
        
        number: number;
    
        // this is also something like: "Event "$destroy" Broadcasted when a scope and its children are being destroyed. 
        // Type: broadcast Target: scope being destroyed"
    }
    interface Module {
        config(configFn: Function): Module;
        constant(name: string, object): Module;
        controller(name: string, constructor: Function): Module;
        directive(name: string, directiveFactory: Function): Module;
        factory(name: string, providerFunction: Function): Module;
        filter(name: string, filterFactory: Function): Module;
        provider(name: string, providerType: Function): Module;
        run(initializationFn: Function): Module;
        service(name: string, constructor: Function): Module;
        value(name:string,object): Module;
        name: string;
        requires: string[];
    }
    interface NgModelController {
        $render : () => void;
        $setValidity(validationErrorKey: string, isValid: string):void;
        $setViewValue(value:string):void;
        $viewValue: string;
        $modelValue:any;
        $parsers;
        $formatters;
        $error: any;
        $pristine: bool;
        $dirty: bool;
        $invalid: bool;
    }
    interface FormController {
        $pristine: bool;
        $dirty: bool;
        $valid: bool;
        $invalid: bool;
        $error: any;
    }    
    interface JQueryAndjqLiteAdditions {
        controller(name):any;
        injector(): angular.AUTO.$injector;
        scope: Scope;
        inheritedData();
    }
    interface jqLite extends JQueryAndjqLiteAdditions{
        addClass(classNames: string): jqLite;
        addClass(func: (index: any, currentClass: any) => jqLite);
        after(...content: any[]): jqLite;
        after(func: (index: any) => any);
        append(...content: any[]): jqLite;
        append(func: (index: any, html: any) => any);
        attr(attributeName: string): string;
        attr(attributeName: string, value: any): jqLite;
        attr(map: { [key: any]: any; }): jqLite;
        attr(attributeName: string, func: (index: any, attr: any) => any): jqLite;
        //bind(eventType: string, eventData?: any, handler?: (eventObject: JQueryEventObject) => any): jqLite;    
        bind(eventType: string, eventData: any, preventBubble:bool): jqLite;
        bind(eventType: string, preventBubble:bool): jqLite;
        bind(...events: any[]);
        children(selector?: any): jqLite;
        clone(withDataAndEvents?: bool, deepWithDataAndEvents?: bool): jqLite;
        contents(): jqLite;
        css(e: any, propertyName: string, value?: any);
        css(e: any, propertyName: any, value?: any);
        data(element: Element, key: string, value: any): Object;
        eq(index: number): jqLite;
        find(tagName): jqLite; // "Limited to lookups by tag name." - angular docs
        hasClass(className: string): bool;
        html(htmlString: string): jqLite;
        html(): string;
        next(selector?: string): jqLite;
        parent(selector?: string): jqLite;
        prepend(...content: any[]): jqLite;
        prepend(func: (index: any, html: any) =>any): jqLite;
        prop(propertyName: string): string;
        prop(propertyName: string, value: any): jqLite;
        prop(map: any): jqLite;
        prop(propertyName: string, func: (index: any, oldPropertyValue: any) => any): jqLite;
        ready(handler: any): jqLite;
        remove(selector?: any): jqLite;
        removeAttr(attributeName: any): jqLite;
        removeClass(className?: any): jqLite;
        removeClass(func: (index: any, cls: any) => any): jqLite;
        removeData(nameOrList?: any): jqLite;
        replaceWith(func: any): jqLite;
        text(textString: string): jqLite;
        text(): string;
        toggleClass(className: any, swtch?: bool): jqLite;
        toggleClass(swtch?: bool): jqLite;
        toggleClass(func: (index: any, cls: any, swtch: any) => any): jqLite;
        //unbind(eventType?: string, handler?: (eventObject: JQueryEventObject) => any): jqLite;
        unbind(eventType: string, fls: bool): jqLite;
        unbind(evt: any): jqLite;
        val(): any;
        val(value: string[]): jqLite;
        val(value: string): jqLite;
        val(func: (index: any, value: any) => any): jqLite;
        wrap(wrappingElement: any): jqLite;
        wrap(func: (index: any) =>any): jqLite;
        wrapAll(wrappingElement: any): jqLite;
        wrapInner(wrappingElement: any): jqLite;
        wrapInner(func: (index: any) =>any): jqLite;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //global APIs
    function bind(self:Object, fn:Function, ...args:any[]) : Function;
    function bootstrap(element:Element,  modules?:string[]) : angular.AUTO.$injector;
    function bootstrap(element:Element,  modules?:Function[]) : angular.AUTO.$injector;
    function copy(source:any):any;
    function copy(source:any[]):any[];
    function copy(source: any, destination: any): void;
    function copy(source: any[], destination: any[]): void;
    // 'cast' return type of element method from jqLite to JQuery (from jquery.d.ts) is you use full JQuery library - "var jq = <JQuery> element(...);"
    function element(element:string): jqLite; 
    function element(element:Element): jqLite; 
    function equals(o1,o2):bool;
    function extend(dst:any, ...src:any[]):void;
    function forEach(obj:Object,iterator:(key,value) => void, context?):Object;
    function forEach(obj:any[],iterator:(key,value) => void, context?):any[];
    function fromJson(json:string):any;
    function identity(value?:any):any;
    function injector(modules:string[]) : angular.AUTO.$injector;
    function injector(modules:Function[]) : angular.AUTO.$injector;
    function isArray(value):bool;
    function isDate(value):bool;
    function isDefined(value):bool;
    function isFunction(value):bool;
    function isNumber(value):bool;
    function isObject(value):bool;
    function isString(value):bool;
    function isUndefined(value):bool;
    function lowercase(string:string):string;
    function module(name: string, requires?: string[], configFn?: Function): Module;
    function noop(...values:any[]):any;
    function toJson(obj, pretty?: bool): string;
    function uppercase(string:string):string;
    var version: {
        full: string;
        major: number;
        minor: number;
        dot: number;
        codeName: string;
    };



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // modules
    // http://docs.angularjs.org/api/auto
    export module AUTO {
        interface $injector {
            annotate(fn: Function): string[];
            annotate(fn: any[]): string[];
            get(name: string): any;
            instantiate(Type: Function, locals?: Object): any;
            invoke(fn: (...params: any[]) => void , self?: any, locals?: any): void;
            invoke(fn: (...params: any[]) => any, self?: any, locals?: any): any;
        }
        interface $provide {
            constant(name: string, value): any;
            decorator(name: string, decorator: Function): void;
            factory(name: string, $getFn: (...params: any[]) => any): any;
            provider(name: string, provider: { $get(...params: any[]): any; }): any;
            provider(name: string, provider: Function): any;
            service(name: string, constructor: Function): any;
            value(name: string, value): any;
        }
    }

    // http://docs.angularjs.org/api/ngMock
    export module mock {
        function inject(fns: (...params: any[]) => void) : () => void;   
        function inject(fns: (...params: any[]) => void) : void;
        
        function module(...modules: string[]);
        function module(...modules: Function[]);

        interface iheadersFunc {
            (headers: Object): bool;
        }

        interface requestHandler {
            respond(func: (method: string, url: string, data: string, headers: Object) => any[]);
            respond(func: (method: string, url: string, data: string, headers: Object) => void);
            respond(status:number, data, headers?) : void;
            respond(data,headers?) : void;
            //passThrough(): void;  
        }

        interface $httpBackend {
            // so far TypeScript does not support "{string|RegExp}" kind of type declaration so "any" type is used below in many places

            expect(method: string, url, data?, headers?:Object ) : requestHandler; 
            expect(method: string, url, data?, headers?:(headers?: Object) => bool ) : requestHandler; 
            expectDELETE(url, headers?:Object ) : requestHandler;             
            expectGET(url, headers?:Object ) : requestHandler; 
            expectHEAD(url, headers?:Object ) : requestHandler;             
            expectJSONP(url): requestHandler;
            expectPATCH(url, data? , headers?: Object): requestHandler;
            expectPOST(url, data? , headers?: Object): requestHandler;
            expectPUT(url, data? , headers?: Object): requestHandler;

            flush(count?:number);
            resetExpectations():void;
            verifyNoOutstandingExpectation(): void;
            verifyNoOutstandingRequest(): void;

            when(method: string, url, data?, headers?:Object ) : requestHandler; 
            when(method: string, url, data?, headers?:(headers?: Object) => bool ) : requestHandler; 
            whenDELETE(url, headers?:Object ) : requestHandler; 
            whenDELETE(url, headers?:(headers?: Object) => bool ) : requestHandler;
            whenGET(url, headers?:Object ) : requestHandler; 
            whenGET(url, headers?:(headers?: Object) => bool ) : requestHandler; 
            whenHEAD(url, headers?:Object ) : requestHandler; 
            whenHEAD(url, headers?:(headers?: Object) => bool ) : requestHandler; 
            whenJSONP(url): requestHandler;
            whenPOST(url, data? , headers?: Object): requestHandler;
            whenPOST(url, data? , headers?: (headers?: Object) => bool): requestHandler;
            whenPUT(url, data? , headers?: Object): requestHandler;
            whenPUT(url, data? , headers?: (headers?: Object) => bool): requestHandler;
        }
    }
}
 