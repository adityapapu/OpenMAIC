/**
 * Audio Provider Constants
 *
 * Registry of all TTS and ASR providers with their metadata.
 * Separated from tts-providers.ts and asr-providers.ts to avoid importing
 * Node.js libraries (like sharp, buffer) in client components.
 *
 * This file is client-safe and can be imported in both client and server components.
 *
 * To add a new provider:
 * 1. Add the provider ID to TTSProviderId or ASRProviderId in types.ts
 * 2. Add provider configuration to TTS_PROVIDERS or ASR_PROVIDERS below
 * 3. Implement provider logic in tts-providers.ts or asr-providers.ts
 * 4. Add i18n translations in lib/i18n.ts
 *
 * Provider configuration should include:
 * - id: Unique identifier matching the type definition
 * - name: Display name for the provider
 * - requiresApiKey: Whether the provider needs an API key
 * - defaultBaseUrl: Default API endpoint (optional)
 * - icon: Path to provider icon (optional)
 * - voices: Array of available voices (TTS only)
 * - supportedFormats: Audio formats supported by the provider
 * - speedRange: Min/max/default speed settings (TTS only)
 * - supportedLanguages: Languages supported by the provider (ASR only)
 */

import type {
  TTSProviderId,
  TTSProviderConfig,
  TTSVoiceInfo,
  ASRProviderId,
  ASRProviderConfig,
} from './types';

/**
 * TTS Provider Registry
 *
 * Central registry for all TTS providers.
 * Keep in sync with TTSProviderId type definition.
 */
