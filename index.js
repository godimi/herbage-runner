const Koa = require("koa");
const Router = require("koa-router");
const axios = require("axios");
const { exec } = require("child_process");

const app = new Koa();
const router = new Router();

router.post("/webhook", ctx => {
  const { callback_url } = ctx.request.body;
  if (!callback_url) return;

  axios
    .post(callback_url, ctx.request.body)
    .then(function(response) {
      if (response.data.state !== "success") return;

      console.log("docker-compose up command called");
      exec(`sh ${process.env.RUN_SCRIPT_PATH}`, (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err);
        } else {
          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
