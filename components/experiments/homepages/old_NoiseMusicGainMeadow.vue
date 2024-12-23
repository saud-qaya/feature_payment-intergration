<template>
  <AudioElement
    ref="Noise"
    key="5"
    :src="noise_src"
    title="Noise"
    @update:volume="updateNoiseGain"
  >
    <template #default="{}">
      <div class="icon">
        <img style="width: 25px" src="~/assets/image/noiseicon.svg">
      </div>
    </template>
  </AudioElement>
  <AudioElement
    ref="Music"
    key="1"
    :src="meadow_src"
    title="Meadow"
    @update:volume="updateMusicGain"
    @update:playing="handlePlayingUpdate"
    @update:fadeout="fadeOutMusic"
  >
    <template #default="{ }">
      <div class="icon">
        <!-- tropic icon -->
        <img style="width: 25px" src="~/assets/image/musicicon.svg">
      </div>
    </template>
    <!-- Slot content for AudioElement, if needed -->
  </AudioElement>
</template>
<script lang="ts">
import AudioElement from '../AudioElement.vue'
import { useAudioStore } from '../../../stores/audio'
export default {
  name: 'NoiseMusicGainMeadow',
  components: { AudioElement },
  data () {
    return {
      audioContext: useAudioStore().getContext(),
      playing: false,
      paused: false,
      createdNodes: {} as any,
      meadow_src: window.location.origin + useRuntimeConfig().public.meadow_src as string,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src as string

    }
  },
  mounted () {
  },
  methods: {
    // This method helps to get the ressources free when we stop playing the audio
    // without it would be louder each time we start playing
    refreshAudioContext () {
      const newAudioContext = new AudioContext()
      this.audioContext.close()
      useAudioStore().audioContext = newAudioContext
      this.audioContext = useAudioStore().getContext()
    },
    fadeOutMusic () {
      if (this.createdNodes.noiseGain) {
        const noiseGainValue = this.createdNodes.noiseGain.gain.value

        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(noiseGainValue, this.audioContext.currentTime)
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.3)
      }
      if (this.createdNodes.musicGain) {
        const musicGainValue = this.createdNodes.noiseGain.gain.value
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(musicGainValue, this.audioContext.currentTime)
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.3)
      }
    },
    handlePlayingUpdate (state: boolean) {
      if (state) {
        const noiseElement = this.$refs.Noise as typeof AudioElement
        const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
        const musicElement = this.$refs.Music as typeof AudioElement
        const musicAudioElement = musicElement.$refs.audioElement as HTMLMediaElement
        const audioContext = this.audioContext
        const destination = this.audioContext.destination

        this.createdNodes.musicGain ||= audioContext.createGain()
        this.createdNodes.noiseGain ||= audioContext.createGain()
        this.createdNodes.musicGain.gain.setValueAtTime(0, audioContext.currentTime)
        this.createdNodes.noiseGain.gain.setValueAtTime(0, audioContext.currentTime)

        this.createdNodes.noiseSource = audioContext.createMediaElementSource(noiseAudioElement)
        this.createdNodes.musicSource = audioContext.createMediaElementSource(musicAudioElement)

        this.createdNodes.noiseSource.connect(this.createdNodes.noiseGain)
        this.createdNodes.musicSource.connect(this.createdNodes.musicGain)

        this.createdNodes.noiseGain.connect(destination)
        this.createdNodes.musicGain.connect(destination)
        musicAudioElement.muted = false
        noiseAudioElement.muted = false
        this.createdNodes.noiseGain.gain.cancelScheduledValues(this.audioContext.currentTime)
        this.createdNodes.musicGain.gain.cancelScheduledValues(this.audioContext.currentTime)
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 1.3)
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 1.3)
        useAudioStore().playing = true
      } else {
        // Music has just stopped react on it.
        // console.log('Stop everything webaudio is still running')
        this.createdNodes = []
        this.refreshAudioContext()
      }
    },
    updateNoiseGain (volume: number) {
      if (this.createdNodes.noiseGain) {
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(volume, this.createdNodes.noiseGain.context.currentTime + 0.30)
      }
    },
    updateMusicGain (volume: number) {
      if (this.createdNodes.musicGain) {
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(volume, this.createdNodes.musicGain.context.currentTime + 0.30)
      }
    }
  }
}

</script>
