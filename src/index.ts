import { getUnpackedSettings } from 'http2'
import { Context, Schema } from 'koishi'

export const name = 'mg-reapeater'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // write your plugin here
}

