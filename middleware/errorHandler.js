export const notFound = (req, res) => res.status(404).json({ success: false, message: "Not found" });
export const errorHandler = (err, req, res, _next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ success: false, message: err.status ? err.message : "Something went wrong on our side. Please try again." });
};
