import { Context, Dict, Random, Schema, Session} from 'koishi'

export const name = 'mg-reapeater'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // write your plugin here
}

interface RepeatState{
  content: string
  repeated: boolean
  times: number
  usrs: Dict<number>
}

type StateCallback = (state: RepeatState, session: Session) => void | string

interface RepeatHandler{
  minTimes?: number
  probability?: number
}

interface InterruptHandler{
  minTimes?: number
  replyText?: string
}

const RepeatHandler : Schema<RepeatHandler> = Schema.object({
  minTimes: Schema.natural().min(2).default(2).description("最小重复次数"),
  probability: Schema.percent().default(1).description("复读发生概率"),
})

const InterruptHandler : Schema<InterruptHandler> = Schema.object({
  minTimes: Schema.natural().min(3).default(3).description("最小打断次数"),
  replyText: Schema.string().role("textarea").default("打断复读！").description("打断提示词")
})

function onRepeat(options: RepeatHandler | StateCallback): StateCallback{
  if(!options || typeof options !== 'object') return options as StateCallback
  const{minTimes = 2,probability = 1} = options
  return({repeated,times,content}) => times >= minTimes && !repeated && Random.bool(probability) ? content : ""
}

