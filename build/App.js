"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
// import Login 
var Login_1 = __importDefault(require("./components/Login"));
// import SignUp
// import MainPage 
// import CreateGame
// import JoinGame
// import Lobby
// import Game
// import Results
var App = react_1.default.memo(function () { return (react_1.default.createElement(react_router_dom_1.Switch, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: "/" },
        react_1.default.createElement(Login_1.default, null)),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/signUp" }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/mainPage" }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/createGame" }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/lobby" }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/game" }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/results" }))); });
exports.default = App;
//# sourceMappingURL=App.js.map