export const TTS_PROVIDERS: Record<TTSProviderId, TTSProviderConfig> = {
  'openai-tts': {
    id: 'openai-tts',
    name: 'OpenAI TTS',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.openai.com/v1',
    icon: '/logos/openai.svg',
    voices: [
      // Recommended voices (best quality)
      {
        id: 'marin',
        name: 'Marin',
        language: 'en',
        gender: 'neutral',
        description: 'voiceMarin',
      },
      {
        id: 'cedar',
        name: 'Cedar',
        language: 'en',
        gender: 'neutral',
        description: 'voiceCedar',
      },
      // Standard voices (alphabetical)
      {
        id: 'alloy',
        name: 'Alloy',
        language: 'en',
        gender: 'neutral',
        description: 'voiceAlloy',
      },
      {
        id: 'ash',
        name: 'Ash',
        language: 'en',
        gender: 'neutral',
        description: 'voiceAsh',
      },
      {
        id: 'ballad',
        name: 'Ballad',
        language: 'en',
        gender: 'neutral',
        description: 'voiceBallad',
      },
      {
        id: 'coral',
        name: 'Coral',
        language: 'en',
        gender: 'neutral',
        description: 'voiceCoral',
      },
      {
        id: 'echo',
        name: 'Echo',
        language: 'en',
        gender: 'male',
        description: 'voiceEcho',
      },
      {
        id: 'fable',
        name: 'Fable',
        language: 'en',
        gender: 'neutral',
        description: 'voiceFable',
      },
      {
        id: 'nova',
        name: 'Nova',
        language: 'en',
        gender: 'female',
        description: 'voiceNova',
      },
      {
        id: 'onyx',
        name: 'Onyx',
        language: 'en',
        gender: 'male',
        description: 'voiceOnyx',
      },
      {
        id: 'sage',
        name: 'Sage',
        language: 'en',
        gender: 'neutral',
        description: 'voiceSage',
      },
      {
        id: 'shimmer',
        name: 'Shimmer',
        language: 'en',
        gender: 'female',
        description: 'voiceShimmer',
      },
      {
        id: 'verse',
        name: 'Verse',
        language: 'en',
        gender: 'neutral',
        description: 'voiceVerse',
      },
    ],
    supportedFormats: ['mp3', 'opus', 'aac', 'flac'],
    speedRange: { min: 0.25, max: 4.0, default: 1.0 },
  },

  'azure-tts': {
    id: 'azure-tts',
    name: 'Azure TTS',
    requiresApiKey: true,
    defaultBaseUrl: 'https://{region}.tts.speech.microsoft.com',
    icon: '/logos/azure.svg',
    voices: [
      {
        id: 'zh-CN-XiaoxiaoNeural',
        name: '晓晓 (女)',
        language: 'zh-CN',
        gender: 'female',
      },
      {
        id: 'zh-CN-YunxiNeural',
        name: '云希 (男)',
        language: 'zh-CN',
        gender: 'male',
      },
      {
        id: 'zh-CN-XiaoyiNeural',
        name: '晓伊 (女)',
        language: 'zh-CN',
        gender: 'female',
      },
      {
        id: 'zh-CN-YunjianNeural',
        name: '云健 (男)',
        language: 'zh-CN',
        gender: 'male',
      },
      {
        id: 'en-US-JennyNeural',
        name: 'Jenny',
        language: 'en-US',
        gender: 'female',
      },
      { id: 'en-US-GuyNeural', name: 'Guy', language: 'en-US', gender: 'male' },
    ],
    supportedFormats: ['mp3', 'wav', 'ogg'],
    speedRange: { min: 0.5, max: 2.0, default: 1.0 },
  },

  'glm-tts': {
    id: 'glm-tts',
    name: 'GLM TTS',
    requiresApiKey: true,
    defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    icon: '/logos/glm.svg',
    voices: [
      {
        id: 'tongtong',
        name: '彤彤',
        language: 'zh',
        gender: 'neutral',
        description: 'glmVoiceTongtong',
      },
      {
        id: 'chuichui',
        name: '锤锤',
        language: 'zh',
        gender: 'neutral',
        description: 'glmVoiceChuichui',
      },
      {
        id: 'xiaochen',
        name: '小陈',
        language: 'zh',
        gender: 'neutral',
        description: 'glmVoiceXiaochen',
      },
      {
        id: 'jam',
        name: 'Jam',
        language: 'zh',
        gender: 'neutral',
        description: 'glmVoiceJam',
      },
      {
        id: 'kazi',
        name: 'Kazi',
        language: 'zh',
        gender: 'neutral',
        description: 'glmVoiceKazi',
      },
      {
        id: 'douji',
        name: '豆几',
        language: 'zh',
        gender: 'neutral',
        description: 'glmVoiceDouji',
      },
      {
        id: 'luodo',
        name: '罗多',
        language: 'zh',
        gender: 'neutral',
        description: 'glmVoiceLuodo',
      },
    ],
    supportedFormats: ['wav'],
    speedRange: { min: 0.5, max: 2.0, default: 1.0 },
  },

  'qwen-tts': {
    id: 'qwen-tts',
    name: 'Qwen TTS (阿里云百炼)',
    requiresApiKey: true,
    defaultBaseUrl: 'https://dashscope.aliyuncs.com/api/v1',
    icon: '/logos/bailian.svg',
    voices: [
      // Standard Mandarin voices
      {
        id: 'Cherry',
        name: '芊悦 (Cherry)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceCherry',
      },
      {
        id: 'Serena',
        name: '苏瑶 (Serena)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceSerena',
      },
      {
        id: 'Ethan',
        name: '晨煦 (Ethan)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceEthan',
      },
      {
        id: 'Chelsie',
        name: '千雪 (Chelsie)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceChelsie',
      },
      {
        id: 'Momo',
        name: '茉兔 (Momo)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceMomo',
      },
      {
        id: 'Vivian',
        name: '十三 (Vivian)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceVivian',
      },
      {
        id: 'Moon',
        name: '月白 (Moon)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceMoon',
      },
      {
        id: 'Maia',
        name: '四月 (Maia)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceMaia',
      },
      {
        id: 'Kai',
        name: '凯 (Kai)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceKai',
      },
      {
        id: 'Nofish',
        name: '不吃鱼 (Nofish)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceNofish',
      },
      {
        id: 'Bella',
        name: '萌宝 (Bella)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceBella',
      },
      {
        id: 'Jennifer',
        name: '詹妮弗 (Jennifer)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceJennifer',
      },
      {
        id: 'Ryan',
        name: '甜茶 (Ryan)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceRyan',
      },
      {
        id: 'Katerina',
        name: '卡捷琳娜 (Katerina)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceKaterina',
      },
      {
        id: 'Aiden',
        name: '艾登 (Aiden)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceAiden',
      },
      {
        id: 'Eldric Sage',
        name: '沧明子 (Eldric Sage)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceEldricSage',
      },
      {
        id: 'Mia',
        name: '乖小妹 (Mia)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceMia',
      },
      {
        id: 'Mochi',
        name: '沙小弥 (Mochi)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceMochi',
      },
      {
        id: 'Bellona',
        name: '燕铮莺 (Bellona)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceBellona',
      },
      {
        id: 'Vincent',
        name: '田叔 (Vincent)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceVincent',
      },
      {
        id: 'Bunny',
        name: '萌小姬 (Bunny)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceBunny',
      },
      {
        id: 'Neil',
        name: '阿闻 (Neil)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceNeil',
      },
      {
        id: 'Elias',
        name: '墨讲师 (Elias)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceElias',
      },
      {
        id: 'Arthur',
        name: '徐大爷 (Arthur)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceArthur',
      },
      {
        id: 'Nini',
        name: '邻家妹妹 (Nini)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceNini',
      },
      {
        id: 'Ebona',
        name: '诡婆婆 (Ebona)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceEbona',
      },
      {
        id: 'Seren',
        name: '小婉 (Seren)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceSeren',
      },
      {
        id: 'Pip',
        name: '顽屁小孩 (Pip)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoicePip',
      },
      {
        id: 'Stella',
        name: '少女阿月 (Stella)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceStella',
      },
      // International voices
      {
        id: 'Bodega',
        name: '博德加 (Bodega)',
        language: 'es',
        gender: 'male',
        description: 'qwenVoiceBodega',
      },
      {
        id: 'Sonrisa',
        name: '索尼莎 (Sonrisa)',
        language: 'es',
        gender: 'female',
        description: 'qwenVoiceSonrisa',
      },
      {
        id: 'Alek',
        name: '阿列克 (Alek)',
        language: 'ru',
        gender: 'male',
        description: 'qwenVoiceAlek',
      },
      {
        id: 'Dolce',
        name: '多尔切 (Dolce)',
        language: 'it',
        gender: 'male',
        description: 'qwenVoiceDolce',
      },
      {
        id: 'Sohee',
        name: '素熙 (Sohee)',
        language: 'ko',
        gender: 'female',
        description: 'qwenVoiceSohee',
      },
      {
        id: 'Ono Anna',
        name: '小野杏 (Ono Anna)',
        language: 'ja',
        gender: 'female',
        description: 'qwenVoiceOnoAnna',
      },
      {
        id: 'Lenn',
        name: '莱恩 (Lenn)',
        language: 'de',
        gender: 'male',
        description: 'qwenVoiceLenn',
      },
      {
        id: 'Emilien',
        name: '埃米尔安 (Emilien)',
        language: 'fr',
        gender: 'male',
        description: 'qwenVoiceEmilien',
      },
      {
        id: 'Andre',
        name: '安德雷 (Andre)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceAndre',
      },
      {
        id: 'Radio Gol',
        name: '拉迪奥·戈尔 (Radio Gol)',
        language: 'pt',
        gender: 'male',
        description: 'qwenVoiceRadioGol',
      },
      // Dialect voices
      {
        id: 'Jada',
        name: '上海-阿珍 (Jada)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceJada',
      },
      {
        id: 'Dylan',
        name: '北京-晓东 (Dylan)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceDylan',
      },
      {
        id: 'Li',
        name: '南京-老李 (Li)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceLi',
      },
      {
        id: 'Marcus',
        name: '陕西-秦川 (Marcus)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceMarcus',
      },
      {
        id: 'Roy',
        name: '闽南-阿杰 (Roy)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceRoy',
      },
      {
        id: 'Peter',
        name: '天津-李彼得 (Peter)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoicePeter',
      },
      {
        id: 'Sunny',
        name: '四川-晴儿 (Sunny)',
        language: 'zh-CN',
        gender: 'female',
        description: 'qwenVoiceSunny',
      },
      {
        id: 'Eric',
        name: '四川-程川 (Eric)',
        language: 'zh-CN',
        gender: 'male',
        description: 'qwenVoiceEric',
      },
      {
        id: 'Rocky',
        name: '粤语-阿强 (Rocky)',
        language: 'zh-HK',
        gender: 'male',
        description: 'qwenVoiceRocky',
      },
      {
        id: 'Kiki',
        name: '粤语-阿清 (Kiki)',
        language: 'zh-HK',
        gender: 'female',
        description: 'qwenVoiceKiki',
      },
    ],
    supportedFormats: ['mp3', 'wav', 'pcm'],
  },

  'gemini-tts': {
    id: 'gemini-tts',
    name: 'Gemini TTS',
    requiresApiKey: true,
    defaultBaseUrl: 'https://generativelanguage.googleapis.com',
    icon: '/logos/gemini.svg',
    voices: [
      { id: 'Zephyr', name: 'Zephyr', language: 'en', gender: 'neutral', description: 'geminiVoiceZephyr' },
      { id: 'Puck', name: 'Puck', language: 'en', gender: 'neutral', description: 'geminiVoicePuck' },
      { id: 'Charon', name: 'Charon', language: 'en', gender: 'neutral', description: 'geminiVoiceCharon' },
      { id: 'Kore', name: 'Kore', language: 'en', gender: 'neutral', description: 'geminiVoiceKore' },
      { id: 'Fenrir', name: 'Fenrir', language: 'en', gender: 'neutral', description: 'geminiVoiceFenrir' },
      { id: 'Leda', name: 'Leda', language: 'en', gender: 'neutral', description: 'geminiVoiceLeda' },
      { id: 'Orus', name: 'Orus', language: 'en', gender: 'neutral', description: 'geminiVoiceOrus' },
      { id: 'Aoede', name: 'Aoede', language: 'en', gender: 'neutral', description: 'geminiVoiceAoede' },
      { id: 'Callirrhoe', name: 'Callirrhoe', language: 'en', gender: 'neutral', description: 'geminiVoiceCallirrhoe' },
      { id: 'Autonoe', name: 'Autonoe', language: 'en', gender: 'neutral', description: 'geminiVoiceAutonoe' },
      { id: 'Enceladus', name: 'Enceladus', language: 'en', gender: 'neutral', description: 'geminiVoiceEnceladus' },
      { id: 'Iapetus', name: 'Iapetus', language: 'en', gender: 'neutral', description: 'geminiVoiceIapetus' },
      { id: 'Umbriel', name: 'Umbriel', language: 'en', gender: 'neutral', description: 'geminiVoiceUmbriel' },
      { id: 'Algieba', name: 'Algieba', language: 'en', gender: 'neutral', description: 'geminiVoiceAlgieba' },
      { id: 'Despina', name: 'Despina', language: 'en', gender: 'neutral', description: 'geminiVoiceDespina' },
      { id: 'Erinome', name: 'Erinome', language: 'en', gender: 'neutral', description: 'geminiVoiceErinome' },
      { id: 'Algenib', name: 'Algenib', language: 'en', gender: 'neutral', description: 'geminiVoiceAlgenib' },
      { id: 'Rasalgethi', name: 'Rasalgethi', language: 'en', gender: 'neutral', description: 'geminiVoiceRasalgethi' },
      { id: 'Laomedeia', name: 'Laomedeia', language: 'en', gender: 'neutral', description: 'geminiVoiceLaomedeia' },
      { id: 'Achernar', name: 'Achernar', language: 'en', gender: 'neutral', description: 'geminiVoiceAchernar' },
      { id: 'Alnilam', name: 'Alnilam', language: 'en', gender: 'neutral', description: 'geminiVoiceAlnilam' },
      { id: 'Schedar', name: 'Schedar', language: 'en', gender: 'neutral', description: 'geminiVoiceSchedar' },
      { id: 'Gacrux', name: 'Gacrux', language: 'en', gender: 'neutral', description: 'geminiVoiceGacrux' },
      { id: 'Pulcherrima', name: 'Pulcherrima', language: 'en', gender: 'neutral', description: 'geminiVoicePulcherrima' },
      { id: 'Achird', name: 'Achird', language: 'en', gender: 'neutral', description: 'geminiVoiceAchird' },
      { id: 'Zubenelgenubi', name: 'Zubenelgenubi', language: 'en', gender: 'neutral', description: 'geminiVoiceZubenelgenubi' },
      { id: 'Vindemiatrix', name: 'Vindemiatrix', language: 'en', gender: 'neutral', description: 'geminiVoiceVindemiatrix' },
      { id: 'Sadachbia', name: 'Sadachbia', language: 'en', gender: 'neutral', description: 'geminiVoiceSadachbia' },
      { id: 'Sadaltager', name: 'Sadaltager', language: 'en', gender: 'neutral', description: 'geminiVoiceSadaltager' },
      { id: 'Sulafat', name: 'Sulafat', language: 'en', gender: 'neutral', description: 'geminiVoiceSulafat' },
    ],
    supportedFormats: ['wav'],
  },

  'google-cloud-tts': {
    id: 'google-cloud-tts',
    name: 'Google Cloud TTS',
    requiresApiKey: true,
    defaultBaseUrl: 'https://texttospeech.googleapis.com',
    icon: '/logos/gemini.svg',
    voices: [
      // English (US)
      { id: 'en-US-Neural2-D', name: 'en-US-Neural2-D', language: 'en-US', gender: 'male' },
      { id: 'en-US-Neural2-F', name: 'en-US-Neural2-F', language: 'en-US', gender: 'female' },
      { id: 'en-US-Neural2-A', name: 'en-US-Neural2-A', language: 'en-US', gender: 'male' },
      { id: 'en-US-Neural2-C', name: 'en-US-Neural2-C', language: 'en-US', gender: 'female' },
      { id: 'en-US-Neural2-H', name: 'en-US-Neural2-H', language: 'en-US', gender: 'female' },
      { id: 'en-US-Neural2-I', name: 'en-US-Neural2-I', language: 'en-US', gender: 'male' },
      // English (GB)
      { id: 'en-GB-Neural2-A', name: 'en-GB-Neural2-A', language: 'en-GB', gender: 'female' },
      { id: 'en-GB-Neural2-B', name: 'en-GB-Neural2-B', language: 'en-GB', gender: 'male' },
      { id: 'en-GB-Neural2-C', name: 'en-GB-Neural2-C', language: 'en-GB', gender: 'female' },
      { id: 'en-GB-Neural2-D', name: 'en-GB-Neural2-D', language: 'en-GB', gender: 'male' },
      // Chinese (Mandarin)
      { id: 'cmn-CN-Neural2-A', name: 'cmn-CN-Neural2-A', language: 'cmn-CN', gender: 'female' },
      { id: 'cmn-CN-Neural2-B', name: 'cmn-CN-Neural2-B', language: 'cmn-CN', gender: 'male' },
      { id: 'cmn-CN-Neural2-C', name: 'cmn-CN-Neural2-C', language: 'cmn-CN', gender: 'male' },
      { id: 'cmn-CN-Neural2-D', name: 'cmn-CN-Neural2-D', language: 'cmn-CN', gender: 'female' },
      // Japanese
      { id: 'ja-JP-Neural2-B', name: 'ja-JP-Neural2-B', language: 'ja-JP', gender: 'female' },
      { id: 'ja-JP-Neural2-C', name: 'ja-JP-Neural2-C', language: 'ja-JP', gender: 'male' },
      { id: 'ja-JP-Neural2-D', name: 'ja-JP-Neural2-D', language: 'ja-JP', gender: 'male' },
      // Korean
      { id: 'ko-KR-Neural2-A', name: 'ko-KR-Neural2-A', language: 'ko-KR', gender: 'female' },
      { id: 'ko-KR-Neural2-B', name: 'ko-KR-Neural2-B', language: 'ko-KR', gender: 'female' },
      { id: 'ko-KR-Neural2-C', name: 'ko-KR-Neural2-C', language: 'ko-KR', gender: 'male' },
      // Hindi (India)
      { id: 'hi-IN-Neural2-A', name: 'hi-IN-Neural2-A', language: 'hi-IN', gender: 'female' },
      { id: 'hi-IN-Neural2-B', name: 'hi-IN-Neural2-B', language: 'hi-IN', gender: 'male' },
      { id: 'hi-IN-Neural2-C', name: 'hi-IN-Neural2-C', language: 'hi-IN', gender: 'male' },
      { id: 'hi-IN-Neural2-D', name: 'hi-IN-Neural2-D', language: 'hi-IN', gender: 'female' },
      // English (India)
      { id: 'en-IN-Neural2-A', name: 'en-IN-Neural2-A', language: 'en-IN', gender: 'female' },
      { id: 'en-IN-Neural2-B', name: 'en-IN-Neural2-B', language: 'en-IN', gender: 'male' },
      { id: 'en-IN-Neural2-C', name: 'en-IN-Neural2-C', language: 'en-IN', gender: 'male' },
      { id: 'en-IN-Neural2-D', name: 'en-IN-Neural2-D', language: 'en-IN', gender: 'female' },
      // Tamil (India)
      { id: 'ta-IN-Neural2-A', name: 'ta-IN-Neural2-A', language: 'ta-IN', gender: 'female' },
      { id: 'ta-IN-Neural2-B', name: 'ta-IN-Neural2-B', language: 'ta-IN', gender: 'male' },
      // Telugu (India)
      { id: 'te-IN-Neural2-A', name: 'te-IN-Neural2-A', language: 'te-IN', gender: 'female' },
      { id: 'te-IN-Neural2-B', name: 'te-IN-Neural2-B', language: 'te-IN', gender: 'male' },
      // Bengali (India)
      { id: 'bn-IN-Neural2-A', name: 'bn-IN-Neural2-A', language: 'bn-IN', gender: 'female' },
      { id: 'bn-IN-Neural2-B', name: 'bn-IN-Neural2-B', language: 'bn-IN', gender: 'male' },
      // Kannada (India)
      { id: 'kn-IN-Neural2-A', name: 'kn-IN-Neural2-A', language: 'kn-IN', gender: 'female' },
      { id: 'kn-IN-Neural2-B', name: 'kn-IN-Neural2-B', language: 'kn-IN', gender: 'male' },
      // Malayalam (India)
      { id: 'ml-IN-Neural2-A', name: 'ml-IN-Neural2-A', language: 'ml-IN', gender: 'female' },
      { id: 'ml-IN-Neural2-B', name: 'ml-IN-Neural2-B', language: 'ml-IN', gender: 'male' },
      // Gujarati (India)
      { id: 'gu-IN-Neural2-A', name: 'gu-IN-Neural2-A', language: 'gu-IN', gender: 'female' },
      { id: 'gu-IN-Neural2-B', name: 'gu-IN-Neural2-B', language: 'gu-IN', gender: 'male' },
      // Marathi (India)
      { id: 'mr-IN-Neural2-A', name: 'mr-IN-Neural2-A', language: 'mr-IN', gender: 'female' },
      { id: 'mr-IN-Neural2-B', name: 'mr-IN-Neural2-B', language: 'mr-IN', gender: 'male' },
      // Spanish
      { id: 'es-US-Neural2-A', name: 'es-US-Neural2-A', language: 'es-US', gender: 'female' },
      { id: 'es-US-Neural2-B', name: 'es-US-Neural2-B', language: 'es-US', gender: 'male' },
      { id: 'es-US-Neural2-C', name: 'es-US-Neural2-C', language: 'es-US', gender: 'male' },
      // French
      { id: 'fr-FR-Neural2-A', name: 'fr-FR-Neural2-A', language: 'fr-FR', gender: 'female' },
      { id: 'fr-FR-Neural2-B', name: 'fr-FR-Neural2-B', language: 'fr-FR', gender: 'male' },
      { id: 'fr-FR-Neural2-C', name: 'fr-FR-Neural2-C', language: 'fr-FR', gender: 'female' },
      { id: 'fr-FR-Neural2-D', name: 'fr-FR-Neural2-D', language: 'fr-FR', gender: 'male' },
      // German
      { id: 'de-DE-Neural2-A', name: 'de-DE-Neural2-A', language: 'de-DE', gender: 'female' },
      { id: 'de-DE-Neural2-B', name: 'de-DE-Neural2-B', language: 'de-DE', gender: 'male' },
      { id: 'de-DE-Neural2-C', name: 'de-DE-Neural2-C', language: 'de-DE', gender: 'female' },
      { id: 'de-DE-Neural2-D', name: 'de-DE-Neural2-D', language: 'de-DE', gender: 'male' },
    ],
    supportedFormats: ['mp3', 'wav', 'ogg'],
  },

  'browser-native-tts': {
    id: 'browser-native-tts',
    name: '浏览器原生 (Web Speech API)',
    requiresApiKey: false,
    icon: '/logos/browser.svg',
    voices: [
      // Note: Actual voices are determined by the browser and OS
      // These are placeholder - real voices are fetched dynamically via speechSynthesis.getVoices()
      { id: 'default', name: '默认', language: 'zh-CN', gender: 'neutral' },
    ],
    supportedFormats: ['browser'], // Browser native audio
    speedRange: { min: 0.1, max: 10.0, default: 1.0 },
  },
};

