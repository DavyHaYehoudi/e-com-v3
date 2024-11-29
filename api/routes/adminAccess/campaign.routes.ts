import { Router } from "express";
import {
  createCampaign,
  deleteCampaign,
  getAllCampaigns,
  updateCampaign,
} from "../../controllers/campains/campaignController.js";

const router = Router();

// campaign
router.get("/", getAllCampaigns);
router.post("/", createCampaign);
router.patch("/:campaignId", updateCampaign);
router.delete("/:campaignId", deleteCampaign);

export default router;
