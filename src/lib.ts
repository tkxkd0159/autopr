function prompt(srcInfo: GhInfo, msg: string): string {
    return `This PR is auto-generated by finschia repo to remind bumping up\n
tag: ${srcInfo.tag}, [ref](https://github.com/${srcInfo.owner}/${srcInfo.repo}/tree/${srcInfo.tag})
${msg}
`
}

interface GhInfo {
    owner: string,
    repo: string,
    tag: string,
}

export {
    prompt
}