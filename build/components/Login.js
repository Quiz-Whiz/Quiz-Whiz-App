"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var react_router_dom_1 = require("react-router-dom");
//import context
var axios_1 = __importDefault(require("axios"));
var Login = react_1.default.memo(function () {
    var _a = react_hook_form_1.useForm(), register = _a.register, handleSubmit = _a.handleSubmit;
    var onSubmit = function (values) {
        console.log(values);
        var body = {
            username: values.user_name,
            password: values.user_password,
        };
        axios_1.default
            .post("/login", body)
            .then(function (res) { return console.log(res); });
    };
    return (react_1.default.createElement("div", { className: "loginPage" },
        react_1.default.createElement("div", { className: "loginForm" },
            react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                react_1.default.createElement("label", null, "Username"),
                react_1.default.createElement("input", { name: "user_name", ref: register }),
                react_1.default.createElement("label", null, "Password"),
                react_1.default.createElement("input", { name: "user_password", type: "password", ref: register }),
                react_1.default.createElement("div", { className: "submitBtn" },
                    react_1.default.createElement("input", { className: "generic_button", type: "submit" }))),
            "Not registered?",
            react_1.default.createElement("br", null),
            react_1.default.createElement(react_router_dom_1.Link, { className: "signup_link", to: "/signUp" }, "Create an Account"),
            react_1.default.createElement("br", null),
            react_1.default.createElement(react_router_dom_1.Link, { className: "signup_link", to: "/homepage" }, " Continue as Guest "))));
});
exports.default = Login;
//# sourceMappingURL=Login.js.map