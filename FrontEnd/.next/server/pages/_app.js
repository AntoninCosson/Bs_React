/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/user */ \"./reducers/user.js\");\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-persist */ \"redux-persist\");\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-persist/integration/react */ \"redux-persist/integration/react\");\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux-persist/lib/storage */ \"redux-persist/lib/storage\");\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_redux__WEBPACK_IMPORTED_MODULE_3__, _reducers_user__WEBPACK_IMPORTED_MODULE_4__, _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__]);\n([react_redux__WEBPACK_IMPORTED_MODULE_3__, _reducers_user__WEBPACK_IMPORTED_MODULE_4__, _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\nconst reducers = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__.combineReducers)({\n    user: _reducers_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n});\nconst persistConfig = {\n    key: \"hackatweeeeeet\",\n    storage: (redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7___default())\n};\nconst store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__.configureStore)({\n    reducer: (0,redux_persist__WEBPACK_IMPORTED_MODULE_5__.persistReducer)(persistConfig, reducers),\n    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({\n            serializableCheck: false\n        })\n});\nconst persistor = (0,redux_persist__WEBPACK_IMPORTED_MODULE_5__.persistStore)(store);\n// englober le composant avec :\nfunction App({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_3__.Provider, {\n        store: store,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_6__.PersistGate, {\n            persistor: persistor,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Next.js App\"\n                    }, void 0, false, {\n                        fileName: \"/Users/elcosson/Desktop/BruitsSourds_React/FrontEnd/pages/_app.js\",\n                        lineNumber: 29,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/elcosson/Desktop/BruitsSourds_React/FrontEnd/pages/_app.js\",\n                    lineNumber: 28,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/elcosson/Desktop/BruitsSourds_React/FrontEnd/pages/_app.js\",\n                    lineNumber: 31,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/elcosson/Desktop/BruitsSourds_React/FrontEnd/pages/_app.js\",\n            lineNumber: 27,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/elcosson/Desktop/BruitsSourds_React/FrontEnd/pages/_app.js\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUErQjtBQUNGO0FBRVU7QUFFSDtBQUN5QjtBQUNDO0FBQ2Q7QUFDbUI7QUFFbkUsTUFBTVMsUUFBUSxHQUFHRixpRUFBZSxDQUFDO0lBQUVMLElBQUk7Q0FBRSxDQUFDO0FBQzFDLE1BQU1RLGFBQWEsR0FBRztJQUFFQyxHQUFHLEVBQUUsZ0JBQWdCO0lBQUVMLE9BQU87Q0FBRTtBQUV4RCxNQUFNTSxLQUFLLEdBQUdKLGdFQUFjLENBQUM7SUFDM0JLLE9BQU8sRUFBRVQsNkRBQWMsQ0FBQ00sYUFBYSxFQUFFRCxRQUFRLENBQUM7SUFDaERLLFVBQVUsRUFBRSxDQUFDQyxvQkFBb0IsR0FDL0JBLG9CQUFvQixDQUFDO1lBQUVDLGlCQUFpQixFQUFFLEtBQUs7U0FBRSxDQUFDO0NBQ3JELENBQUM7QUFDRixNQUFNQyxTQUFTLEdBQUdkLDJEQUFZLENBQUNTLEtBQUssQ0FBQztBQUVyQywrQkFBK0I7QUFFL0IsU0FBU00sR0FBRyxDQUFDLEVBQUVDLFNBQVMsR0FBRUMsU0FBUyxHQUFFLEVBQUU7SUFDckMscUJBQ0UsOERBQUNuQixpREFBUTtRQUFDVyxLQUFLLEVBQUVBLEtBQUs7a0JBQ3BCLDRFQUFDUCx3RUFBVztZQUFDWSxTQUFTLEVBQUVBLFNBQVM7OzhCQUMvQiw4REFBQ2pCLGtEQUFJOzhCQUNILDRFQUFDcUIsT0FBSztrQ0FBQyxhQUFXOzs7Ozs0QkFBUTs7Ozs7d0JBQ3JCOzhCQUNQLDhEQUFDRixTQUFTO29CQUFFLEdBQUdDLFNBQVM7Ozs7O3dCQUFJOzs7Ozs7Z0JBQ2hCOzs7OztZQUNMLENBQ1g7Q0FDSDtBQUVELGlFQUFlRixHQUFHLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teW1vdml6LXBhcnQxLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xyXG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XHJcblxyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5cclxuaW1wb3J0IHVzZXIgZnJvbSBcIi4uL3JlZHVjZXJzL3VzZXJcIjtcclxuaW1wb3J0IHsgcGVyc2lzdFN0b3JlLCBwZXJzaXN0UmVkdWNlciB9IGZyb20gXCJyZWR1eC1wZXJzaXN0XCI7XHJcbmltcG9ydCB7IFBlcnNpc3RHYXRlIH0gZnJvbSBcInJlZHV4LXBlcnNpc3QvaW50ZWdyYXRpb24vcmVhY3RcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcInJlZHV4LXBlcnNpc3QvbGliL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzLCBjb25maWd1cmVTdG9yZSB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XHJcblxyXG5jb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7IHVzZXIgfSk7XHJcbmNvbnN0IHBlcnNpc3RDb25maWcgPSB7IGtleTogXCJoYWNrYXR3ZWVlZWVldFwiLCBzdG9yYWdlIH07XHJcblxyXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHtcclxuICByZWR1Y2VyOiBwZXJzaXN0UmVkdWNlcihwZXJzaXN0Q29uZmlnLCByZWR1Y2VycyksXHJcbiAgbWlkZGxld2FyZTogKGdldERlZmF1bHRNaWRkbGV3YXJlKSA9PlxyXG4gICAgZ2V0RGVmYXVsdE1pZGRsZXdhcmUoeyBzZXJpYWxpemFibGVDaGVjazogZmFsc2UgfSksXHJcbn0pO1xyXG5jb25zdCBwZXJzaXN0b3IgPSBwZXJzaXN0U3RvcmUoc3RvcmUpO1xyXG5cclxuLy8gZW5nbG9iZXIgbGUgY29tcG9zYW50IGF2ZWMgOlxyXG5cclxuZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgPFBlcnNpc3RHYXRlIHBlcnNpc3Rvcj17cGVyc2lzdG9yfT5cclxuICAgICAgICA8SGVhZD5cclxuICAgICAgICAgIDx0aXRsZT5OZXh0LmpzIEFwcDwvdGl0bGU+XHJcbiAgICAgICAgPC9IZWFkPlxyXG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgPC9QZXJzaXN0R2F0ZT5cclxuICAgIDwvUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwOyJdLCJuYW1lcyI6WyJIZWFkIiwiUHJvdmlkZXIiLCJ1c2VyIiwicGVyc2lzdFN0b3JlIiwicGVyc2lzdFJlZHVjZXIiLCJQZXJzaXN0R2F0ZSIsInN0b3JhZ2UiLCJjb21iaW5lUmVkdWNlcnMiLCJjb25maWd1cmVTdG9yZSIsInJlZHVjZXJzIiwicGVyc2lzdENvbmZpZyIsImtleSIsInN0b3JlIiwicmVkdWNlciIsIm1pZGRsZXdhcmUiLCJnZXREZWZhdWx0TWlkZGxld2FyZSIsInNlcmlhbGl6YWJsZUNoZWNrIiwicGVyc2lzdG9yIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwidGl0bGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./reducers/user.js":
/*!**************************!*\
  !*** ./reducers/user.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"connect\": () => (/* binding */ connect),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"logout\": () => (/* binding */ logout),\n/* harmony export */   \"userSlice\": () => (/* binding */ userSlice)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__]);\n_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst initialState = {\n    token: \"\",\n    connected: false,\n    username: \"\",\n    bestScore: 0\n};\nconst userSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"user\",\n    initialState,\n    reducers: {\n        connect: (state, action)=>{\n            state.token = action.payload.token;\n            state.connected = action.payload.connected;\n            state.username = action.payload.username;\n            state.author = action.payload.author;\n            state.bestScore = action.payload.bestScore;\n        },\n        logout: (state)=>{\n            state.token = null;\n            state.connected = null;\n            state.username = null;\n            state.author = null;\n        }\n    }\n});\nconst { connect , logout  } = userSlice.actions;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userSlice.reducer); /*\n// partie composants : \nimport { useDispatch } from 'react-redux'; // utilisé pour dispatcher les fonction\nimport { addToCounter } from '../reducers/counter' // import des fonctions\nimport { useSelector } from 'react-redux'; // utilisé pour lire les values\n// a l'interieur du composant : \nconst dispatch = useDispatch(); // pour use une fonction\nconst counter = useSelector((state) => state.counter.value) // pour lire une value, doit correspondre au name\ndispatch(addToCounter(-1)) // exemple d'utilisation d'une fonction\n*/ \n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1Y2Vycy91c2VyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQytDO0FBRS9DLE1BQU1DLFlBQVksR0FBRztJQUNiQyxLQUFLLEVBQUUsRUFBRTtJQUNUQyxTQUFTLEVBQUUsS0FBSztJQUNoQkMsUUFBUSxFQUFFLEVBQUU7SUFDWkMsU0FBUyxFQUFFLENBQUM7Q0FDbkI7QUFFTSxNQUFNQyxTQUFTLEdBQUdOLDZEQUFXLENBQUM7SUFDckNPLElBQUksRUFBRSxNQUFNO0lBQ1hOLFlBQVk7SUFFVE8sUUFBUSxFQUFFO1FBQ05DLE9BQU8sRUFBRSxDQUFDQyxLQUFLLEVBQUVDLE1BQU0sR0FBSztZQUMzQkQsS0FBSyxDQUFDUixLQUFLLEdBQUdTLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDVixLQUFLO1lBQ2xDUSxLQUFLLENBQUNQLFNBQVMsR0FBR1EsTUFBTSxDQUFDQyxPQUFPLENBQUNULFNBQVMsQ0FBQztZQUMzQ08sS0FBSyxDQUFDTixRQUFRLEdBQUdPLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDUixRQUFRLENBQUM7WUFDekNNLEtBQUssQ0FBQ0csTUFBTSxHQUFHRixNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsTUFBTSxDQUFDO1lBQ3JDSCxLQUFLLENBQUNMLFNBQVMsR0FBR00sTUFBTSxDQUFDQyxPQUFPLENBQUNQLFNBQVMsQ0FBQztTQUMzQztRQUNEUyxNQUFNLEVBQUUsQ0FBQ0osS0FBSyxHQUFLO1lBQ25CQSxLQUFLLENBQUNSLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbkJRLEtBQUssQ0FBQ1AsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN2Qk8sS0FBSyxDQUFDTixRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3RCTSxLQUFLLENBQUNHLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDbkI7S0FDSjtDQUNKLENBQUMsQ0FBQztBQUNJLE1BQU0sRUFBRUosT0FBTyxHQUFFSyxNQUFNLEdBQUUsR0FBR1IsU0FBUyxDQUFDUyxPQUFPLENBQUM7QUFDckQsaUVBQWVULFNBQVMsQ0FBQ1UsT0FBTyxFQUFDLENBRWpDOzs7Ozs7Ozs7RUFTRSIsInNvdXJjZXMiOlsid2VicGFjazovL215bW92aXotcGFydDEvLi9yZWR1Y2Vycy91c2VyLmpzPzBkZjQiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBjcmVhdGVTbGljZSB9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgIHRva2VuOiAnJyxcbiAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgICBiZXN0U2NvcmU6IDAsXG59O1xuXG5leHBvcnQgY29uc3QgdXNlclNsaWNlID0gY3JlYXRlU2xpY2Uoe1xubmFtZTogJ3VzZXInLFxuIGluaXRpYWxTdGF0ZSxcblxuICAgIHJlZHVjZXJzOiB7XG4gICAgICAgIGNvbm5lY3Q6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgICBzdGF0ZS50b2tlbiA9IGFjdGlvbi5wYXlsb2FkLnRva2VuXG4gICAgICAgICBzdGF0ZS5jb25uZWN0ZWQgPSBhY3Rpb24ucGF5bG9hZC5jb25uZWN0ZWQ7XG4gICAgICAgICBzdGF0ZS51c2VybmFtZSA9IGFjdGlvbi5wYXlsb2FkLnVzZXJuYW1lO1xuICAgICAgICAgc3RhdGUuYXV0aG9yID0gYWN0aW9uLnBheWxvYWQuYXV0aG9yO1xuICAgICAgICAgc3RhdGUuYmVzdFNjb3JlID0gYWN0aW9uLnBheWxvYWQuYmVzdFNjb3JlO1xuICAgICAgICB9LFxuICAgICAgICBsb2dvdXQ6IChzdGF0ZSkgPT4ge1xuICAgICAgICBzdGF0ZS50b2tlbiA9IG51bGw7XG4gICAgICAgIHN0YXRlLmNvbm5lY3RlZCA9IG51bGw7XG4gICAgICAgIHN0YXRlLnVzZXJuYW1lID0gbnVsbDtcbiAgICAgICAgc3RhdGUuYXV0aG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG59KTtcbmV4cG9ydCBjb25zdCB7IGNvbm5lY3QsIGxvZ291dCB9ID0gdXNlclNsaWNlLmFjdGlvbnM7XG5leHBvcnQgZGVmYXVsdCB1c2VyU2xpY2UucmVkdWNlcjtcblxuLypcbi8vIHBhcnRpZSBjb21wb3NhbnRzIDogXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4JzsgLy8gdXRpbGlzw6kgcG91ciBkaXNwYXRjaGVyIGxlcyBmb25jdGlvblxuaW1wb3J0IHsgYWRkVG9Db3VudGVyIH0gZnJvbSAnLi4vcmVkdWNlcnMvY291bnRlcicgLy8gaW1wb3J0IGRlcyBmb25jdGlvbnNcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnOyAvLyB1dGlsaXPDqSBwb3VyIGxpcmUgbGVzIHZhbHVlc1xuLy8gYSBsJ2ludGVyaWV1ciBkdSBjb21wb3NhbnQgOiBcbmNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTsgLy8gcG91ciB1c2UgdW5lIGZvbmN0aW9uXG5jb25zdCBjb3VudGVyID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5jb3VudGVyLnZhbHVlKSAvLyBwb3VyIGxpcmUgdW5lIHZhbHVlLCBkb2l0IGNvcnJlc3BvbmRyZSBhdSBuYW1lXG5kaXNwYXRjaChhZGRUb0NvdW50ZXIoLTEpKSAvLyBleGVtcGxlIGQndXRpbGlzYXRpb24gZCd1bmUgZm9uY3Rpb25cbiovIl0sIm5hbWVzIjpbImNyZWF0ZVNsaWNlIiwiaW5pdGlhbFN0YXRlIiwidG9rZW4iLCJjb25uZWN0ZWQiLCJ1c2VybmFtZSIsImJlc3RTY29yZSIsInVzZXJTbGljZSIsIm5hbWUiLCJyZWR1Y2VycyIsImNvbm5lY3QiLCJzdGF0ZSIsImFjdGlvbiIsInBheWxvYWQiLCJhdXRob3IiLCJsb2dvdXQiLCJhY3Rpb25zIiwicmVkdWNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./reducers/user.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "redux-persist":
/*!********************************!*\
  !*** external "redux-persist" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist");

/***/ }),

/***/ "redux-persist/integration/react":
/*!**************************************************!*\
  !*** external "redux-persist/integration/react" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ "redux-persist/lib/storage":
/*!********************************************!*\
  !*** external "redux-persist/lib/storage" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/lib/storage");

/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@reduxjs/toolkit");;

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-redux");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();