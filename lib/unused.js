//BangYanzy X Claire 1 menit
const { exec } = require("child_process");
const fs = require("fs");

/** @type {{ dependencies: Object<string, string> }} */
const { dependencies } = JSON.parse(fs.readFileSync("./package.json"));

exec("find .", (err, stdout) => {
  if(err) throw err;

  const files = stdout
    .toString()
    .trim()
    .split("\n")
    .filter(v => (
      !v.includes("node_modules") &&
      /\.(m|c)?js$/i.test(v)
    ));
  const modules = Object.fromEntries(
    Object.entries(
      dependencies
    ).map(([key]) => [
      key,
      false
    ])
  );
  for(const file of files) {
    const data = fs.readFileSync(file);
    for(const module in modules) {
      if(modules[module] === false) {
        const regex = new RegExp(`("|')${module}("|')`);
        modules[module] = regex.test(data);
      }
    }
  }
  console.log(
    Object.fromEntries(
      Object.entries(
        modules
      ).filter(([, val]) => val === false)
    )
  );
});
