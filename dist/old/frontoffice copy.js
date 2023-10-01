"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wphone_1 = __importStar(require("wphone"));
const callButton = (0, wphone_1.getButton)("goodtok-call");
const hangupButton = (0, wphone_1.getButton)("goodtok-hangup");
const config = {
    displayName: "GoodTok Front Office",
    domain: "sip.goodtok.com",
    username: "goodtok",
    secret: "1234",
    audioElementId: "goodtok-audio",
    videoElementId: "goodtok-video",
    extraHeaders: [],
    server: "ws://192.168.1.2:5062"
};
const targetAOR = "sip:anonymous@sip.goodtok.com";
const phone = new wphone_1.default(config);
// Connect and register to the SIP server
callButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!phone.isConnected()) {
            yield phone.connect();
        }
        phone.call({ targetAOR });
    }
    catch (e) {
        window.alert(e);
    }
}));
hangupButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (phone) {
        phone.hangup();
        // phone.disconnect();
    }
}));
//# sourceMappingURL=frontoffice%20copy.js.map