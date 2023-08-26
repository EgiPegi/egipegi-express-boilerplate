// src/routes/authRoutes.ts

import { Request, Response } from "express";
import AuthService from "../services/authService";

class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { username, password, role } = req.body;
    await AuthService.register(username, password, role);
    res.status(201).json({ message: "User registered successfully" });
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const authResult = await AuthService.login(username, password);

    if (!authResult) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.json(authResult);
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    // const refreshToken = req.cookies.refreshToken;
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token missing" });
      return;
    }

    try {
      const authResult = await AuthService.refreshToken(refreshToken);
      if (!authResult) {
        res.status(403).json({ message: "Invalid refresh token" });
        return;
      }

      res.json(authResult);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
