import argon2 from "argon2";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import User from "../entities/User";
import { generateAccessToken } from "../utils/generateToken";
import { profileSchema } from "./../schemas/profileSchema";
import { formatJoiError } from "./../utils/formatJoiError";

const profileController: any = {};

profileController.getProfile = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    return res.json({
      user: {
        username: user.username,
        email: user.email,
        apiToken: user.apiToken,
      },
    });
  }

  return res.status(500).json({
    message: "Terjadi kesalahan",
  });
};

profileController.updateProfile = async (req: Request, res: Response) => {
  const { error, value } = profileSchema.validate(req.body);

  if (error) {
    return res.status(422).json({ errors: formatJoiError(error) });
  }

  const { username, email, old_password, new_password } = value;
  const checkUsername = await User.findOne({ username: username });

  if (checkUsername && checkUsername.id !== req?.user?.userId) {
    return res
      .status(422)
      .json({ errors: { username: "Username telah digunakan" } });
  }

  if (email) {
    const checkEmail = await User.findOne({ email: email });
    if (
      checkEmail &&
      checkEmail.email !== null &&
      checkEmail.id !== req?.user?.userId
    ) {
      return res
        .status(422)
        .json({ errors: { username: "Email telah digunakan" } });
    }
  }

  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ username: username, email: email })
    .where("id = :id", {
      id: req.user?.userId,
    })
    .execute();

  const user = await User.findOne({ id: req?.user?.userId });
  if (user && new_password) {
    const validPassword = await argon2.verify(user.password, old_password);
    if (!validPassword) {
      return res
        .status(422)
        .json({ errors: { old_password: "Password lama salah" } });
    }

    const hashedPassword = await argon2.hash(new_password);
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ password: hashedPassword })
      .where("id = :id", {
        id: req?.user?.userId,
      })
      .execute();
  }

  return res.json({
    message: "Perubahan profile berhasil",
  });
};

profileController.getApiToken = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    return res.json({
      apiToken: user.apiToken,
    });
  }

  return res.status(500).json({
    message: "Terjadi kesalahan",
  });
};

profileController.refreshApiToken = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    const token = generateAccessToken(user);
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ apiToken: token })
      .where("id = :id", {
        id: user.id,
      })
      .execute();

    return res.json({
      apiToken: token,
    });
  }

  return res.status(500).json({
    message: "Terjadi kesalahan",
  });
};

profileController.revokeApiToken = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ apiToken: null })
      .where("id = :id", {
        id: user.id,
      })
      .execute();

    return res.json({
      token: null,
    });
  }

  return res.status(500).json({
    message: "Terjadi kesalahan",
  });
};

export default profileController;
