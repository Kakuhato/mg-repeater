import { getUnpackedSettings } from 'http2'
import { Context, Dict, Schema } from 'koishi'

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
