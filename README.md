* cross-pr
  * fork by github -> upstream :heavy_check_mark:
  * fork by clone -> upstream :x:

> Github API BaseURL for Enterprise : `https://<git_enterprise_url>/api/v3`

# Generating a user access token for a GitHub App
## Device flow
```shell
# Get device_code & user_code for verification
curl -X POST \
-H 'Content-Type: application/json' \
-d '{
    "client_id": <Client ID>
}' \
https://github.com/login/device/code

# Get authorization token
curl -X POST \
-H 'Content-Type: application/json' \
-d '{
    "client_id": <Client ID>,
    "device_code": <Get from Github>,
    "grant_type": "urn:ietf:params:oauth:grant-type:device_code"
}' \
https://github.com/login/oauth/access_token

# Get information about GitHub App installations with token
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <ACCESS-TOKEN>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/user/installations
```

# Generating an installation access token for a GitHub App
``` shell
# Generate jwt from Github App private key
npm run gen-appjwt

# Get installation ID
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <APP-JWT-TOKEN>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/app/installations

# Create an installation access token for an app
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <APP-JWT-TOKEN>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/app/installations/{installation_id}/access_tokens
```

# Check GitHub App installation
```shell
# Enables an authenticated GitHub App to find the user’s installation information.
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <APP-JWT-TOKEN>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/users/{username}/installation

# Enables an authenticated GitHub App to find the repository's installation information
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <APP-JWT-TOKEN>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/{owner}/{repo}/installation
```
