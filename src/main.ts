import { Octokit } from "@octokit/rest";
import { RequestError } from "@octokit/request-error";
import * as dotenv from 'dotenv'
dotenv.config()
import {prompt} from "./lib"

const client = new Octokit({
    auth: "",
    baseUrl: "https://api.github.com",
});

void (function() {
    try {
        let owner, repo, tag: string | undefined;
        if (typeof process.env.GITHUB_REPOSITORY === 'string') {
            [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
        }
        if (typeof process.env.GITHUB_REF === 'string') {
            tag = process.env.GITHUB_REF.split("/")[2]
        }
        if (owner === undefined || repo === undefined || tag === undefined) {
            process.exit(1);
        }

        console.log(prompt({
            owner,
            repo,
            tag,
        },"I am msg"))

        // const prs = await client.rest.pulls.create()
        // console.log(prs)

        // const prs = await client.rest.pulls.list(
        //     {
        //         owner: "BlockchainLab",
        //         repo: "lbm-proxy",
        //         state: "all",
        //     }
        // )
        // console.log(prs)
    } catch (e) {
        if (e instanceof RequestError) {
            console.error(`${e.status} ${e.name}: ${e.message}\n${JSON.stringify(e.response)}`)
        } else {
            console.error(e)
        }
    }

})();
