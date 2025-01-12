import { Router } from "express";
import {
  createCampaign,
  deleteCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
} from "../../controllers/campains/campaignController.js";
const router = Router();
// campaign
router.get("/", getAllCampaigns);
router.get("/:campaignId", getCampaignById);
router.post("/", createCampaign);
router.patch("/:campaignId", updateCampaign);
router.delete("/:campaignId", deleteCampaign);
export default router;
