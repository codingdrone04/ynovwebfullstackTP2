function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const now = new Date();
    const date = now.toISOString().replace("T", " ").slice(0, 19);
    console.log(`[${date}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });

  next();
}

module.exports = logger;
