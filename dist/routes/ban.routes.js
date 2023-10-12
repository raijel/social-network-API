"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidator_middleware_1 = require("../middlewares/tokenValidator.middleware");
const roleValidator_middleware_1 = require("../middlewares/roleValidator.middleware");
const ban_controller_1 = require("../controllers/ban.controller");
const schemaValidator_middleware_1 = require("../middlewares/schemaValidator.middleware");
const ban_schema_1 = require("../schemas/ban.schema");
const router = (0, express_1.Router)();
router.get("/bans", tokenValidator_middleware_1.authRequired, roleValidator_middleware_1.moderatorOrAdmin, ban_controller_1.getBannedUsers);
router.get("/ban/:id", tokenValidator_middleware_1.authRequired, roleValidator_middleware_1.moderatorOrAdmin, ban_controller_1.getBannedUser);
router.post("/ban/:id", tokenValidator_middleware_1.authRequired, roleValidator_middleware_1.moderatorOrAdmin, (0, schemaValidator_middleware_1.schemaValidator)(ban_schema_1.createBanSchema), ban_controller_1.createBannedUser);
router.delete("/ban/:id", tokenValidator_middleware_1.authRequired, roleValidator_middleware_1.moderatorOrAdmin, ban_controller_1.unBanUser);
router.put("/ban/:id", tokenValidator_middleware_1.authRequired, roleValidator_middleware_1.moderatorOrAdmin, (0, schemaValidator_middleware_1.schemaValidator)(ban_schema_1.createBanSchema), ban_controller_1.updateBannedUser);
exports.default = router;