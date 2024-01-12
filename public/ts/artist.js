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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
var contentContainer = document.getElementById('contentContainer');
var emailRegexArtist = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('/logout')];
            case 1:
                _a.sent();
                window.location.replace("/auth/admin/login");
                return [2 /*return*/];
        }
    });
}); });
var run = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, artistArr, str, contentArr;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('/artists', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                artistArr = _a.sent();
                str = "";
                artistArr.forEach(function (artist) {
                    str += "<div class=\"h-20 border-b border-slate-500 flex justify-between shadow-sm contentItem\"><div class=\"flex flex-col justify-center px-5\"><h2 class=\"text-xl\">".concat(artist.name, " - ").concat(artist.email, "</h2><p class=\"text-md text-center text-violet-900\">").concat(artist._id.toString(), "</p></div><div class=\"flex mr-4\"><img src=\"/images/pencil-purp.svg\" alt=\"\" class=\"w-8 mx-2\"><img src=\"/images/delete-icon.svg\" alt=\"\" class=\"w-8 mx-2\"></div></div><div class=\"border-b border-slate-950 flex-col hidden\"><form class=\"flex w-full items-center justify-center gap-4 mt-2\"><input type=\"email\" placeholder=\"Email\" class=\"h-10 px-2 rounded-sm shadow-md\"><input type=\"text\" placeholder=\"New Password\" class=\"h-10 px-2 rounded-sm shadow-md\"><button type=\"submit\" class=\"bg-purple-800 h-10 pb-1 px-3 rounded-lg text-slate-50\">Send</button></form><div class=\"italic text-red-800 text-center mt-1\">*Leave unchanged fields empty</div></div>");
                });
                contentContainer.innerHTML = str;
                contentArr = document.querySelectorAll('.contentItem');
                // add event listeners for the delete icons
                contentArr.forEach(function (contentTab) {
                    var button = contentTab.lastChild.lastChild;
                    button.addEventListener('click', function (event) {
                        var ans = confirm('Are you sure you want to delete the specified artist?');
                        if (!ans)
                            return;
                        contentTab.remove();
                        var id = contentTab.firstChild.lastChild.innerText.trim();
                        fetch('/artists/' + id, {
                            method: 'DELETE',
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                    });
                });
                // add event listeners for the pencil icons
                contentArr.forEach(function (contentTab) {
                    var button = contentTab.lastChild.firstChild;
                    var formContainer = contentTab.nextSibling;
                    button.addEventListener('click', function (event) {
                        contentTab.classList.toggle('border-b');
                        formContainer.classList.toggle('hidden');
                        formContainer.classList.toggle('flex');
                    });
                    var formEl = formContainer.firstChild;
                    formEl.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var emailEl, passwordEl, id, updateBody, response, data, h2El, tempArr, finalStr;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    event.preventDefault();
                                    emailEl = formEl.firstChild;
                                    passwordEl = emailEl.nextSibling;
                                    id = contentTab.firstChild.lastChild.innerText.trim();
                                    if (emailEl.value === "" && passwordEl.value === "") {
                                        return [2 /*return*/];
                                    }
                                    else if (emailEl.value === "") {
                                        updateBody = { password: passwordEl.value.trim() };
                                    }
                                    else if (!emailRegexArtist.test(emailEl.value)) {
                                        return [2 /*return*/];
                                    }
                                    else if (passwordEl.value === "") {
                                        updateBody = { email: emailEl.value.trim() };
                                    }
                                    else {
                                        updateBody = {
                                            email: emailEl.value,
                                            password: passwordEl.value
                                        };
                                    }
                                    console.log(updateBody);
                                    return [4 /*yield*/, fetch('/artists/' + id, {
                                            method: 'PUT',
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(updateBody)
                                        })];
                                case 1:
                                    response = _c.sent();
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _c.sent();
                                    if (updateBody.email) {
                                        h2El = (_a = contentTab.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;
                                        tempArr = (_b = h2El === null || h2El === void 0 ? void 0 : h2El.textContent) === null || _b === void 0 ? void 0 : _b.split('-');
                                        finalStr = tempArr[0].trim() + " - " + data.email;
                                        h2El.textContent = finalStr;
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                return [2 /*return*/];
        }
    });
}); };
run();
