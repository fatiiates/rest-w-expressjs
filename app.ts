import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors'

// Create App class
class App {

    // Global variables
    public app: Application;
    public port: number;

    constructor(initial_var: { port: number; middleWares: any; controllers: any; }) {
        // Create global "__basedir" variable
        globalThis.__basedir = __dirname;

        this.app = express();
        this.port = initial_var.port;

        this.middlewares(initial_var.middleWares);
        this.CORS();
        this.routes(initial_var.controllers);

    }

    // Adds middlewares passed as parameters to the application
    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }): void {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }

    // Adds routers passed as parameters to the application
    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }): void {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    // I added it by default. Checks the security of requests from different domains.
    public CORS(): void{
        var corsOptions: CorsOptions = {
            allowedHeaders: [
                'Origin',
              ],
              credentials: true,
              methods: 'GET,POST',
              origin: "http://localhost:8081",
              optionsSuccessStatus : 200,
        };
        this.app.use(cors(corsOptions));
    }

    // Starts the application to listen on port (this.port global variable)
    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Uygulamanız hazır gitmek için: http://localhost:${this.port}`);
        });
    }
}

export default App