/**
 * ASR Provider Registry
 *
 * Central registry for all ASR providers.
 * Keep in sync with ASRProviderId type definition.
 */
export const ASR_PROVIDERS: Record<ASRProviderId, ASRProviderConfig> = {
  'openai-whisper': {
    id: 'openai-whisper',
    name: 'OpenAI Whisper',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.openai.com/v1',
    icon: '/logos/openai.svg',
    supportedLanguages: [
      // OpenAI Whisper supports 58 languages (as of official docs)
      // Source: https://platform.openai.com/docs/guides/speech-to-text
      'auto', // Auto-detect
      // Hot languages (commonly used)
      'zh', // Chinese
      'en', // English
      'ja', // Japanese
      'ko', // Korean
      'es', // Spanish
      'fr', // French
      'de', // German
      'ru', // Russian
      'ar', // Arabic
      'pt', // Portuguese
      'it', // Italian
      'hi', // Hindi
      // Other languages (alphabetical)
      'af', // Afrikaans
      'hy', // Armenian
      'az', // Azerbaijani
      'be', // Belarusian
      'bs', // Bosnian
      'bg', // Bulgarian
      'ca', // Catalan
      'hr', // Croatian
      'cs', // Czech
      'da', // Danish
      'nl', // Dutch
      'et', // Estonian
      'fi', // Finnish
      'gl', // Galician
      'el', // Greek
      'he', // Hebrew
      'hu', // Hungarian
      'is', // Icelandic
      'id', // Indonesian
      'kn', // Kannada
      'kk', // Kazakh
      'lv', // Latvian
      'lt', // Lithuanian
      'mk', // Macedonian
      'ms', // Malay
      'mr', // Marathi
      'mi', // Maori
      'ne', // Nepali
      'no', // Norwegian
      'fa', // Persian
      'pl', // Polish
      'ro', // Romanian
      'sr', // Serbian
      'sk', // Slovak
      'sl', // Slovenian
      'sw', // Swahili
      'sv', // Swedish
      'tl', // Tagalog
      'ta', // Tamil
      'th', // Thai
      'tr', // Turkish
      'uk', // Ukrainian
      'ur', // Urdu
      'vi', // Vietnamese
      'cy', // Welsh
    ],
    supportedFormats: ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm'],
  },

  'qwen-asr': {
    id: 'qwen-asr',
    name: 'Qwen ASR (阿里云百炼)',
    requiresApiKey: true,
    defaultBaseUrl: 'https://dashscope.aliyuncs.com/api/v1',
    icon: '/logos/bailian.svg',
    supportedLanguages: [
      // Qwen ASR supports 27 languages + auto-detect
      // If language is uncertain or mixed (e.g. Chinese-English-Japanese-Korean), use "auto" (do not specify language parameter)
      'auto', // Auto-detect (do not specify language parameter)
      // Hot languages (commonly used)
      'zh', // Chinese (Mandarin, Sichuanese, Minnan, Wu dialects)
      'yue', // Cantonese
      'en', // English
      'ja', // Japanese
      'ko', // Korean
      'de', // German
      'fr', // French
      'ru', // Russian
      'es', // Spanish
      'pt', // Portuguese
      'ar', // Arabic
      'it', // Italian
      'hi', // Hindi
      // Other languages (alphabetical)
      'cs', // Czech
      'da', // Danish
      'fi', // Finnish
      'fil', // Filipino
      'id', // Indonesian
      'is', // Icelandic
      'ms', // Malay
      'no', // Norwegian
      'pl', // Polish
      'sv', // Swedish
      'th', // Thai
      'tr', // Turkish
      'uk', // Ukrainian
      'vi', // Vietnamese
    ],
    supportedFormats: ['mp3', 'wav', 'webm', 'm4a', 'flac'],
  },

  'gemini-asr': {
    id: 'gemini-asr',
    name: 'Gemini ASR',
    requiresApiKey: true,
    defaultBaseUrl: 'https://generativelanguage.googleapis.com',
    icon: '/logos/gemini.svg',
    supportedLanguages: [
      'auto',
      'zh', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar', 'pt', 'it', 'hi',
      'af', 'bg', 'ca', 'cs', 'da', 'nl', 'et', 'fi', 'el', 'he', 'hu', 'id',
      'is', 'lv', 'lt', 'ms', 'no', 'pl', 'ro', 'sr', 'sk', 'sl', 'sv', 'th',
      'tr', 'uk', 'vi',
    ],
    supportedFormats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'webm'],
  },

  'browser-native': {
    id: 'browser-native',
    name: '浏览器原生 ASR (Web Speech API)',
    requiresApiKey: false,
    icon: '/logos/browser.svg',
    supportedLanguages: [
      // Chinese variants
      'zh-CN', // Mandarin (Simplified, China)
      'zh-TW', // Mandarin (Traditional, Taiwan)
      'zh-HK', // Cantonese (Hong Kong)
      'yue-Hant-HK', // Cantonese (Traditional)
      // English variants
      'en-US', // English (United States)
      'en-GB', // English (United Kingdom)
      'en-AU', // English (Australia)
      'en-CA', // English (Canada)
      'en-IN', // English (India)
      'en-NZ', // English (New Zealand)
      'en-ZA', // English (South Africa)
      // Japanese & Korean
      'ja-JP', // Japanese (Japan)
      'ko-KR', // Korean (South Korea)
      // European languages
      'de-DE', // German (Germany)
      'fr-FR', // French (France)
      'es-ES', // Spanish (Spain)
      'es-MX', // Spanish (Mexico)
      'es-AR', // Spanish (Argentina)
      'es-CO', // Spanish (Colombia)
      'it-IT', // Italian (Italy)
      'pt-BR', // Portuguese (Brazil)
      'pt-PT', // Portuguese (Portugal)
      'ru-RU', // Russian (Russia)
      'nl-NL', // Dutch (Netherlands)
      'pl-PL', // Polish (Poland)
      'cs-CZ', // Czech (Czech Republic)
      'da-DK', // Danish (Denmark)
      'fi-FI', // Finnish (Finland)
      'sv-SE', // Swedish (Sweden)
      'no-NO', // Norwegian (Norway)
      'tr-TR', // Turkish (Turkey)
      'el-GR', // Greek (Greece)
      'hu-HU', // Hungarian (Hungary)
      'ro-RO', // Romanian (Romania)
      'sk-SK', // Slovak (Slovakia)
      'bg-BG', // Bulgarian (Bulgaria)
      'hr-HR', // Croatian (Croatia)
      'ca-ES', // Catalan (Spain)
      // Middle East & Asia
      'ar-SA', // Arabic (Saudi Arabia)
      'ar-EG', // Arabic (Egypt)
      'he-IL', // Hebrew (Israel)
      'hi-IN', // Hindi (India)
      'th-TH', // Thai (Thailand)
      'vi-VN', // Vietnamese (Vietnam)
      'id-ID', // Indonesian (Indonesia)
      'ms-MY', // Malay (Malaysia)
      'fil-PH', // Filipino (Philippines)
      // Other
      'af-ZA', // Afrikaans (South Africa)
      'uk-UA', // Ukrainian (Ukraine)
    ],
    supportedFormats: ['webm'], // MediaRecorder format
  },
};

