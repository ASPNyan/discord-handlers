"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EventInterface = exports.CommandInterface = void 0;
var functions_1 = require("./functions");
var events_1 = require("events");
var AsciiTable3 = require("ascii-table3").AsciiTable3;
var CMDManager = /** @class */ (function (_super) {
    __extends(CMDManager, _super);
    function CMDManager(Client, options) {
        var _this = _super.call(this) || this;
        _this.runHandlers = function () {
            _this.EventHandler(_this._Client, _this._EventCollection);
            _this.CommandHandler(_this._Client, _this._CommandCollection, _this._ExecCollection);
        };
        _this._Client = Client;
        _this._DeveloperServerID = options.DeveloperServerID;
        _this._TypeScript = options.TypeScript;
        _this._CommandDirectory = options.CommandDirectory;
        _this._EventsLocation = options.EventsDirectory;
        _this._ExecCollection = options.ExecCollection;
        _this._CommandCollection = options.CommandCollection;
        _this._EventCollection = options.EventCollection;
        _this.runHandlers();
        return _this;
    }
    CMDManager.prototype.EventHandler = function (client, collection) {
        return __awaiter(this, void 0, void 0, function () {
            var table, Files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        table = new AsciiTable3("Events")
                            .setHeading("Event", "Status")
                            .setStyle("unicode-mix")
                            .setAlignCenter(3);
                        return [4 /*yield*/, (0, functions_1.FileLoader)(this._EventsLocation, this._TypeScript)];
                    case 1:
                        Files = _a.sent();
                        collection.clear();
                        Files.forEach(function (file) {
                            var event = require(file.toString());
                            if (event["default"])
                                event = event["default"];
                            var execute = function (args) { return event.execute(args, client); };
                            if (!event.name) {
                                new Error("Event ".concat(event, " is Missing the \"name\" Parameter"));
                                return;
                            }
                            var name = event.name.toString();
                            collection.set(event.name, execute);
                            if (event.rest && event.once)
                                client.rest.once(name, execute);
                            if (event.rest && !event.once)
                                client.rest.on(name, execute);
                            if (!event.rest && event.once)
                                client.once(name, execute);
                            if (!event.rest && !event.once)
                                client.on(name, execute);
                            table.addRow(event.name, "✓");
                        });
                        return [2 /*return*/, console.log(table.toString(), "Events Loaded!")];
                }
            });
        });
    };
    CMDManager.prototype.CommandHandler = function (client, collection, execCollection) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var regTable, devTable, commandsArray, developerArray, Files;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this._CommandDirectory)
                            return [2 /*return*/, new Error("Commands Directory is Not Set.\n\n         Commands **Will Not** Without This Being Set.")];
                        regTable = new AsciiTable3("Public Commands")
                            .setHeading("Command", "Status")
                            .setStyle("unicode-mix")
                            .setAlignCenter(3);
                        devTable = new AsciiTable3("Developer Commands")
                            .setHeading("Command", "Status")
                            .setStyle("unicode-mix")
                            .setAlignCenter(3);
                        collection.clear();
                        execCollection.clear();
                        commandsArray = [];
                        developerArray = [];
                        return [4 /*yield*/, (0, functions_1.FileLoader)(this._CommandDirectory, this._TypeScript)];
                    case 1:
                        Files = _c.sent();
                        Files.forEach(function (file) {
                            var FiEx = ".js";
                            if (_this._TypeScript === true)
                                FiEx = ".ts";
                            var command = require(file.replace(FiEx, ""));
                            if (command["default"])
                                command = command["default"];
                            var CommandJSON = (0, functions_1.ReturnCommandJSON)(command);
                            if (!CommandJSON)
                                return console.log("Command ".concat(file, " Returned Void!"));
                            collection.set(CommandJSON.name, CommandJSON);
                            execCollection.set(CommandJSON.name, command.execute);
                            if (!command.developer) {
                                commandsArray.push(CommandJSON);
                                regTable.addRow(CommandJSON.name, "✓");
                            }
                            else {
                                if (_this._DeveloperServerID) {
                                    developerArray.push(CommandJSON);
                                    devTable.addRow(CommandJSON.name, "✓");
                                }
                                return new Error("Command ".concat(CommandJSON.name, " is set as a Developer Command, but there is no Developer Server Set"));
                            }
                        });
                        // prettier-ignore
                        if (this._DeveloperServerID)
                            (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(developerArray, this._DeveloperServerID);
                        (_b = client.application) === null || _b === void 0 ? void 0 : _b.commands.set(commandsArray);
                        if (developerArray.length) {
                            console.log(devTable.toString(), "Developer Commands Loaded!");
                        }
                        if (commandsArray.length) {
                            console.log(regTable.toString(), "Public Commands Loaded!");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CMDManager;
}(events_1.EventEmitter));
exports["default"] = CMDManager;
var CommandInterface = /** @class */ (function () {
    function CommandInterface() {
    }
    return CommandInterface;
}());
exports.CommandInterface = CommandInterface;
var EventInterface = /** @class */ (function () {
    function EventInterface() {
    }
    return EventInterface;
}());
exports.EventInterface = EventInterface;
