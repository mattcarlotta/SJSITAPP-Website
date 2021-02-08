const tsconfigpaths = require("tsconfig-paths");

tsconfigpaths.register({
  baseUrl: "./build",
  paths: {
    "~logger": ["logger/index"],
    "~controllers/*": ["api/controllers/*"],
    "~database/*": ["api/database/*"],
    "~database": ["api/database/index"],
    "~helpers": ["api/helpers/index"],
    "~messages/*": ["api/messages/*"],
    "~middlewares": ["api/middlewares/index"],
    "~models": ["api/models/index"],
    "~models/*": ["api/models/*"],
    "~routes/*": ["api/routes/*"],
    "~routes": ["api/routes/index"],
    "~services/*": ["api/services/*"],
    "~test/*": ["api/test/*"]
  }
});
