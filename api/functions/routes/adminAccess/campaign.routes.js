import { Router } from "express";
import {
  createCampaign,
  deleteCampaign,
  getAllCampaigns,
  sendCampaign,
} from "../../controllers/campains/campaignController.js";
const router = Router();
// campaign
router.get("/", getAllCampaigns);
router.post("/", createCampaign);
router.patch("/:campaignId", sendCampaign);
router.delete("/:campaignId", deleteCampaign);
export default router;
