import GcTextToSpeech, { type TextToSpeechClient } from '@google-cloud/text-to-speech'
import config from '../config'
import type { CredentialBody } from 'google-auth-library/build/src/auth/credentials'

class GcTextToSpeechClient {
  private readonly _client: TextToSpeechClient
  constructor (credentials: CredentialBody) {
    this._client = new GcTextToSpeech.TextToSpeechClient({ credentials })
  }

  async textToSpeech (text: string): Promise<string | Uint8Array | null | undefined> {
    const ssml = `<speak>${text}</speak>`

    const [response] = await this._client.synthesizeSpeech({
      input: { ssml },
      voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
      audioConfig: { audioEncoding: 'OGG_OPUS' }
    })

    return response.audioContent
  }
}

const credentials = JSON.parse(Buffer.from(config.gc.credentials, 'base64').toString('utf-8'))

export const gcTextToSpeedClient = new GcTextToSpeechClient(credentials)
