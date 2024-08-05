"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPool = initPool;
exports.getPool = getPool;
var promise_1 = require("mysql2/promise");
var db_config_1 = require("./db.config");
var pool;
function initPool() {
    if (!pool) {
        pool = (0, promise_1.createPool)((0, db_config_1.default)());
    }
}
function getPool() {
    return pool;
}
