<script setup>
import { ref } from 'vue';
import InputText from '../InputText.vue';
import Button from '../Button.vue';
import { useMessagesStore } from '@/stores/messages';

defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

const text = ref('');

const isLoading = ref(false);
const { sendMessage } = useMessagesStore();
const submit = async () => {
  if (!text.value) return;
  isLoading.value = true;

  await sendMessage(text.value);

  isLoading.value = false;
  text.value = '';
};
</script>

<template>
  <div class="ChatInput">
    <InputText v-model="text" placeholder="Your message..."/>
    <Button style-variant="primary" @click="submit()">
      {{ isLoading ? 'Sending...' : 'Send' }}
    </Button>
  </div>
</template>

<style lang="scss">
.ChatInput {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
}
</style>
