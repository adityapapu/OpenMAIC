/**
 * Stage 1: Generate scene outlines from user requirements.
 * Also contains outline fallback logic.
 */

import { nanoid } from 'nanoid';
import { MAX_PDF_CONTENT_CHARS, MAX_VISION_IMAGES } from '@/lib/constants/generation';
import type {
  UserRequirements,
  SceneOutline,
  PdfImage,
  ImageMapping,
  LearningMode,
} from '@/lib/types/generation';
import { buildPrompt, PROMPT_IDS } from './prompts';
import { formatImageDescription, formatImagePlaceholder } from './prompt-formatters';
import { parseJsonResponse } from './json-repair';
import { uniquifyMediaElementIds } from './scene-builder';
import type { AICallFn, GenerationResult, GenerationCallbacks } from './pipeline-types';
import { createLogger } from '@/lib/logger';
const log = createLogger('Generation');

/**
 * Generate scene outlines from user requirements
 * Now uses simplified UserRequirements with just requirement text and language
 */
export async function generateSceneOutlinesFromRequirements(
  requirements: UserRequirements,
  pdfText: string | undefined,
  pdfImages: PdfImage[] | undefined,
  aiCall: AICallFn,
  callbacks?: GenerationCallbacks,
  options?: {
    visionEnabled?: boolean;
    imageMapping?: ImageMapping;
    imageGenerationEnabled?: boolean;
    videoGenerationEnabled?: boolean;
  },
): Promise<GenerationResult<SceneOutline[]>> {
  // Build available images description for the prompt
  let availableImagesText =
    requirements.language === 'zh-CN' ? '无可用图片' : 'No images available';
  let visionImages: Array<{ id: string; src: string }> | undefined;

  if (pdfImages && pdfImages.length > 0) {
    if (options?.visionEnabled && options?.imageMapping) {
      // Vision mode: split into vision images (first N) and text-only (rest)
      const allWithSrc = pdfImages.filter((img) => options.imageMapping![img.id]);
      const visionSlice = allWithSrc.slice(0, MAX_VISION_IMAGES);
      const textOnlySlice = allWithSrc.slice(MAX_VISION_IMAGES);
      const noSrcImages = pdfImages.filter((img) => !options.imageMapping![img.id]);

      const visionDescriptions = visionSlice.map((img) =>
        formatImagePlaceholder(img, requirements.language),
      );
      const textDescriptions = [...textOnlySlice, ...noSrcImages].map((img) =>
        formatImageDescription(img, requirements.language),
      );
      availableImagesText = [...visionDescriptions, ...textDescriptions].join('\n');

      visionImages = visionSlice.map((img) => ({
        id: img.id,
        src: options.imageMapping![img.id],
        width: img.width,
        height: img.height,
      }));
    } else {
      // Text-only mode: full descriptions
      availableImagesText = pdfImages
        .map((img) => formatImageDescription(img, requirements.language))
        .join('\n');
    }
  }

  // Build user profile string for prompt injection
  const userProfileText =
    requirements.userNickname || requirements.userBio
      ? `## Student Profile\n\nStudent: ${requirements.userNickname || 'Unknown'}${requirements.userBio ? ` — ${requirements.userBio}` : ''}\n\nConsider this student's background when designing the course. Adapt difficulty, examples, and teaching approach accordingly.\n\n---`
      : '';

  // Build media generation policy based on enabled flags
  const imageEnabled = options?.imageGenerationEnabled ?? false;
  const videoEnabled = options?.videoGenerationEnabled ?? false;
  let mediaGenerationPolicy = '';
  if (!imageEnabled && !videoEnabled) {
    mediaGenerationPolicy =
      '**IMPORTANT: Do NOT include any mediaGenerations in the outlines. Both image and video generation are disabled.**';
  } else if (!imageEnabled) {
    mediaGenerationPolicy =
      '**IMPORTANT: Do NOT include any image mediaGenerations (type: "image") in the outlines. Image generation is disabled. Video generation is allowed.**';
  } else if (!videoEnabled) {
    mediaGenerationPolicy =
      '**IMPORTANT: Do NOT include any video mediaGenerations (type: "video") in the outlines. Video generation is disabled. Image generation is allowed.**';
  }

  // Build learning mode instructions
  const learningModeInstructions = buildLearningModeInstructions(
    requirements.learningMode,
    requirements.language,
  );

  // Use simplified prompt variables
  const prompts = buildPrompt(PROMPT_IDS.REQUIREMENTS_TO_OUTLINES, {
    // New simplified variables
    requirement: requirements.requirement,
    language: requirements.language,
    pdfContent: pdfText
      ? pdfText.substring(0, MAX_PDF_CONTENT_CHARS)
      : requirements.language === 'zh-CN'
        ? '无'
        : 'None',
    availableImages: availableImagesText,
    userProfile: userProfileText,
    mediaGenerationPolicy,
    learningModeInstructions,
  });

  if (!prompts) {
    return { success: false, error: 'Prompt template not found' };
  }

  try {
    callbacks?.onProgress?.({
      currentStage: 1,
      overallProgress: 20,
      stageProgress: 50,
      statusMessage: '正在分析需求，生成场景大纲...',
      scenesGenerated: 0,
      totalScenes: 0,
    });

    const response = await aiCall(prompts.system, prompts.user, visionImages);
    const outlines = parseJsonResponse<SceneOutline[]>(response);

    if (!outlines || !Array.isArray(outlines)) {
      return {
        success: false,
        error: 'Failed to parse scene outlines response',
      };
    }
    // Ensure IDs, order, and language
    const enriched = outlines.map((outline, index) => ({
      ...outline,
      id: outline.id || nanoid(),
      order: index + 1,
      language: requirements.language,
    }));

    // Replace sequential gen_img_N/gen_vid_N with globally unique IDs
    const result = uniquifyMediaElementIds(enriched);

    callbacks?.onProgress?.({
      currentStage: 1,
      overallProgress: 50,
      stageProgress: 100,
      statusMessage: `已生成 ${result.length} 个场景大纲`,
      scenesGenerated: 0,
      totalScenes: result.length,
    });

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

/**
 * Apply type fallbacks for outlines that can't be generated as their declared type.
 * - interactive without interactiveConfig → slide
 * - pbl without pblConfig or languageModel → slide
 */
export function applyOutlineFallbacks(
  outline: SceneOutline,
  hasLanguageModel: boolean,
): SceneOutline {
  if (outline.type === 'interactive' && !outline.interactiveConfig) {
    log.warn(
      `Interactive outline "${outline.title}" missing interactiveConfig, falling back to slide`,
    );
    return { ...outline, type: 'slide' };
  }
  if (outline.type === 'pbl' && (!outline.pblConfig || !hasLanguageModel)) {
    log.warn(
      `PBL outline "${outline.title}" missing pblConfig or languageModel, falling back to slide`,
    );
    return { ...outline, type: 'slide' };
  }
  return outline;
}

/**
 * Build learning-mode-specific instructions for prompt injection
 */
export function buildLearningModeInstructions(
  mode: LearningMode | undefined,
  language: 'zh-CN' | 'en-US',
): string {
  if (!mode || mode === 'learn') return '';

  const instructions: Record<string, { zh: string; en: string }> = {
    explore: {
      zh: `## 学习模式：探索

请按"探索"模式设计课程：
- 优先使用 interactive 场景进行深入探索和可视化
- 包含延伸知识、跨学科联系和有趣的拓展内容
- 减少测验频率，更注重激发好奇心和深度理解
- 添加至少 1 个 interactive 场景
- 鼓励开放式讨论和发散思维`,
      en: `## Learning Mode: Explore

Design the course in "Explore" mode:
- Favor interactive scenes for deep exploration and visualization
- Include tangential knowledge, cross-disciplinary connections, and fascinating extensions
- Fewer quizzes — focus on curiosity and deep understanding
- Add at least 1 interactive scene
- Encourage open-ended discussion and divergent thinking`,
    },
    interview: {
      zh: `## 学习模式：面试准备

请按"面试准备"模式设计课程：
- 每个主题都要解释"为什么面试中会考这个"
- 包含常见面试问题、追问和陷阱场景的幻灯片
- 添加权衡分析（tradeoff）幻灯片，对比不同方案的优劣
- 测验题目应模拟真实面试题（系统设计、代码分析、场景分析等）
- 在最后添加一个模拟面试讨论环节
- 使用结构化的回答方式（先结论后展开）`,
      en: `## Learning Mode: Interview Prep

Design the course in "Interview Prep" mode:
- Each topic should explain "why this matters in interviews"
- Include slides on common interview questions, follow-ups, and gotcha scenarios
- Add tradeoff analysis slides comparing different approaches
- Quiz questions should mimic real interview questions (system design, code analysis, scenario-based)
- Add a mock interview discussion at the end
- Use structured answer patterns (conclusion first, then elaborate)`,
    },
    revision: {
      zh: `## 学习模式：复习

请按"复习"模式设计课程：
- 幻灯片内容精简，只保留核心要点
- 每 2 个幻灯片后插入一个测验
- 使用"记住..."和"关键要点是..."的表达方式
- 总时长控制在 10-15 分钟
- 测验以快速回忆为主（"什么是..."、"什么时候用..."）
- 注重知识点之间的联系和记忆线索`,
      en: `## Learning Mode: Revision

Design the course in "Revision" mode:
- Keep slides concise — only core key points
- Insert a quiz after every 2 slides
- Use "Remember..." and "The key takeaway is..." framing
- Total duration should be shorter (10-15 minutes)
- Quizzes focus on rapid recall ("What is...", "When would you use...")
- Emphasize connections between concepts and memory cues`,
    },
  };

  const inst = instructions[mode];
  if (!inst) return '';
  return language === 'zh-CN' ? inst.zh : inst.en;
}
