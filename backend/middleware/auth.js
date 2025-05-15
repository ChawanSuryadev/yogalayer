export function verifyToken(req, res, next) {
  // Logic to verify JWT token from headers or cookies
  // decode token, attach user info to req.user
  // for now, pretend token decoded:
  req.user = { id: "someuserid", isAdmin: true }; // TEMP for testing
  next();
}

export function verifyAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admins only" });
  }
}
