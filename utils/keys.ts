// bites:restaurant:sdjg

export function getKeyName(...args: string[]) {
    return `bites:${args.join(":")}`
}

