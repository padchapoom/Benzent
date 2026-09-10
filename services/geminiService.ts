
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Standard PCM decoding as required by the Live API / TTS
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  // Feature: Fast AI responses (Flash Lite)
  async getQuickGreeting(name: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: `Generate a very short, enthusiastic 1-sentence greeting for ${name} who is starting their Google AI certification journey.`
    });
    return response.text;
  }

  // Feature: Generate Images (gemini-3-pro-image-preview)
  async generateCertificateTheme(prompt: string, size: '1K' | '2K' | '4K') {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `A professional, elegant, high-quality abstract certificate background for a course about ${prompt}. Google colors, minimalistic, premium feel.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  }

  // Feature: TTS (gemini-2.5-flash-preview-tts)
  async generateSpeech(text: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say with extreme pride and professional tone: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("Audio generation failed");
    return base64Audio;
  }

  // Feature: Thinking Mode (gemini-3-pro-preview)
  async getDeepAnalysis(skill: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze the technical complexity and industry relevance of becoming an expert in ${skill}. Provide a 3-paragraph breakdown of why this certification matters.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  }

  // Feature: Maps Grounding (gemini-2.5-flash)
  async findLearningCenters(skill: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-latest",
      contents: `Find real-world locations or test centers related to ${skill} certification or Google Learning hubs. List at least 3 with names and locations.`,
      config: {
        tools: [{ googleMaps: {} }]
      }
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const results: any[] = [];
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.maps) {
          results.push({
            title: chunk.maps.title,
            uri: chunk.maps.uri
          });
        }
      });
    }
    return results;
  }

  // Feature: Video Generation (veo-3.1-fast-generate-preview)
  async generateCelebrationVideo(prompt: string, ratio: '16:9' | '9:16') {
    const ai = this.getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `A cinematic 3D animation of gold particles forming the Google logo and the words "CERTIFIED" in a celebratory atmosphere for ${prompt}.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: ratio
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  // Feature: Image/Video Understanding (gemini-3-pro-preview)
  async verifySkillEvidence(base64Data: string, mimeType: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: "Analyze this image/video as proof of a student's project. Confirm if it looks like authentic work and provide a short encouraging feedback." }
        ]
      }
    });
    return response.text;
  }
}

export const gemini = new GeminiService();
