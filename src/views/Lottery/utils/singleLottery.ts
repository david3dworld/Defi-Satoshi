/* eslint-disable */
import BigNumber from "bignumber.js";
import { generateLotteryDate } from "./generateLotteryDate";
import { getIssueIndex, getRates, getSingleLotteryBatch, getTicketPrice, SingleLottery } from "./lotteryUtils";
import { ceilDecimal } from "../utils/mathUtils";
import { getAddress } from "utils/addressHelpers";
import getBscScanLink from 'utils/getBscScanLink'
import { contracts } from "config/constants";

const chainId = process.env.REACT_APP_CHAIN_ID
const LOTTERY_CONTRACT = getAddress(contracts[chainId].lottery);

export const lottery = async (
  lotteryNumber: number
): Promise<
  | SingleLottery
  | {
      error?: string;
      errorMessage?: string;
      maxLotteryNumber?: number;
    }
> => {
  const issueIndex = await getIssueIndex();
  
  if (typeof issueIndex !== "number") {
    return issueIndex;
  }
  //Check if lotteryNumber is out of range (small 0 or bigger last Lottery (Drawn))
  if (lotteryNumber < 0 || lotteryNumber > issueIndex) {
    return {
      error: "lotteryNumber out of range",
      errorMessage: `The LotteryNumber you provided is does not exists`,
      maxLotteryNumber: issueIndex,
    };
  }
  const { numbers1: numbers1Prom, numbers2: numbers2Prom } = getSingleLotteryBatch(lotteryNumber);
  const numbers1 = await numbers1Prom;
  const numbers2Res = await numbers2Prom;
  const numbers2: Array<number> = numbers2Res.map((n) => new BigNumber(n).div(1e18).toNumber());

  const lotteryDate = generateLotteryDate(lotteryNumber);
  const ratesToUse = getRates(lotteryNumber);
  const ticketPrice = getTicketPrice(lotteryNumber);
  const poolSize = numbers2[0];
  const lottery: SingleLottery = {
    lotteryNumber,
    lotteryDate,
    lotteryNumbers: numbers1.map((x) => Number(x)),
    poolSize: ceilDecimal(poolSize, 2),
    burned: ceilDecimal((poolSize / 100) * ratesToUse.burn, 2),
    contractLink: getBscScanLink(parseInt(chainId), LOTTERY_CONTRACT, 'address'),
    jackpotTicket: numbers2[1] / ticketPrice,
    match3Ticket: numbers2[2] / ticketPrice,
    match2Ticket: numbers2[3] / ticketPrice,
    match1Ticket: numbers2[4] ? numbers2[4] / ticketPrice : null,
    poolJackpot: ceilDecimal((poolSize / 100) * ratesToUse.jackpot, 2),
    poolMatch3: ceilDecimal((poolSize / 100) * ratesToUse.match3, 2),
    poolMatch2: ceilDecimal((poolSize / 100) * ratesToUse.match2, 2),
    poolMatch1: ratesToUse.match1 ? ceilDecimal((poolSize / 100) * ratesToUse.match1, 2) : null,
  };
  return lottery;
};
