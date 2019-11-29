/**
 * 功能：计算坐标
 * 作者：edwin
 * 日期：2018/7/18
 */

const random = function (n, m) {
    const randomVal = Math.floor(Math.random() * (m - n + 1) + n)
    return randomVal
}

/** ******以下以星形计算输出坐标*********** */
const layoutStart = function (config) {
    const po = config.targetnodepo
    const sum = config.newnodenum // 生成节点数
    const w = 123 // 节点宽
    const rInside = 300 // 内环半径
    const rInc = w // 半径增量
    let cNum = 0 // 层数
    let r = 750 // 半径
    let α = 360 / sum // 角度
    const poArr = []
    // let bounding
    // let circle

    // 生成节点
    const αArr = [0, 15]
    const αIncArr = [30, 30]
    const cNumArr = [12]
    for (let i = 0; i < sum; i++) {
        const currSum = cNumArr[cNumArr.length - 1]
        if (i > currSum)cNumArr.push(currSum * 2)
    }
    for (let i = 1; i < cNumArr.length; i++) {
        αArr.push(αArr[αArr.length - 1] / 2)
        αIncArr.push(αIncArr[αIncArr.length - 1] / 2)
    }

    const αRandom = random(0, 30)// 角度随机值
    const rRandom = random(-50, 50)// 距离随机值

    for (let i = 0; i < sum; i++) {
        if (i >= cNumArr[cNum])cNum++

        α = αIncArr[cNum] * i + αArr[cNum] + αRandom
        while (α >= 360) {
            α -= 360
        }
        r = rInside + cNum * rInc + rRandom

        poArr.push({ x: po.x + r * Math.cos(α * 3.14 / 180), y: po.y + r * Math.sin(α * 3.14 / 180) })
    }

    return poArr
}

class Polayout {
    static getLayout = function (option) {
        const initConfig = {
            existpo: [], // 已存在点的坐标集合，如 [{x:0, y:1}, {x:10, y:11}...]
            targetnodepo: {}, // 选中节点坐标，如{x:12, y:12}
            newnodenum: 0, // 新加节点数量
        }
        const config = { ...initConfig, ...option }
        return layoutStart(config)
    }
}

export default Polayout
