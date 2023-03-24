import { Octokit } from "@octokit/rest";
import { RequestError } from "@octokit/request-error";
import { createAppAuth } from "@octokit/auth-app";
import * as dotenv from 'dotenv'
dotenv.config()
import {prompt} from "./lib"

void (async function() {
    try {
        let owner, repo, tag: string | undefined;
        if (typeof process.env.GITHUB_REPOSITORY === 'string') {
            [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
        }
        if (typeof process.env.GITHUB_REF === 'string') { // refs/tags/<tag_name> OR refs/pull/<pr_number>/merge
            tag = process.env.GITHUB_REF.split("/")[2]
        }
        if (owner === undefined || repo === undefined || tag === undefined) {
            process.exit(1);
        }

        const client = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                appId: 309530,
                privateKey: process.env.AUTOPR_APP_TOKEN,
                installationId: 35627228,
            },
            baseUrl: "https://api.github.com",
        });

        const { data } = await client.rest.pulls.create(
            {
                owner: "tkxkd0159",
                repo: "autopr",
                title: "autopr test",
                head: "octopr-test",
                base: "main",
                body: prompt({
                    owner,
                    repo,
                    tag,
                },"<!--- Describe your changes in detail -->\r\n"+"I am msg\r\n")
            }
        )
        console.log("PR created: %s", data.html_url);

    } catch (e) {
        if (e instanceof RequestError) {
            console.error(`${e.status} ${e.name}: ${e.message}\n${JSON.stringify(e.response)}`)
        } else {
            console.error(e)
        }
    }

})();
