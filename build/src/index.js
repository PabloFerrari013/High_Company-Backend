"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("./data-source");
require("express-async-errors");
var routes_1 = require("./routes");
var express = require("express");
var bodyParser = __importStar(require("body-parser"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var cors = require("cors");
var swagger_json_1 = __importDefault(require("./swagger.json"));
// create express app
var app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// leaving the application public
app.use(cors());
// managing routes
app.use(routes_1.router);
// documentation route
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// start express server
var port = process.env.PORT || 3333;
app.listen(port, function () {
    console.log("Server running on port: ".concat(port, " \uD83D\uDE80"));
});
// initializing database
data_source_1.AppDataSource.initialize()
    .then(function () { return console.log('Database initialized 🔥'); })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map