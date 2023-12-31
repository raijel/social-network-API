import { Router } from "express";
import { authRequired } from "../middlewares/tokenValidator.middleware";
import { moderatorOrAdmin } from "../middlewares/roleValidator.middleware";
import {
  createBannedUser,
  getBannedUser,
  getBannedUsers,
  unBanUser,
  updateBannedUser,
} from "../controllers/ban.controller";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import { createBanSchema } from "../schemas/ban.schema";
const router = Router();

router.get("/bans", authRequired, moderatorOrAdmin, getBannedUsers);
router.get("/ban/:id", authRequired, moderatorOrAdmin, getBannedUser);
router.post(
  "/ban/:id",
  authRequired,
  moderatorOrAdmin,
  schemaValidator(createBanSchema),
  createBannedUser
);
router.delete("/ban/:id", authRequired, moderatorOrAdmin, unBanUser);
router.put(
  "/ban/:id",
  authRequired,
  moderatorOrAdmin,
  schemaValidator(createBanSchema),
  updateBannedUser
);

export default router;
