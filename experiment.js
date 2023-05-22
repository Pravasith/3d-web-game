const num = Number(process.env.NUM)

const runningNumbers = n => {
    if (n == 0) {
        console.log("BASE: " + n)
        return num
    }

    console.log("PRE: " + n)
    const res = runningNumbers(n - 1)

    console.log("POST: " + n, res)
    return num - n
}

runningNumbers(num)


