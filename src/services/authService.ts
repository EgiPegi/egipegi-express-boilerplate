// src/services/authService.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface AuthResult {
  token: string;
  refreshToken: string;
}

class AuthService {
  static async register(
    username: string,
    password: string,
    role: string
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role });
  }

  static async login(
    username: string,
    password: string
  ): Promise<AuthResult | null> {
    const user = await User.findOne({ username });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      { username, role: user.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { username, role: user.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "7d" }
    );

    return { token, refreshToken };
  }

  static async refreshToken(refreshToken: string): Promise<AuthResult | null> {
    try {
      const decoded: any = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET || ""
      );

      const user = await User.findOne({ username: decoded.username });

      if (!user) {
        return null;
      }

      const newAccessToken = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET || "",
        { expiresIn: "1h" }
      );

      return { token: newAccessToken, refreshToken };
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;