/**
 * Get all available TTS providers
 */
export function getAllTTSProviders(): TTSProviderConfig[] {
  return Object.values(TTS_PROVIDERS);
}

/**
 * Get TTS provider by ID
 */
export function getTTSProvider(providerId: TTSProviderId): TTSProviderConfig | undefined {
  return TTS_PROVIDERS[providerId];
}

/**
 * Default voice for each TTS provider.
 * Used when switching providers or testing a non-active provider.
 */
export const DEFAULT_TTS_VOICES: Record<TTSProviderId, string> = {
  'openai-tts': 'alloy',
  'azure-tts': 'zh-CN-XiaoxiaoNeural',
  'glm-tts': 'tongtong',
  'qwen-tts': 'Cherry',
  'gemini-tts': 'Kore',
  'google-cloud-tts': 'en-US-Neural2-D',
  'browser-native-tts': 'default',
};

/**
 * Get voices for a specific TTS provider
 */
export function getTTSVoices(providerId: TTSProviderId): TTSVoiceInfo[] {
  return TTS_PROVIDERS[providerId]?.voices || [];
}

/**
 * Get all available ASR providers
 */
export function getAllASRProviders(): ASRProviderConfig[] {
  return Object.values(ASR_PROVIDERS);
}

/**
 * Get ASR provider by ID
 */
export function getASRProvider(providerId: ASRProviderId): ASRProviderConfig | undefined {
  return ASR_PROVIDERS[providerId];
}

/**
 * Get supported languages for a specific ASR provider
 */
export function getASRSupportedLanguages(providerId: ASRProviderId): string[] {
  return ASR_PROVIDERS[providerId]?.supportedLanguages || [];
}
