const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const tag = process.env.GITHUB_REF.split("/")[2];
const client = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 309530,
    privateKey: process.env.AUTOPR_APP_TOKEN,
    installationId: 35627228,
  },
  baseUrl: "https://api.github.com",
});
const { data } = await client.rest.pulls.create({
  owner: process.env.OWNER,
  repo: process.env.REPO,
  title: process.env.TITLE,
  head: process.env.HEAD,
  base: "main",
  body: prompt(
    {
      owner,
      repo,
      tag,
    },
    "<!--- Describe your changes in detail -->\r\n" + "I am msg\r\n"
  ),
});
console.log("PR created: %s", data.html_url);
