// Middleware pour vérifier le rôle
export const adminAccess = (req, res, next) => {
  const user = req.user;
  if (!user || typeof user !== "object" || user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Access denied, insufficient permissions." });
  }
  next();
};
