import express from "express";
import authorize from "../middlewares/authorize";

const router = express.Router();

router.get("/admin", authorize(["admin"]), (req, res) => {
  res.send("Admin route");
});

router.get("/logistic", authorize(["admin", "logistic"]), (req, res) => {
  res.send("Logistic route");
});

router.get("/finance", authorize(["admin", "finance"]), (req, res) => {
  res.send("Finance route");
});

router.get("/marketing", authorize(["admin", "marketing"]), (req, res) => {
  res.send("Marketing route");
});

export default router;
